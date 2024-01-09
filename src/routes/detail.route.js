import express from "express";
const router = express.Router();
router.use(express.json());

import { err500Page, err500 } from "../middleware/routeErrorHandler.middleware.js";
import { detail_page, getDetailofBook } from "../controllers/detail.controller.js";

router.get("/", err500Page(detail_page));
router.get("/:isbn", err500(getDetailofBook));

export default router;
