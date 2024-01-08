import Database from "../../db.js";
const db = Database.getInstance();

const orderByMap = {
  like: "like_count desc",
  expansive: "b.price desc",
  cheap: "b.price",
  new: "b.publication_date desc",
  old: "b.publication_date",
};

// TO-DO 쿼리 스트링일 때도 동작하게 바꾸기
export const selectBookInfo = async (keyword, category, sDate, eDate, orderBy, page) => {
  let conn;
  try {
    conn = await db.getConnection();
    let conditions = ["i.thumbnail = 1"];
    let values = [];
    const conditionsString = conditionSQL(keyword, category, sDate, eDate, conditions, values);

    conditions = ["order by "];
    const orderByString = orderBySQL(orderBy, conditions);

    const limit = 3;
    let offset = limit * (page - 1);
    values.push(limit, offset);

    const sql = `
    select b.id, b.category_id, b.title, b.author, b.publication_date, b.catchpharase, b.price, i.url, count(l.book_id) as like_count
    from book b
    join image i on b.id = i.book_id
    left join likes l on b.id = l.book_id
    where ${conditionsString}
    group by b.id, b.category_id, b.title, b.author, b.publication_date, b.catchpharase, b.price, i.url
    ${orderByString}
    limit ? offset ?
    `;

    const result = await conn.query(sql, values);
    return result[0];
  } catch (err) {
    throw err;
  } finally {
    if (conn) conn.release();
  }
};

const conditionSQL = (keyword, category, sDate, eDate, conditions, values) => {
  if (keyword) {
    conditions.push("b.title like ?");
    values.push(`%${keyword}%`);
  }
  if (category) {
    conditions.push("b.category_id = ?");
    values.push(category);
  }
  if (sDate && eDate) {
    conditions.push("b.publication_date between ? and ?");
    values.push(sDate, eDate);
  } else if (sDate) {
    conditions.push("b.publication_date >= ?");
    values.push(sDate);
  } else if (eDate) {
    conditions.push("b.publication_date <= ?");
    values.push(eDate);
  }
  return conditions.length > 1 ? conditions.join(" and ") : conditions[0];
};

const orderBySQL = (orderBy, conditions) => {
  if (orderByMap[orderBy]) {
    conditions.push(orderByMap[orderBy]);
  }
  return conditions.length > 1 ? conditions.join("") : "";
};
