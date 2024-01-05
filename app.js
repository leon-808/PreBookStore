import express from "express";
import dotenv from "dotenv";

const app = express();
const env = dotenv.config().parsed;

app.use(express.static("public"));

import main_route from "./src/routes/main.route.js";
import signUp_route from "./src/routes/signUp.route.js";
import logIn_route from "./src/routes/logIn.route.js";
import my_route from "./src/routes/my.route.js";
import search_route from "./src/routes/search.route.js";
import detail_route from "./src/routes/detail.route.js";
import review_route from "./src/routes/review.route.js";
import like_route from "./src/routes/like.route.js";
import basket_route from "./src/routes/basket.route.js";
import order_route from "./src/routes/order.route.js";
import order_list_route from "./src/routes/order_list.route.js";

app.use("/", main_route);
app.use("/sign-up", signUp_route);
app.use("/log-in", logIn_route);
app.use("/my", my_route);
app.use("/books", search_route);
app.use("/book", detail_route);
app.use("/review", review_route);
app.use("/like", like_route);
app.use("/basket", basket_route);
app.use("/order", order_route);
app.use("/order-list", order_list_route);

app.listen(env.PORT);

export default app;
