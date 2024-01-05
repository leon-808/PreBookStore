import Database from "../../db.js";
const db = Database.getInstance();

export const insertLike = async (isbn, user_id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `
    insert into likes 
    values(?, ?)
    `;
    const values = [isbn, user_id];
    await conn.query(sql, values);
    return;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const deleteLike = async (isbn, user_id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `
      delete from likes
      where book_id = ? and user_id = ?
      `;
    const values = [isbn, user_id];
    await conn.query(sql, values);
    return;
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
