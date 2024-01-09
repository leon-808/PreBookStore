import code from "http-status-codes";
import path from "path";
const __dirname = path.resolve();
import Database from "../../db.js";
const db = Database.getInstance();

import { errorHandlerDB } from "../middleware/repositoryErrorHandler.middleware.js";

export const getRecentReviews = (req, res) => {
  res.status(code.OK).json("해당 도서 최근 리뷰 가져오기");
};

export const getReviewsbyPage = (req, res) => {
  res.status(code.OK).json("해당 도서 페이지별 리뷰 가져오기");
};

export const createReview = (req, res) => {
  res.status(code.OK).json("리뷰 작성");
};

export const updateReview = (req, res) => {
  res.status(code.OK).json("리뷰 수정");
};

export const deleteReview = (req, res) => {
  res.status(code.OK).json("리뷰 삭제");
};
