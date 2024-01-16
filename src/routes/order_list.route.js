import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandlerwithLoggedIn } from "../middleware/routeErrorHandler.middleware.js";
import { ordered_page, getOrdered } from "../controllers/order_list.controller.js";

router.get("/", errorPageHandler(ordered_page));
router.get("/:user_id", errorHandlerwithLoggedIn(getOrdered));

export default router;
