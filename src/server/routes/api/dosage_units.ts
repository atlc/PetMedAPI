import express from "express";
import db from "../../db";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const units = await db.dosage_units.all();
        res.json(units);
    } catch (error) {
        console.log(error);
        const message = error instanceof Error ? error.message : "An unknown error occurred while getting all dosage units";
        res.status(500).json({ message });
    }
});

export default router;
