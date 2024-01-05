import path from "path";
import code from "http-status-codes";
const __dirname = path.resolve();

import { selectNewest5 } from "../models/main.model.js";

export const main_page = (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/views/main.html"));
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR).sendFile(path.join(__dirname, "/views/500.html"));
  }
};

export const getNewestBooks = async (req, res) => {
  try {
    const result = await selectNewest5();
    res.status(code.OK).json(result);
  } catch (err) {
    console.log(err);
    res.status(code.INTERNAL_SERVER_ERROR);
  }
};
