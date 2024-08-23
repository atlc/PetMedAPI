import express from "express";
import db from "../../db";
import { is_valid_household } from "../../middleware/api/households";

const router = express.Router();

router.post("/", is_valid_household, async (req, res) => {
    const { name } = req.body;
    try {
        const owner_id = req.user.id;
        const { id } = (await db.households.create({ name, owner_id })) as { id: string };

        await db.user_households.create({ user_id: owner_id, household_id: id });

        res.status(201).json({ message: "Successfully created household", id });
    } catch (error) {
        console.log(error);
        const message = error instanceof Error ? error.message : "An unknown error occurred while registering your household";
        res.status(500).json({ message });
    }
});

export default router;
