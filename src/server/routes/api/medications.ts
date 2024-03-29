import express from "express";
import db from "../../db";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, pet_id, dosage_amount, dosage_unit, start_date, end_date, notes } = req.body;

    if (!name || !pet_id || !dosage_amount || !dosage_unit || !start_date || !end_date || !notes) {
        return res.status(400).json({ message: "Missing some of the properties" });
    }

    try {
        const { id } = await db.medications.create({ name, pet_id, dosage_amount, dosage_unit, start_date, end_date, notes });
        res.status(201).json({ message: "Successfully added medication", id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "An error occurred creating the medication" });
    }
});

export default router;
