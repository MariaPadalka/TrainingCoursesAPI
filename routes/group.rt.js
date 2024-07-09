import express from "express";
import { getAllGroups, createGroup } from "../controllers/group.contr.js";

const router = express.Router();

router.get("/", getAllGroups);
router.post("/", createGroup);

export default router;
