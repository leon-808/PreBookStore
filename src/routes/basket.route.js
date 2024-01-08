import express from "express";
const router = express.Router();
router.use(express.json());

import { basket_page, getBasketList, addBookinBasket, deleteBookinBasket } from "../controllers/basket.controller.js";

router.get("/", basket_page);
router.get("/:user_id", getBasketList);
router.post("/:user_id/:isbn", addBookinBasket);
router.delete("/:user_id/:isbn", deleteBookinBasket);

export default router;
