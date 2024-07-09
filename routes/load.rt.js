import express from "express";
import { getAllLoads, createLoad } from "../controllers/load.contr.js";

const router = express.Router();

router.get("/", getAllLoads);
router.post("/", createLoad);

export default router;
