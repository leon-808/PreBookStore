import express from "express";
const router = express.Router();
router.use(express.json());

import { err500Page, err500 } from "../middleware/routeErrorHandler.middleware.js";
import { main_page, getNewestBooks } from "../controllers/main.controller.js";

router.get("/", err500Page(main_page));
router.get("/newest", err500(getNewestBooks));

export default router;
