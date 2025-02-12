import prisma from "../config/db";
import bcrypt from "bcryptjs";
import { User } from "../interfaces/types";


export const createUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      username,
      email,
      password_hash: hashedPassword,
    },
  });
  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await prisma.users.findUnique({ where: { email } });
  return user;
};

export const findUserById = async (id: number): Promise<User | null> => {
  const user = await prisma.users.findUnique({ where: { id } });
  return user;
};

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      created_at: true,
      password_hash: true,
    },
  });
  return users;
};