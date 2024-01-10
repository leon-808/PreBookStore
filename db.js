import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
const env = dotenv.config().parsed;

class Database {
  constructor() {
    this.pool = mysql2.createPool({
      host: env.HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      connectionLimit: env.DB_CONNECTION_LIMIT,
      dateStrings: true,
    });
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async getConnection() {
    return await this.pool.getConnection();
  }

  async closePool() {
    await this.pool.end();
  }
}

export default Database;
