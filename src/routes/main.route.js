import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { main_page, getNewestBooks } from "../controllers/main.controller.js";

router.get("/", errorPageHandler(main_page));
router.get("/newest", errorHandler(getNewestBooks));

export default router;
