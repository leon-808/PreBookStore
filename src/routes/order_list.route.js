import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { order_list_page, proceedToOrderList, getOrderList } from "../controllers/order_list.controller.js";

router.get("/", errorPageHandler(order_list_page));
router.post("/", errorHandler(proceedToOrderList));
router.get("/:user-id", errorHandler(getOrderList));

export default router;
