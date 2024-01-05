import path from "path";
import code from "http-status-codes";
const __dirname = path.resolve();

import { getIdFromToken } from "../middleware/verifyToken.js";
import { selectBookInfo } from "../models/detail.model.js";

export const detail_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/detail.html"));
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const getDetailofBook = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    let user_id;
    if (req.headers.authorization) {
      user_id = getIdFromToken(req.headers.authorization.split(" ")[1]);
    }
    const result = await selectBookInfo(isbn, user_id);
    res.status(code.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR);
  }
};
