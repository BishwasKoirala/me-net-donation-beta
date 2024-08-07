import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
// host: "localhost",
// user: "root",
// database: "drizzledb" ,
// password:"12345",
// port: 3306,
// waitForConnections: true,
// connectionLimit: 10,
// queueLimit: 0,
// multipleStatements : true

export const dbParams = {
  host: process.env.MYSQL_HOST as string,
  user: process.env.MYSQL_USER as string,
  database: process.env.MYSQL_DATABASE as string,
  password: process.env.MYSQL_PASSWORD as string,
  port: Number(process.env.MYSQL_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true,
};

export const connection = await mysql.createConnection(dbParams);
export const db = drizzle(connection, { schema, mode: "default" });
