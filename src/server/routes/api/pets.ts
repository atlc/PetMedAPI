import express from "express";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";
import db from "../../db";
import { uploadImage } from "../../services/digitalocean/image";

const storage = multer.memoryStorage();

const mult = multer({
    storage,
});

const router = express.Router();

router.post("/upload", mult.single("upload"), async (req, res) => {
    try {
        const image = req.file;
        const { id } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Invalid or missing file" });
        }

        const uuid = v4();
        const ext = path.extname(image.originalname);
        const Key = `${uuid}${ext}`;

        const results = await uploadImage({ Body: image.buffer, Key });

        const image_url = `https://pet-med.nyc3.cdn.digitaloceanspaces.com/${Key}`;

        if (id) {
            await db.pets.add_image({ image_url, id });
        }

        res.json({ ...results, Key, image_url });
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
