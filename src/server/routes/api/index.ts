import express from "express";
import householdRouter from "./households";
import petsRouter from "./pets";

const router = express.Router();

router.use("/households", householdRouter);
router.use("/pets", petsRouter);

export default router;
