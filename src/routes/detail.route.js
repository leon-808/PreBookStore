import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { detail_page, getDetailofBook } from "../controllers/detail.controller.js";

router.get("/", errorPageHandler(detail_page));
router.get("/:isbn", errorHandler(getDetailofBook));

export default router;
