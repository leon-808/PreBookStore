import { getIdFromToken, isProperToken } from "../middleware/verifyToken.middleware.js";

export const errorPageHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const errorHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.log(err);
    if (err.code) res.status(err.code).json(err.message);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};

export const errorHandlerwithLoggedIn = (handler) => async (req, res) => {
  try {
    const user_id = getIdFromToken(req);
    if (!isProperToken(user_id, res, code)) return;
    await handler(req, res, user_id);
  } catch (err) {
    console.log(err);
    if (err.code) res.status(err.code).json(err.message);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};
