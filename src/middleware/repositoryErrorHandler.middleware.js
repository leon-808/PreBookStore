export const errorHandlerDB =
  (handler) =>
  async (db, ...params) => {
    let conn;
    try {
      conn = await db.getConnection();
      return await handler(conn, ...params);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.release();
    }
  };
