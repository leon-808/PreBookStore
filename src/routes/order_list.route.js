import express from "express";
const router = express.Router();
router.use(express.json());

import { order_list_page, proceedToOrderList, getOrderList } from "../controllers/order_list.controller.js";

router.get("/", order_list_page);
router.post("/", proceedToOrderList);
router.get("/:user-id", getOrderList);

export default router;
