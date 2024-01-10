import express from "express";
const router = express.Router();
router.use(express.json());

import { errorPageHandler, errorHandler } from "../middleware/routeErrorHandler.middleware.js";
import { enableLike, disableLike } from "../controllers/like.controller.js";

router.post("/:isbn", enableLike);
router.delete("/:isbn", errorHandler(disableLike));

export default router;
