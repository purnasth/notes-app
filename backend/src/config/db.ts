import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("Database connection error:", err.stack);
  } else {
    console.log("Connected to the database");
    release();
  }
});

export default pool;

// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export default pool;
