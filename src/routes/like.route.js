import express from "express";
const router = express.Router();
router.use(express.json());

import { errorHandlerwithLoggedIn } from "../middleware/routeErrorHandler.middleware.js";
import { enableLike, disableLike } from "../controllers/like.controller.js";

router.post("/:isbn", errorHandlerwithLoggedIn(enableLike));
router.delete("/:isbn", errorHandlerwithLoggedIn(disableLike));

export default router;
