import pool from "../config/db";
import { Note } from "../interfaces/types";

export class NoteModel {
  static async create(note: Note): Promise<Note> {
    const { rows } = await pool.query(
      `INSERT INTO notes (title, content, categories, user_id, is_pinned) 
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [note.title, note.content, note.categories, note.user_id, note.is_pinned]
    );
    return rows[0];
  }

  static async findAllByUser(userId: number): Promise<Note[]> {
    const { rows } = await pool.query(
      "SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at DESC",
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
    await pool.query("DELETE FROM notes WHERE id = $1", [id]);
  }

  static async togglePin(id: number, userId: number): Promise<Note | null> {
    const { rows } = await pool.query(
      `UPDATE notes 
       SET is_pinned = CASE WHEN is_pinned THEN FALSE ELSE TRUE END 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
      [id, userId]
    );
    return rows.length > 0 ? rows[0] : null; // Return null if no row is updated
  }

  // Find notes with optional search, categories, sorting, pagination
  static async findNotes(
    userId: number,
    search?: string,
    categories?: string[],
    sortBy?: string,
    sortOrder?: "asc" | "desc",
    page?: number,
    limit?: number
  ): Promise<{ notes: Note[]; total: number }> {
    let baseQuery = "FROM notes WHERE user_id = $1";
    const params: any[] = [userId];

    if (search) {
      baseQuery += ` AND (title ILIKE $${params.length + 1} OR content ILIKE $${
        params.length + 1
      })`;
      params.push(`%${search}%`);
    }

    // if (categories && categories.length > 0) {
    //   baseQuery += ` AND categories @> $${params.length + 1}::varchar[]`;
    //   params.push(categories);
    // }

    // convert the params.length into the lower case

    if (categories && categories.length > 0) {
      baseQuery += ` AND categories && $${params.length + 1}::varchar[]`;
      params.push(categories.map((c) => c.toLowerCase()));
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) ${baseQuery}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count, 10);

    // Sort to prioritize pinned notes first, then apply sorting preference
    let dataQuery = `SELECT * ${baseQuery} ORDER BY is_pinned DESC, ${sortBy} ${sortOrder}`;

    if (page && limit) {
      const offset = (page - 1) * limit;
      dataQuery += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
    }

    const { rows } = await pool.query(dataQuery, params);

    console.log("Rows:", rows);

    return { notes: rows, total };
  }
}
