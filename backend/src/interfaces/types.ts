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
  created_at?: Date;
  modified_at?: Date;
  is_pinned?: boolean;
  user_id: number;
}

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    email: string;
  };
}
