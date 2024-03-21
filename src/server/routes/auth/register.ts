import express from "express";
import bcrypt from "bcrypt";
import db from "../../db";
import { hasBadStrings } from "../../utils/validators";
import { sendVerificationMail } from "../../services/mailgun/auth";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { name, email, password, image_url } = req.body;

        if (
            hasBadStrings([
                { string: name, max: 64, min: 1 },
                { string: email, max: 128, min: 7 },
                { string: password, max: 200, min: 1 },
            ])
        ) {
            return res.status(400).json({ message: "Please ensure all data is filled out correctly" });
        }

        const hashed = await bcrypt.hash(password, 12);

        const results = await db.users.register({ name, email, password: hashed, image_url });
        const id = results.id!;

        await sendVerificationMail({ email, id, name });

        res.status(201).json({ message: "User registered successfully!", id });
    } catch (error) {
        console.log(error);
        let message: string;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = "An error occurred while registering, please try again later";
        }

        res.status(500).json({ message });
    }
});

export default router;
