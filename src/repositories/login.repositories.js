export const selectUserforLogin = async (conn, id) => {
  const sql = `select id as db_id, password as db_password from user where id = ?`;
  const values = [id];
  const result = await conn.query(sql, values);
  return result[0][0];
};
