import express from "express";
const router = express.Router();
router.use(express.json());

import { search_page, getSearchResult } from "../controllers/search.controller.js";

router.get("/", search_page);
router.get("/search", getSearchResult);

export default router;
