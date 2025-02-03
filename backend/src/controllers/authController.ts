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
    if (error.code === "23505") {
      const constraint = error.constraint;
      if (constraint === "users_username_key") {
        res.status(400).json({ error: "Username already exists" });
      } else if (constraint === "users_email_key") {
        res.status(400).json({ error: "Email already exists" });
      } else {
        res.status(400).json({ error: "Duplicate key violation" });
      }
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, rememberMe } = req.body;

  try {
    // Step 1: Find the user by email
    const user = await findUserByEmail(email);
    if (!user) {
      console.log("No user found with email:", email);
      res.status(400).json({ error: "No account found with this email" });
      return;
    }

    // Step 2: Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", email);
      res.status(400).json({ error: "Incorrect password" });
      return;
    }

    // Step 3: Generate a JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Step 4: Handle "Remember Me" functionality
    if (rememberMe) {
      // Generate a session token
      const sessionToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d", // Session token expires in 7 days
        }
      );
      console.log("Session token generated:", sessionToken); // Debugging log

      // Set the session expiration date
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
      console.log("Session expires at:", expiresAt); // Debugging log

      // Create a session in the database
      console.log("Creating session in the database..."); // Debugging log
      await createSession(user.id, sessionToken, expiresAt);
      console.log("Session created successfully"); // Debugging log

      // Set the session token as an HTTP-only cookie
      console.log("Setting session token as cookie..."); // Debugging log
      res.cookie("session_token", sessionToken, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        expires: expiresAt, // Set the cookie expiration date
      });
      console.log("Cookie set successfully"); // Debugging log
    }

    // Step 5: Log success and send the response
    console.log("Login successful for user:", email);
    res.json({ message: "Login successful", token }); // Send the JWT token in the response
  } catch (error: any) {
    // Step 6: Handle errors
    console.error("Login error:", error);
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
