declare module "express" {
  interface Request {
    userId?: number;
  }
}

declare module "speakeasy" {
  const speakeasy: any;
  export default speakeasy;
}

import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
  };
}
