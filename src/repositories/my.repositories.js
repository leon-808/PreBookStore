export const selectUserforMyPage = async (conn, id) => {
  const sql = `select id, name, birth, tel, email, address from user where id = ?`;
  const values = [id];
  const result = await conn.query(sql, values);
  return result[0][0];
};

export const selectUserPassword = async (conn, id) => {
  const sql = `select password as existingPassword from user where id = ?`;
  const values = [id];
  const result = await conn.query(sql, values);
  return result[0][0];
};

export const updateUserInfo = async (conn, newPassword, tel, email, address, authID) => {
  const sql = `update user set password = ?, tel = ?, email = ?, address = ? where id = ?`;
  const values = [newPassword, tel, email, address, authID];
  await conn.query(sql, values);
};
