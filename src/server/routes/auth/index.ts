import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db";
import { NewUser, Payload } from "../../types";
import { hasBadStrings } from "../../utils/validators";
import config from "../../config";
import { isValidUser } from "../../middleware/login";
import { tokenCheck } from "../../middleware/tokenCheck";

const router = express.Router();

router.get("/check_token", tokenCheck, (req, res) => res.json({ message: ":)" }));

router.post("/register", async (req, res) => {
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

        const id = results.insertId!;

        const payload: Payload = { id, name };
        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiration });

        res.status(201).json({ message: "User registered successfully!", id, token });
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

router.post("/login", isValidUser, async (req, res) => {
    try {
        const { id, name } = req.user;

        const token = jwt.sign({ id, name }, config.jwt.secret, { expiresIn: config.jwt.expiration });

        res.status(200).json({ message: "Logged in successfully!", token });
    } catch (error) {
        console.log(error);
        let message: string;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = "An error occurred while logging in, please try again later";
        }

        res.status(500).json({ message });
    }
});

export default router;
