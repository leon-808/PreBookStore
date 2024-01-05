import express from "express";
const router = express.Router();
router.use(express.json());

import { detail_page, getDetailofBook } from "../controllers/detail.controller.js";

router.get("/", detail_page);
router.get("/:isbn", getDetailofBook);

export default router;
