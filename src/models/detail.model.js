import Database from "../../db.js";
const db = Database.getInstance();

export const selectBookInfo = async (isbn, user_id) => {
  let conn;
  try {
    conn = await db.getConnection();
    let condition = [", 0 as likes"];
    const values = [isbn];
    isUserLikes(condition, values, isbn, user_id);
    const conditionString = condition.join("");

    const sql = `
    select b.*, i.url, count(l.book_id) as like_count
    ${conditionString}
    from book b
    join image i on b.id = i.book_id
    left join likes l on b.id = l.book_id
    where b.id = ?
    group by i.url;
    `;

    const result = await conn.query(sql, values);
    return result[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

const isUserLikes = (condition, values, isbn, user_id) => {
  if (user_id) {
    condition.pop();
    condition.push(", (select count(*) from likes where book_id = ? and user_id = ?) as likes");
    values.push(user_id);
  }
  values.push(isbn);
};
