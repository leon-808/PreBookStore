import express from "express";
const router = express.Router();
router.use(express.json());

import { signUp_page, submitSignUp } from "../controllers/signUp.controller.js";

router.get("/", signUp_page);
router.post("/", submitSignUp);

export default router;
