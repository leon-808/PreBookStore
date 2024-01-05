import express from "express";
const router = express.Router();
router.use(express.json());

import { enableLike, disableLike } from "../controllers/like.controller.js";

router.post("/:isbn", enableLike);
router.delete("/:isbn", disableLike);

export default router;
