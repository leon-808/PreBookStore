import path from "path";
import code from "http-status-codes";
const __dirname = path.resolve();

import { ifBooksParamNull } from "../middleware/isParamNull.js";
import { selectBookInfo } from "../models/search.model.js";

export const search_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/search.html"));
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const getSearchResult = async (req, res) => {
  try {
    const [encodedKeyword, encodedCategory, sDate, eDate, orderBy, page] = ifBooksParamNull(req.query);
    const keyword = decodeURIComponent(encodedKeyword);
    const result = await selectBookInfo(keyword, category, sDate, eDate, orderBy, page);
    res.status(code.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).end();
  }
};
