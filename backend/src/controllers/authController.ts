import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "../models/userModel";
import {
  createSession,
  findSessionByToken,
  deleteSession,
} from "../models/sessionModel";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;
  try {
    const user = await createUser(username, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, rememberMe } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    if (rememberMe) {
      const sessionToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        }
      );
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      await createSession(user.id, sessionToken, expiresAt);
      res.cookie("session_token", sessionToken, {
        httpOnly: true,
        expires: expiresAt,
      });
    }

    res.json({ message: "Login successful", token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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
