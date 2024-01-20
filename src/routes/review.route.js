import express from "express";
const router = express.Router();
router.use(express.json());

import { errorHandler, errorHandlerwithLoggedIn } from "../middleware/routeErrorHandler.middleware.js";
import { getReviewsbyPage, createReview, updateReview, deleteReview } from "../controllers/review.controller.js";

router.get("/:isbn/:page", errorHandler(getReviewsbyPage));
router.post("/:isbn", errorHandlerwithLoggedIn(createReview));
router.put("/:isbn", errorHandlerwithLoggedIn(updateReview));
router.delete("/:isbn", errorHandlerwithLoggedIn(deleteReview));

export default router;
