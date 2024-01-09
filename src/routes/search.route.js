import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { search_page, getSearchResult } from "../controllers/search.controller.js";

router.get("/", errorPageHandler(search_page));
router.get("/search", errorPageHandler(getSearchResult));

export default router;
