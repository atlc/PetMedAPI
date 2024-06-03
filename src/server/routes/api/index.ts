import express from "express";
import dosageUnitRouter from "./dosage_units";
import householdRouter from "./households";
import medicationScheduleRouter from "./medication_schedules";
import medicationRouter from "./medications";
import petRouter from "./pets";

const router = express.Router();

router.use("/dosage_units", dosageUnitRouter);
router.use("/households", householdRouter);
router.use("/medication_schedules", medicationScheduleRouter);
router.use("/medications", medicationRouter);
router.use("/pets", petRouter);

export default router;
