import Database from "../../db.js";
const db = Database.getInstance();

export const insertBookinBasket = async (user_id, isbn) => {
  let conn;
  try {
    conn = await db.getConnection();
    const values = [user_id, isbn];
    const sql = `insert into basket values(?, ?)`;
    const result = await conn.query(sql, values);
    return;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
