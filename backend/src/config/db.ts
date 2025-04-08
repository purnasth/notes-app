import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("✅ Connected to the database");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
}

connectDB();

export default prisma;
