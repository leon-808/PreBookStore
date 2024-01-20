import httpCode from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorDBHandler } from "../middleware/repositoryErrorHandler.middleware.js";
import {
  selectRecentReviewsbyIsbn,
  insertReview,
  updateUserReview,
  deleteUserReview,
} from "../repositories/review.repositories.js";

export const getReviewsbyPage = async (req, res) => {
  const { isbn, page } = req.params;
  const result = await errorDBHandler(selectRecentReviewsbyIsbn)(db, isbn, page);
  res.status(httpCode.OK).json(result);
};

export const createReview = async (req, res, user_id) => {
  const isbn = req.params.isbn;
  const content = req.body.content;
  await errorDBHandler(insertReview)(db, user_id, isbn, content);
  res.status(httpCode.CREATED).json("리뷰 작성");
};

export const updateReview = async (req, res, user_id) => {
  const isbn = req.params.isbn;
  const content = req.body.content;
  await errorDBHandler(updateUserReview)(db, user_id, isbn, content);
  res.status(httpCode.OK).json("리뷰 수정");
};

export const deleteReview = async (req, res, user_id) => {
  const isbn = req.params.isbn;
  await errorDBHandler(deleteUserReview)(db, user_id, isbn);
  res.status(httpCode.OK).json("리뷰 삭제");
};
