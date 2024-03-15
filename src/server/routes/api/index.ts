import express from "express";
import householdRouter from "./households";

const router = express.Router();

router.use("/households", householdRouter);

export default router;
