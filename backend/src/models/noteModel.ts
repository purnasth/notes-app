import prisma from "../config/db";
import { Note } from "../interfaces/types";

export class NoteModel {
  static async create(note: Note): Promise<Note> {
    const createdNote = await prisma.notes.create({
      data: {
        title: note.title,
        content: note.content,
        categories: note.categories,
        user_id: note.user_id,
        is_pinned: note.is_pinned || false,
      },
    });
    return createdNote;
  }

  static async findAllByUser(userId: number): Promise<Note[]> {
    const notes = await prisma.notes.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
    });
    return notes;
  }

  static async update(id: number, note: Partial<Note>): Promise<Note> {
    const updatedNote = await prisma.notes.update({
      where: { id },
      data: {
        title: note.title,
        content: note.content,
        categories: note.categories,
        modified_at: new Date(),
      },
    });
    return updatedNote;
  }

  static async delete(id: number): Promise<void> {
    await prisma.notes.delete({ where: { id } });
  }

  static async togglePin(id: number, userId: number): Promise<Note | null> {
    const note = await prisma.notes.findUnique({ where: { id, user_id: userId } });
    if (!note) return null;

    const updatedNote = await prisma.notes.update({
      where: { id },
      data: { is_pinned: !note.is_pinned },
    });
    return updatedNote;
  }

  static async findNotes(
    userId: number,
    search?: string,
    categories?: string[],
    sortBy: string = "created_at",
    sortOrder: "asc" | "desc" = "desc",
    page: number = 1,
    limit: number = 10
  ): Promise<{ notes: Note[]; total: number }> {
    const where: any = { user_id: userId };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }

    if (categories && categories.length > 0) {
      where.categories = { hasSome: categories.map((c) => c.toLowerCase()) };
    }

    const total = await prisma.notes.count({ where });

    const notes = await prisma.notes.findMany({
      where,
      orderBy: [
        { is_pinned: "desc" }, // Pinned notes first
        { [sortBy]: sortOrder }, // Sort by the specified field
      ],
      skip: (page - 1) * limit,
      take: limit,
    });

    return { notes, total };
  }
}