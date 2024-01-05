import express from "express";
const router = express.Router();
router.use(express.json());

import {
  getRecentReviews,
  getReviewsbyPage,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

router.get("/:isbn", getRecentReviews);
router.get("/:isbn/:page", getReviewsbyPage);
router.post("/:isbn", createReview);
router.put("/:isbn", updateReview);
router.delete("/:isbn", deleteReview);

export default router;
