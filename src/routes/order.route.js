import express from "express";
const router = express.Router();
router.use(express.json());

import { order_page, proceedToOrder, getUserOrder } from "../controllers/order.controller.js";

router.get("/", order_page);
router.post("/", proceedToOrder);
router.get("/:user-id", getUserOrder);

export default router;
