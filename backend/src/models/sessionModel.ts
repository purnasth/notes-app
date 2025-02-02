import pool from "../config/db";

interface Session {
  id: number;
  user_id: number;
  session_token: string;
  expires_at: Date;
  created_at: Date;
}

export const createSession = async (
  userId: number,
  sessionToken: string,
  expiresAt: Date
): Promise<Session> => {
  const result = await pool.query(
    "INSERT INTO sessions (user_id, session_token, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [userId, sessionToken, expiresAt]
  );
  return result.rows[0];
};

export const findSessionByToken = async (
  sessionToken: string
): Promise<Session | null> => {
  const result = await pool.query(
    "SELECT * FROM sessions WHERE session_token = $1",
    [sessionToken]
  );
  return result.rows[0] || null;
};

export const deleteSession = async (sessionToken: string): Promise<void> => {
  await pool.query("DELETE FROM sessions WHERE session_token = $1", [
    sessionToken,
  ]);
};
