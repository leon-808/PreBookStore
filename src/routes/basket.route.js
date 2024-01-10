import express from "express";
const router = express.Router();
router.use(express.json());

import {
  errorPageHandler,
  errorHandler,
  errorHandlerwithLoggedIn,
} from "../middleware/routeErrorHandler.middleware.js";
import {
  basket_page,
  getBasketList,
  addBookinBasket,
  updateBasketWhenUnload,
  removeBookinBasket,
  requestOrderfromBasket,
} from "../controllers/basket.controller.js";

router.get("/", errorPageHandler(basket_page));
router.get("/:user_id", errorHandler(getBasketList));
router.post("/:user_id/:isbn", errorHandlerwithLoggedIn(addBookinBasket));
router.put("/:user_id", errorHandlerwithLoggedIn(updateBasketWhenUnload));
router.delete("/:user_id", errorHandlerwithLoggedIn(removeBookinBasket));
router.post("/order", errorHandlerwithLoggedIn(requestOrderfromBasket));

export default router;
