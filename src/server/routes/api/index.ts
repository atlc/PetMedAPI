import express from "express";
import householdRouter from "./households";
import medicadionScheduleRouter from "./medication_schedules";
import medicationRouter from "./medications";
import petRouter from "./pets";

const router = express.Router();

router.use("/households", householdRouter);
router.use("/medication_schedules", medicadionScheduleRouter);
router.use("/medications", medicationRouter);
router.use("/pets", petRouter);

export default router;
