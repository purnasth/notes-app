declare module "express" {
  interface Request {
    userId?: number;
  }
}

import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}
