export const insertLike = async (conn, isbn, user_id) => {
  const sql = `insert into likes values(?, ?)`;
  const values = [isbn, user_id];
  await conn.query(sql, values);
  return;
};

export const deleteLike = async (conn, isbn, user_id) => {
  const sql = `
    delete from likes
    where book_id = ? and user_id = ?
  `;
  const values = [isbn, user_id];
  await conn.query(sql, values);
  return;
};
