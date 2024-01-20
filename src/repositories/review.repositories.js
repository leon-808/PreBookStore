export const selectRecentReviewsbyIsbn = async (conn, isbn, page) => {
  const limit = 5;
  const offset = limit * (page - 1);
  const sql = `
    select user_id, created_at, content
    from review
    where book_id = ?
    order by created_at desc
    limit 5 offset ?
    `;
  const values = [isbn, offset];
  const result = await conn.query(sql, values);
  return result[0];
};

export const insertReview = async (conn, user_id, isbn, content) => {
  const sql = `
    insert into review (book_id, user_id, content)
    values(?, ?, ?);
  `;
  const values = [isbn, user_id, content];
  await conn.query(sql, values);
  return;
};

export const updateUserReview = async (conn, user_id, isbn, content) => {
  const sql = `
    update review
    set content = ?
    where book_id = ? and user_id = ?
  `;
  const values = [content, isbn, user_id];
  console.log(values);
  const result = await conn.query(sql, values);
  return;
};

export const deleteUserReview = async (conn, user_id, isbn) => {
  const sql = `
    delete from review
    where book_id = ? and user_id = ?
  `;
  const values = [isbn, user_id];
  await conn.query(sql, values);
  return;
};
