import mysql from "mysql2";

export const db = mysql?.createConnection({
  host: "localhost",
  user: "root",
  password: "abc123",
  // database: "blog",
  database: "buy-and-sell",
});
