export const selectCurrentOrder = async (conn, user_id) => {
  const sql = `
    select o.id, o.total_price, od.book_id as isbn, od.quantity, b.price
    from orders o
    join order_detail od on od.orders_id = o.id
    join book b on b.id = od.book_id
    where o.user_id = ? and o.payed_at is null
    `;
  const values = [user_id];
  const result = await conn.query(sql, values);
  return await clusteringCurrentOrder(result[0]);
};

const clusteringCurrentOrder = async (result) => {
  const id = result[0].id;
  const total_price = result[0].total_price;
  let books = [];
  for (const e of result) books.push({ isbn: e.isbn, quantity: e.quantity, price: e.price });
  const obj = {
    id: id,
    total_price: total_price,
    books: books,
  };
  return obj;
};

export const selectReceivers = async (conn, user_id, page) => {
  const limit = 3;
  const offset = limit * (page - 1);
  const sql = "select * from receiver where user_id = ? limit ? offset ?";
  const values = [user_id, limit, offset];
  const result = await conn.query(sql, values);
  return result[0];
};

export const insertReceiver = async (conn, user_id, name, address, tel) => {
  const sql = "insert into receiver (id, user_id, name, address, tel) values(?, ?, ?, ?, ?)";
  const values = [user_id + tel, user_id, name, address, tel];
  await conn.query(sql, values);
  return;
};

export const deleteReceiver = async (conn, user_id, tel) => {
  const id = user_id + tel;
  const sql = "delete from receiver where id = ?";
  const values = [id];
  await conn.query(sql, values);
  return;
};

export const updateOrder = async (conn, user_id, order_id, receiver_id) => {
  await conn.query(`call confirmOrder('${order_id}', '${receiver_id}')`);
  return;
};
