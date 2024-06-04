import express from "express";
import dosageUnitRouter from "./dosage_units";
import householdRouter from "./households";
import medicationRouter from "./medications";
import petRouter from "./pets";
import scheduleUnitRouter from "./schedule_units";

const router = express.Router();

router.use("/dosage_units", dosageUnitRouter);
router.use("/households", householdRouter);
router.use("/medications", medicationRouter);
router.use("/pets", petRouter);
router.use("/schedule_units", scheduleUnitRouter);

export default router;
