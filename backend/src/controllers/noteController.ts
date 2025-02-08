import express from "express";
import { NoteModel } from "../models/noteModel";

import { Request, Response, NextFunction } from "express";

export const createNote: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, content, categories } = req.body;
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const note = await NoteModel.create({
      title,
      content,
      categories,
      user_id: userId,
    });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNotes: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const { search, categories, sortBy, sortOrder, page, limit } = req.query;
    const notes = await NoteModel.findNotes(
      userId,
      search as string,
      categories as string[],
      sortBy as string,
      sortOrder as 'asc' | 'desc',
      page ? parseInt(page as string, 10) : undefined,
      limit ? parseInt(limit as string, 10) : undefined
    );

    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNote: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const note = await NoteModel.update(Number(id), req.body);
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNote: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    await NoteModel.delete(Number(id));
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const togglePin: express.RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const note = await NoteModel.togglePin(Number(id));
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
