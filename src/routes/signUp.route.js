import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { signUp_page, submitSignUp } from "../controllers/signUp.controller.js";

router.get("/", errorPageHandler(signUp_page));
router.post("/", errorHandler(submitSignUp));

export default router;
