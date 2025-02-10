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
import logger from "../utils/logger";

const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const tempUserStore = new Map<string, any>();

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      logger.warn(`Registration failed: User already exists, ${email}`);
      res.status(400).json({ error: "User already exists" });
      return;
    }

    tempUserStore.set(email, {
      username,
      email,
      password,
      expiresAt: Date.now() + 10 * 60 * 1000,
    });

    // Check if OTP already exists and is valid
    if (otpStore.has(email) && otpStore.get(email)!.expiresAt > Date.now()) {
      logger.info(`OTP already sent to ${email}, please check your email`);
      res.json({ message: "OTP already sent, please check your email" });
      return;
    }

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

    logger.info(`OTP sent successfully to ${email}`);
    res.json({ message: "OTP sent successfully to your email" });
  } catch (error) {
    logger.error(`Registration failed: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      logger.warn("OTP request failed: Email is required");
      res.status(400).json({ message: "Email is required" });
      return;
    }

    if (otpStore.has(email) && otpStore.get(email)!.expiresAt > Date.now()) {
      logger.info(`OTP already sent to ${email}, please check your email`);
      res.json({ message: "OTP already sent, please check your email" });
      return;
    }

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

    logger.info(`OTP sent successfully to ${email}`);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    logger.error(`OTP request failed: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp } = req.body;
    const storedOtp = otpStore.get(email);

    if (!storedOtp) {
      logger.warn(`OTP verification failed: No OTP found for ${email}`);
      res.status(400).json({ error: "No OTP found" });
      return;
    }

    if (Date.now() > storedOtp.expiresAt) {
      otpStore.delete(email);
      logger.warn(`OTP verification failed: OTP expired for ${email}`);
      res.status(400).json({ error: "OTP expired" });
      return;
    }

    if (storedOtp.otp !== otp) {
      logger.warn(`OTP verification failed: Invalid OTP for ${email}`);
      res.status(400).json({ error: "Invalid OTP" });
      return;
    }

    const tempUser = tempUserStore.get(email);
    if (!tempUser || Date.now() > tempUser.expiresAt) {
      logger.warn(
        `OTP verification failed: Registration session expired for ${email}`
      );
      res.status(400).json({ error: "Registration session expired" });
      return;
    }

    const user = await createUser(
      tempUser.username,
      tempUser.email,
      tempUser.password
    );

    tempUserStore.delete(email);
    otpStore.delete(email);

    logger.info(`Account created successfully for ${email}`);
    res.json({ message: "Account created successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, rememberMe } = req.body;

  logger.info(`User login attempt: ${email}`);

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      logger.warn(`Login failed: No account found with ${email}`);
      res.status(400).json({ error: "No account found with this email" });
      return;
    }

    console.log("Stored user:", user);

    if (!user.password_hash) {
      logger.error(`User password is missing in database for ${email}`);
      res.status(500).json({ error: "User password is missing in database" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      user.password_hash
    );

    if (!isPasswordValid) {
      logger.warn(`Login failed: Incorrect password for ${email}`);
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
        { expiresIn: "7d" }
      );
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      await createSession(user.id, sessionToken, expiresAt);

      res.cookie("session_token", sessionToken, {
        httpOnly: true,
        expires: expiresAt,
      });
    }

    logger.info(
      `User logged in successfully: ${email}, username: ${user.username}`
    );

    res.json({ message: `Welcome, ${capitalize(user.username)}!`, token });
  } catch (error) {
    logger.error(`Login failed: ${error}`);
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
  logger.info("User logged out successfully");
  res.json({ message: "Logout successful" });
};

export const getCurrentUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId; // Extracted from the JWT token in the auth middleware
    if (!userId) {
      logger.warn(
        "Unauthorized access attempt to get current user, no userId found in JWT"
      );
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await findUserById(userId);
    if (!user) {
      logger.warn(`User not found with id: ${userId}`);
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
    logger.error(`Error fetching current user: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    logger.info("Fetched all users successfully");
    res.json(users);
  } catch (error: any) {
    logger.error(`Error fetching all users: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};
