import express from "express";
const router = express.Router();
router.use(express.json());

import { main_page, getNewestBooks } from "../controllers/main.controller.js";

router.get("/", main_page);
router.get("/newest", getNewestBooks);

export default router;
