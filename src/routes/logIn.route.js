import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { logIn_page, proceedLogIn } from "../controllers/logIn.controller.js";

router.get("/", errorPageHandler(logIn_page));
router.post("/", errorHandler(proceedLogIn));

export default router;
