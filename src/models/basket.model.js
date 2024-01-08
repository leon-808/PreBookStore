import Database from "../../db.js";
const db = Database.getInstance();

export const selectBooksinBasket = async (user_id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const values = [user_id];
    const sql = `
    select b.id, b.title, b.price, i.url
    from basket bk
    join book b on b.id = bk.book_id
    join image i on i.book_id = bk.book_id
    where bk.user_id = ? and i.thumbnail = true;
    `;
    const result = await conn.query(sql, values);
    return result[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

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
