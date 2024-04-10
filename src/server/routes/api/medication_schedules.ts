import express from "express";
import db from "../../db";
import { is_valid_medication_schedule } from "../../middleware/api/medication_schedules";

const router = express.Router();

router.post("/", is_valid_medication_schedule, async (req, res) => {
    try {
        const { scheduled_time, medication_id } = req.body;

        if (!scheduled_time || !medication_id) {
            return res.status(400).json({ message: "Must have both the scheduled time and the medication id!" });
        }

        const { id } = await db.medication_schedule.create({ scheduled_time, medication_id });
        res.status(201).json({ message: "Successfully added the medication schedule entry!", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server broke; blame Andrew" });
    }
});

export default router;
