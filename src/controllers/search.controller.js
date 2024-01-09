import code from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorHandlerDB } from "../middleware/repositoryErrorHandler.middleware.js";
import { ifBooksParamNull } from "../middleware/isParamNull.middleware.js";
import { selectBookInfo } from "../repositories/search.repositories.js";

export const search_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/search.html"));
};

export const getSearchResult = async (req, res) => {
  const [encodedKeyword, encodedCategory, sDate, eDate, orderBy, page] = ifBooksParamNull(req.query);
  const keyword = decodeURIComponent(encodedKeyword);
  const result = await errorHandlerDB(selectBookInfo)(db, keyword, category, sDate, eDate, orderBy, page);
  res.status(code.OK).json(result);
};
