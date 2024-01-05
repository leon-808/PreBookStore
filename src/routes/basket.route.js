import express from "express";
const router = express.Router();
router.use(express.json());

import { basket_page, addBookinBasket, deleteBookinBasket } from "../controllers/basket.controller.js";

router.get("/", basket_page);
router.post("/:isbn", addBookinBasket);
router.delete("/:isbn", deleteBookinBasket);

export default router;
