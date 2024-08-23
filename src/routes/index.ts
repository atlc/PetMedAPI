import express from "express";
import authRouter from "./auth";
import apiRouter from "./api";
import uploadRouter from "./api/uploads";

import { tokenCheck } from "../middleware/auth/tokenCheck";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/api/upload", uploadRouter);
router.use("/api", tokenCheck, apiRouter);

export default router;
