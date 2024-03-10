import mysql from "mysql"
import dotenv from 'dotenv';
dotenv.config();

export const db = mysql.createConnection({
    host: "socialmysqlserver.mysql.database.azure.com",
    user: "socialmysqluser",
    password: process.env.DB_PW,
    database: "social"
})