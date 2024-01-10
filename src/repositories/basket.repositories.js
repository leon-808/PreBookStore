import { genOrderIdentifier } from "../middleware/genOrderIdentifier.middleware.js";

export const selectBooksinBasket = async (conn, user_id) => {
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
};

export const insertBookinBasket = async (conn, user_id, isbn) => {
  const values = [user_id, isbn];
  const sql = `insert into basket values(?, ?)`;
  await conn.query(sql, values);
  return;
};

export const deleteBooksinBasket = async (conn, user_id, isbn_list) => {
  const conditions = [];
  const values = [user_id, ...isbn_list];
  const conditionString = conditionSQL(conditions, values);
  const sql = `delete from basket where user_id = ? and (book_id = ${conditionString})`;
  await conn.query(sql, values);
  return;
};

const conditionSQL = (conditions, values) => {
  for (let i = 0; i < values.length - 1; i++) {
    conditions.push("?");
  }
  return conditions.length > 1 ? conditions.join(" or ") : conditions.join("");
};

export const insertNewOrder = async (conn, user_id, isbn_list, quantity_list) => {
  const orders_id = genOrderIdentifier(user_id);
  let sql = `call checkExistCurrentOrder('${user_id}')`;
  await conn.query(sql);
  for (let i = 0; i < isbn_list.length; i++) {
    sql = `call insertOrder('${orders_id}', '${user_id}', '${isbn_list[i]}', ${quantity_list[i]})`;
    await conn.query(sql);
  }
  return;
};
