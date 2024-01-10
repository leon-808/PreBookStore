import path from "path";
import httpCode from "http-status-codes";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import { selectNewest5 } from "../repositories/main.repositories.js";

export const main_page = (req, res) => {
  res.sendFile(path.join(__dirname, "/views/main.html"));
};

export const getNewestBooks = async (req, res) => {
  const result = await errorDBHandler(selectNewest5);
  res.status(httpCode.OK).json(result);
};
