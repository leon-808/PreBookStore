import express from "express";
const router = express.Router();
router.use(express.json());

import { err500Page, err500 } from "../middleware/routeErrorHandler.middleware.js";
import { enableLike, disableLike } from "../controllers/like.controller.js";

router.post("/:isbn", enableLike);
router.delete("/:isbn", err500(disableLike));

export default router;
