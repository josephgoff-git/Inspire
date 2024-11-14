import mysql from "mysql2"
import dotenv from 'dotenv';
dotenv.config();

// export const db = mysql.createConnection({
//     host: "aws-db2.c9wkcmm26naa.us-east-2.rds.amazonaws.com",
//     user: "admin",
//     password: process.env.DB_PW,
//     database: "social"
// })

export const db = mysql.createConnection({
    host: 'junction.proxy.rlwy.net',
    port: 51271,
    user: 'root',
    password: 'RnpAIoKFQoSvJzUKlNgyYxpYvNFOnsRG',
    database: 'social' 
});