import Database from "../../db.js";
const db = Database.getInstance();

export const selectUserforLogin = async (id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `select id as db_id, password as db_password from user where id = ?`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result[0][0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
