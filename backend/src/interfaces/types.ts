import { Request } from "express";

declare module "express" {
  interface Request {
    userId?: number;
  }
}

export interface Note {
  id?: number;
  title: string;
  content: string;
  categories: string[];
  created_at?: Date | null;
  modified_at?: Date | null;
  is_pinned?: boolean | null;
  user_id?: number | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  created_at: Date | null;
}

export interface Session {
  id: number;
  user_id: number;
  session_token: string;
  expires_at: Date;
  created_at: Date | null;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}

export interface CustomRequest extends Request {
  userId?: number;
}
