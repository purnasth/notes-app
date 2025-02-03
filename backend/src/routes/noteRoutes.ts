import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  togglePin,
} from "../controllers/noteController";
import { authenticate } from "../middleware/authMiddleware";

const router = express.Router();

// Apply auth middleware to all note routes
router.use(authenticate);

// Note routes
router.post("/", createNote);
router.get("/", getNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);
router.patch("/:id/pin", togglePin);

export default router;
