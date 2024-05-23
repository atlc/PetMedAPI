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

router.post("/", mult.single("upload"), async (req, res) => {
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

export default router;
