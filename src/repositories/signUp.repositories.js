export const insertUser = async (conn, id, password, name, birth, tel, email, address) => {
  const sql = `insert into user values(?, ?, ?, ?, ?, ?, ?)`;
  const values = [id, password, name, birth, tel, email, address];
  return await conn.query(sql, values);
};
