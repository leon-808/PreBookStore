import express from "express";
const router = express.Router();
router.use(express.json());

import { logIn_page, proceedLogIn } from "../controllers/logIn.controller.js";

router.get("/", logIn_page);
router.post("/", proceedLogIn);

export default router;
