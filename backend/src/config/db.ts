// import { Pool } from "pg";
// import dotenv from "dotenv";

// dotenv.config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: parseInt(process.env.DB_PORT || "5432"),
// });

// pool.connect((err, client, release) => {
//   if (err) {
//     console.error("Database connection error:", err.stack);
//   } else {
//     console.log("Connected to the database");
//     release();
//   }
// });

// export default pool;
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
    process.exit(1); // Exit if the connection fails
  }
}

connectDB();

export default prisma;
