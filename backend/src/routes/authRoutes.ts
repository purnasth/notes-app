import express from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsersController,
} from "../controllers/authController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getCurrentUser);
router.get("/users", authenticate, getAllUsersController);

export default router;
