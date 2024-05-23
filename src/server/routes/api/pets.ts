import express from "express";
import db from "../../db";
import { is_valid_pet } from "../../middleware/api/pets";

const router = express.Router();

router.post("/", is_valid_pet, async (req, res) => {
    try {
        const { name, birthdate, weight, species, household_id, image_url } = req.body;

        const results = await db.pets.create({ name, birthdate, weight, species, household_id, image_url });
        res.status(201).json({ message: "Successfully created pet!", id: results.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error occurred - could not create pet at this time" });
    }
});

export default router;
