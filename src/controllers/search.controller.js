import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { ifBooksParamNull } from "../middleware/isParamNull.middleware.js";
import { selectBookInfo } from "../repositories/search.repositories.js";

export const search_page = (req, res) => {
  res.status(httpCode.OK).sendFile(path.join(__dirname, "/views/search.html"));
};

export const getSearchResult = async (req, res) => {
  const [encodedKeyword, category, sDate, eDate, orderBy, page] = ifBooksParamNull(req.query);
  const keyword = decodeURIComponent(encodedKeyword);
  const result = await errorDBHandler(selectBookInfo)(db, encodedKeyword, category, sDate, eDate, orderBy, page);
  res.status(httpCode.OK).json(result);
};
