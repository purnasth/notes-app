import express from "express";
import prisma from "../config/db";
import { Request, Response } from "express";
import logger from "../utils/logger";
import { CustomRequest } from "../interfaces/types";
import { NoteModel } from "../models/noteModel";

export const createNote: express.RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, content, categories } = req.body;
    const userId = req.userId;
    if (!userId) {
      logger.warn("Unauthorized attempt to create a note");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const note = await prisma.notes.create({
      data: {
        title,
        content,
        categories,
        user_id: userId,
      },
    });

    logger.info(`Note created successfully for user ${userId}`);
    res.status(201).json(note);
  } catch (error) {
    logger.error(`Error creating note: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNotes: express.RequestHandler = async (
  req: CustomRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      logger.warn("Unauthorized attempt to get notes");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const {
      search = "",
      categories = [],
      sortBy = "created_at",
      sortOrder = "desc",
      page = "1",
      limit = "10",
    } = req.query;

    const { notes, total } = await NoteModel.findNotes(
      userId,
      search as string,
      Array.isArray(categories)
        ? (categories as string[])
        : [categories as string],
      sortBy as string,
      sortOrder as "asc" | "desc",
      parseInt(page as string, 10),
      parseInt(limit as string, 10)
    );

    logger.info(`Notes retrieved successfully for user ${userId}`);
    res.json({ notes, total });
  } catch (error) {
    logger.error(`Error retrieving notes: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNote: express.RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      logger.warn("Unauthorized attempt to update a note");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const note = await prisma.notes.update({
      where: { id: Number(id), user_id: userId },
      data: req.body,
    });

    logger.info(`Note ${id} updated successfully for user ${userId}`);
    res.json(note);
  } catch (error) {
    logger.error(`Error updating note: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNote: express.RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      logger.warn("Unauthorized attempt to delete a note");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    await prisma.notes.delete({ where: { id: Number(id), user_id: userId } });
    logger.info(`Note ${id} deleted successfully for user ${userId}`);
    res.status(204).send();
  } catch (error) {
    logger.error(`Error deleting note: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const togglePin: express.RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      logger.warn("Unauthorized attempt to toggle pin status of a note");
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const note = await prisma.notes.findUnique({ where: { id: Number(id), user_id: userId } });
    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }

    const updatedNote = await prisma.notes.update({
      where: { id: Number(id), user_id: userId },
      data: { is_pinned: !note.is_pinned },
    });

    logger.info(
      `Pin status of note ${id} toggled successfully for user ${userId}`
    );
    res.json(updatedNote);
  } catch (error) {
    logger.error(`Error toggling pin status of note: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
};