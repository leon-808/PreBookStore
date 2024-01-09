import express from "express";
const router = express.Router();
router.use(express.json());

import { err500Page, err500 } from "../middleware/routeErrorHandler.middleware.js";
import { logIn_page, proceedLogIn } from "../controllers/logIn.controller.js";

router.get("/", err500Page(logIn_page));
router.post("/", err500(proceedLogIn));

export default router;
