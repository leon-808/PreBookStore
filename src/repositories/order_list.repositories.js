export const selectOrdered5 = async (conn, user_id) => {
  const sql = `
    select o.id, od.book_id, od.quantity, o.total_price, o.payed_at, r.name, r.address, r.tel, d.state
    from orders o
    join order_detail od on od.orders_id = o.id
    join delivery d on d.orders_id = o.id
    join receiver r on r.id = d.receiver_id
    where o.payed_at is not null
    and o.user_id = ?
    `;
  const values = [user_id];
  const queryResult = await conn.query(sql, values);
  return await clusteringOrders(queryResult[0]);
};

const clusteringOrders = async (queryResult) => {
  let map = new Map();
  for (const o of queryResult) {
    if (map.has(o.id)) {
      const array = map.get(o.id);
      array.push({ book_id: o.book_id, quantity: o.quantity });
      map.set(o.id, array);
    } else {
      map.set(o.id, [
        {
          total_price: o.total_price,
          payed_at: o.payed_at,
          name: o.name,
          address: o.address,
          tel: o.tel,
          state: o.state,
        },
        { book_id: o.book_id, quantity: o.quantity },
      ]);
    }
  }
  const obj = {};
  for (const [key, value] of map.entries()) {
    obj[key] = value;
  }
  return obj;
};
