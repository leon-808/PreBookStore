import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandlerwithLoggedIn } from "../middleware/routeErrorHandler.middleware.js";
import {
  basket_page,
  getBasketList,
  addBookinBasket,
  removeBookinBasket,
  requestOrderfromBasket,
} from "../controllers/basket.controller.js";

router.get("/", errorPageHandler(basket_page));

router.get("/:user_id", errorHandlerwithLoggedIn(getBasketList));

router.post("/:user_id/:isbn", errorHandlerwithLoggedIn(addBookinBasket));

router.delete("/:user_id", errorHandlerwithLoggedIn(removeBookinBasket));

router.post("/order", errorHandlerwithLoggedIn(requestOrderfromBasket));

export default router;
