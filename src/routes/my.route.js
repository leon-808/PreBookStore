import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { my_page, myDetails, updateMyInfo } from "../controllers/my.controller.js";

router.get("/", errorPageHandler(my_page));
router.get("/detail", errorHandler(myDetails));
router.put("/", errorHandler(updateMyInfo));

export default router;
