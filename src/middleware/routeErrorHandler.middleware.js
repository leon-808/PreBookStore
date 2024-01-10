import httpCode from "http-status-codes";
import { getIdFromToken, isProperToken } from "../middleware/verifyToken.middleware.js";

const sqlStateMap = {
  23000: httpCode.CONFLICT,
  45000: httpCode.INTERNAL_SERVER_ERROR,
};

const sqlMessageMap = {
  23000: "이미 존재하는 값입니다.",
  45000: "서버 내부 오류 발생.",
};

export const errorPageHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.log(err);
    res.status(httpCode.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const errorHandler = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.log(err);
    if (err.httpCode) res.status(err.httpCode).json(err.message);
    if (err.sqlState) res.status(sqlStateMap[err.sqlState]).json(sqlMessageMap[err.sqlState]);
    res.status(httpCode.INTERNAL_SERVER_ERROR).end();
  }
};

export const errorHandlerwithLoggedIn = (handler) => async (req, res) => {
  try {
    const user_id = getIdFromToken(req);
    if (!isProperToken(user_id, res, httpCode)) return;
    await handler(req, res, user_id);
  } catch (err) {
    console.log(err);
    if (err.httpCode) res.status(err.httpCode).json(err.message);
    if (err.sqlState) res.status(sqlStateMap[err.sqlState]).json(sqlMessageMap[err.sqlState]);
    res.status(httpCode.INTERNAL_SERVER_ERROR).end();
  }
};
