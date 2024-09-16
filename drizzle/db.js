const dotenv = "dotenv";
const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require('mysql2/promise');

require(dotenv).config();

if (
  !process.env.DB_HOST &&
  !process.env.DB_USERNAME &&
  !process.env.DB_PASSWORD &&
  !process.env.DB_DATABASE
) {
  throw new Error("Database credentials are missing");
}

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    charset: "utf8mb4",
    connectionLimit: 10, // Adjust the connection limit as needed
  });

const db = drizzle(connection);

module.exports = { db, connection };