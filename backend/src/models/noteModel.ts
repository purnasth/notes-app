import pool from "../config/db";
import { Note } from "../interfaces/types";

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

  static async togglePin(id: number): Promise<Note> {
    const { rows } = await pool.query(
      `UPDATE notes 
       SET is_pinned = NOT is_pinned 
       WHERE id = $1 RETURNING *`,
      [id]
    );
    return rows[0];
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
      baseQuery += ` AND categories @> $${params.length + 1}::varchar[]`;
      params.push(categories.map((c) => c.toLowerCase()));
    }


    // Get total count
    const countQuery = `SELECT COUNT(*) ${baseQuery}`;
    const countResult = await pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count, 10);

    // Get paginated results
    let dataQuery = `SELECT * ${baseQuery}`;

    if (sortBy) {
      dataQuery += ` ORDER BY ${sortBy} ${sortOrder || "asc"}`;
    } else {
      dataQuery += " ORDER BY created_at DESC";
    }

    if (page && limit) {
      const offset = (page - 1) * limit;
      dataQuery += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
    }

    console.log("Data Query:", dataQuery);
    console.log("Params:", params);

    const { rows } = await pool.query(dataQuery, params);

    console.log("Rows:", rows);

    return { notes: rows, total };
  }
}
