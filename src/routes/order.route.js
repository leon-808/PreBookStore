import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { order_page, proceedToOrder, getUserOrder } from "../controllers/order.controller.js";

router.get("/", errorPageHandler(order_page));
router.post("/", errorHandler(proceedToOrder));
router.get("/:user-id", errorHandler(getUserOrder));

export default router;
