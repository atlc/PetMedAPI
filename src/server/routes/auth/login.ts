import express from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { isValidUser } from "../../middleware/login";

const router = express.Router();

router.post("/", isValidUser, async (req, res) => {
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
