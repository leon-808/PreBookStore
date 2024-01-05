import Database from "../../db.js";
const db = Database.getInstance();

export const selectNewest5 = async () => {
  let conn;
  try {
    conn = await db.getConnection();
    const sql = `
    select  b.id, b.title, b.catchpharase, b.price, i.url, count(l.book_id) as like_count,
    from book b
    join image i on b.id = i.book_id
    left join likes l on b.id = l.book_id
    where i.thumbnail = 1
    and b.publication_date between date_sub(now(), interval 1 month) and now()
    group by b.id, b.title, b.catchpharase, b.price, i.url
    order by b.publication_date
    limit 5
    `;
    const result = await conn.query(sql);
    return result[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};
