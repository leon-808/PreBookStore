import Database from "../../db.js";
const db = Database.getInstance();

export const insertUser = async (id, password, name, birth, tel, email, address) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `insert into user values(?, ?, ?, ?, ?, ?, ?)`;
    const values = [id, password, name, birth, tel, email, address];
    return await conn.query(sql, values);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
