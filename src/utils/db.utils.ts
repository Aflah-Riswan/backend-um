import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "user_management",

  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig);

export const initializeDB = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log(" connected successfully...");
    const sqlFilePath = path.join(process.cwd(), "src", "db", "init.sql");
    const sqlQuery = await fs.readFile(sqlFilePath, "utf8");
    
    await pool.query(sqlQuery);
  } catch (error) {
    console.log("found error");
    console.log(error);
    process.exit(1);
  }
};
