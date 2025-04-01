import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { findSessionByToken } from "../models/sessionModel";
import logger from "../utils/logger"; // Import logger

interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token =
    req.cookies?.session_token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    logger.warn("Unauthorized access attempt - No token provided"); // Log event
    res.status(401).json({ error: "Unauthorized - No token provided" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      logger.error("JWT_SECRET is not set in the environment variables");
      res.status(500).json({ error: "Server configuration error" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };

    const session = await findSessionByToken(token);
    if (!session) {
      logger.warn(`Unauthorized access attempt - Invalid session for token: ${token}`);
      res.status(401).json({ error: "Unauthorized - Invalid session" });
      return;
    }

    req.userId = decoded.userId;
    logger.info(`User ${decoded.userId} authenticated successfully`); // Log success
    next();
  } catch (error) {
    logger.error("Unauthorized - Invalid token", { error });
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
