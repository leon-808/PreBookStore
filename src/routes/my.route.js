import express from "express";
const router = express.Router();
router.use(express.json());

import { my_page, myDetails, updateMyInfo } from "../controllers/my.controller.js";

router.get("/", my_page);
router.get("/detail", myDetails);
router.put("/", updateMyInfo);

export default router;
