import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import {
  getRecentReviews,
  getReviewsbyPage,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

router.get("/:isbn", errorHandler(getRecentReviews));
router.get("/:isbn/:page", errorHandler(getReviewsbyPage));
router.post("/:isbn", errorHandler(createReview));
router.put("/:isbn", errorHandler(updateReview));
router.delete("/:isbn", errorHandler(deleteReview));

export default router;
