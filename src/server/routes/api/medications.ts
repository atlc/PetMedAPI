import express from "express";
import db from "../../db";
import { is_valid_medication } from "../../middleware/api/medications";

const router = express.Router();

router.post("/", is_valid_medication, async (req, res) => {
    const { name, pet_id, dosage_amount, dosage_unit, start_date, end_date, notes, household_id } = req.body;

    try {
        const { id } = await db.medications.create({ name, pet_id, dosage_amount, dosage_unit, start_date, end_date, notes }, household_id);
        res.status(201).json({ message: "Successfully added medication", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred creating the medication" });
    }
});

export default router;
