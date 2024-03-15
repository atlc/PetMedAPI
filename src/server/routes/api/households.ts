import express from "express";
import db from "../../db";
import { hasBadStrings } from "../../utils/validators";

const router = express.Router();

router.post("/", async (req, res) => {
    const { owner_id, name } = req.body;
    try {
        const dataIsInvalid = hasBadStrings([
            { string: owner_id, min: 32, max: 36 },
            { string: name, min: 3, max: 64 },
        ]);

        if (dataIsInvalid) {
            return res.status(400).json({ message: "The name must be between 3 and 64 characters" });
        }

        const { id } = await db.households.create({ name, owner_id });

        await db.user_households.create({ user_id: owner_id, household_id: id! });

        res.status(201).json({ message: "Successfully created household", id });
    } catch (error) {
        console.log(error);
        const message = error instanceof Error ? error.message : "An unknown error occurred while registering your household";
        res.status(500).json({ message });
    }
});

export default router;
