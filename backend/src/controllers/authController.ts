import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
} from "../models/userModel";
import {
  createSession,
  findSessionByToken,
  deleteSession,
} from "../models/sessionModel";
import { capitalize } from "../utils/helper";
import speakeasy from "speakeasy";
import { transporter } from "../config/email";

const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const tempUserStore = new Map<string, any>();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  console.log(
    "User attempting to register:",
    username,
    "Email:",
    email,
    "Password:",
    password
  );
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Store user temporarily with expiration (10 minutes)
    tempUserStore.set(email, {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // Generate and send OTP
    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret().base32,
      encoding: "base32",
    });

    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "Email is required" });
      return;
    }

    const otp = speakeasy.totp({
      secret: speakeasy.generateSecret().base32,
      encoding: "base32",
    });

    otpStore.set(email, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // 5 mins expiry

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTP = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
      res.status(400).json({ error: "No OTP found" });
      return;
    }

    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(email);
      res.status(400).json({ error: "OTP expired" });
      return;
    }

    if (storedOtp.otp !== otp) {
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    // Check temporary user storage
    const tempUser = tempUserStore.get(email);
    if (!tempUser || Date.now() > tempUser.expiresAt) {
      res.status(400).json({ error: "Registration session expired" });
      return;
    }

    // Create actual user
    const user = await createUser(
      tempUser.username,
      tempUser.email,
      tempUser.password
    );

    // Cleanup storage
    tempUserStore.delete(email);
    otpStore.delete(email);

    res.json({ message: "Account created successfully", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, rememberMe } = req.body;

  console.log("User attempting to login:", password);

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: "No account found with this email" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    console.log("Password:", password, "Hash:", user.password_hash);
    
    if (!isPasswordValid) {
      res.status(400).json({ error: "Incorrect password" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (rememberMe) {
      const sessionToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await createSession(user.id, sessionToken, expiresAt);

      res.cookie("session_token", sessionToken, {
        httpOnly: true,
        expires: expiresAt,
      });
    }

    console.log("User logged in:", user.username);

    const username = capitalize(user.username);
    res.json({ message: `Welcome, ${username}!`, token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const sessionToken = req.cookies.session_token;
  if (sessionToken) {
    await deleteSession(sessionToken);
    res.clearCookie("session_token");
  }
  res.json({ message: "Logout successful" });
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId; // Extracted from the JWT token in the auth middleware
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await findUserById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Return user details (excluding sensitive data like password_hash)
    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
    });
  } catch (error: any) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error: any) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
