import prisma from "../config/db";
import { Session } from "../interfaces/types";

export const createSession = async (
  userId: number,
  sessionToken: string,
  expiresAt: Date
): Promise<Session> => {
  const session = await prisma.sessions.create({
    data: {
      user_id: userId,
      session_token: sessionToken,
      expires_at: expiresAt,
    },
  });
  return session;
};

export const findSessionByToken = async (
  sessionToken: string
): Promise<Session | null> => {
  const session = await prisma.sessions.findUnique({
    where: { session_token: sessionToken },
  });
  return session;
};

export const deleteSession = async (sessionToken: string): Promise<void> => {
  await prisma.sessions.delete({ where: { session_token: sessionToken } });
};
