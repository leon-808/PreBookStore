import Database from "../../db.js";
const db = Database.getInstance();

export const selectUserforMyPage = async (id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `select id, name, birth, tel, email, address from user where id = ?`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result[0][0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const selectUserPassword = async (id) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `select password as existingPassword from user where id = ?`;
    const values = [id];
    const result = await conn.query(sql, values);
    return result[0][0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

export const updateUserInfo = async (newPassword, tel, email, address, authID) => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `update user set password = ?, tel = ?, email = ?, address = ? where id = ?`;
    const values = [newPassword, tel, email, address, authID];
    await conn.query(sql, values);
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
