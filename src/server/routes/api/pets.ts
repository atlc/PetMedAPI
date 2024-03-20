import express from "express";
import { NewPet } from "../../types";
import db from "../../db";

const router = express.Router();

// multer
router.post("/upload", async (req, res) => {
    try {
        /*
          UPLOAD IMAGE TO S3        
        */
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not process image" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, birthdate, weight, species, household_id, image_url } = req.body;

        if (!name || !birthdate || !weight || !species || !household_id) {
            const missing = [name, birthdate, weight, species, household_id].filter((property) => !property).join(", ");
            return res.status(400).json({ message: `Missing the following properties: ${missing}` });
        }

        const results = await db.pets.create({ name, birthdate, weight, species, household_id, image_url });
        res.status(201).json({ message: "Successfully created pet!", id: results.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error occurred - could not create pet at this time" });
    }
});

export default router;
