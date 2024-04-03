import express from "express";
import bcrypt from "bcrypt";
import db from "../../db";
import { sendVerificationMail } from "../../services/mailgun/auth";
import { is_valid_user } from "../../middleware/registration";

const router = express.Router();

router.post("/", is_valid_user, async (req, res) => {
    try {
        const { name, email, password, image_url } = req.body;

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
