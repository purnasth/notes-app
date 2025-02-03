import pool from '../config/db';
import { Note } from '../interfaces/types';

export class NoteModel {
  static async create(note: Note): Promise<Note> {
    const { rows } = await pool.query(
      `INSERT INTO notes (title, content, categories, user_id) 
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [note.title, note.content, note.categories, note.user_id]
    );
    return rows[0];
  }

  static async findAllByUser(userId: number): Promise<Note[]> {
    const { rows } = await pool.query(
      'SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return rows;
  }

  static async update(id: number, note: Partial<Note>): Promise<Note> {
    const { rows } = await pool.query(
      `UPDATE notes 
       SET title = $1, content = $2, categories = $3, modified_at = NOW() 
       WHERE id = $4 RETURNING *`,
      [note.title, note.content, note.categories, id]
    );
    return rows[0];
  }

  static async delete(id: number): Promise<void> {
    await pool.query('DELETE FROM notes WHERE id = $1', [id]);
  }

  static async togglePin(id: number): Promise<Note> {
    const { rows } = await pool.query(
      `UPDATE notes 
       SET is_pinned = NOT is_pinned 
       WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
  }
}