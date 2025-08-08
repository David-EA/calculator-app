
import express from "express";
const router = express.Router();
import { getCalculatorPage, calculateAndSave, getHistory } from "../controllers/calculator.controller.js";

router.get("/", getCalculatorPage);
router.post("/", calculateAndSave);
router.get("/history/:username", getHistory);

export default router;
