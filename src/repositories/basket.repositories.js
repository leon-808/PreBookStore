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
  const sql = `insert into basket (user_id, book_id) values(?, ?)`;
  const result = await conn.query(sql, values);
  return;
};

export const updateBooksinBasket = async (conn, user_id, isbn_list, quantity_list, selected_list) => {
  let conditions = [];
  let quantityString = quantitySQL(conditions, isbn_list, quantity_list);
  conditions = [];
  let selectedString = selectedSQL(conditions, isbn_list, selected_list);
  const values = [user_id];
  const sql = `
    update basket
    set 
        quantity = case ${quantityString} end,
        selected = case ${selectedString} end
    where user_id = ? 
    `;
  const result = await conn.query(sql, values);
  return;
};

const quantitySQL = (conditions, isbn_list, quantity_list) => {
  for (let i = 0; i < isbn_list.length; i++) {
    conditions.push(`when book_id = ${isbn_list[i]} then ${quantity_list[i]}`);
  }
  return conditions.join(" ");
};

const selectedSQL = (conditions, isbn_list, selected_list) => {
  for (let i = 0; i < isbn_list.length; i++) {
    conditions.push(`when book_id = ${isbn_list[i]} then ${selected_list[i]}`);
  }
  return conditions.join(" ");
};
