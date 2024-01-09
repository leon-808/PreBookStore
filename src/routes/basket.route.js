import express from "express";
const router = express.Router();
router.use(express.json());

import { err500Page, err500 } from "../middleware/routeErrorHandler.middleware.js";

import {
  basket_page,
  getBasketList,
  addBookinBasket,
  updateBasketWhenUnload,
  removeBookinBasket,
  requestOrderfromBasket,
} from "../controllers/basket.controller.js";

router.get("/", err500Page(basket_page));
router.get("/:user_id", err500(getBasketList));
router.post("/:user_id/:isbn", err500(addBookinBasket));
router.put("/:user_id", err500(updateBasketWhenUnload));
router.delete("/:user_id", err500(removeBookinBasket));
router.post("/requestOrder", err500(requestOrderfromBasket));

export default router;
