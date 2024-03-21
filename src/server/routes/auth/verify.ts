import express from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import db from "../../db";
import { sendVerificationMail } from "../../services/mailgun/auth";
import { Payload, VerificationPayload } from "../../types";

const router = express.Router();

// GET /auth/verify?token=eys23wfs&type=verification

router.get("/", async (req, res) => {
    const { token, type } = req.query;
    const VALID_TYPES = ["verification", "magic", "reset"];

    if (!token || typeof token !== "string") {
        return res.status(400).json({ message: "Missing token parameter" });
    }

    if (!type || typeof type !== "string" || !VALID_TYPES.includes(type)) {
        return res.status(400).json({ message: "Missing or incorrect type parameter" });
    }

    try {
        const { id, email, name } = jwt.verify(token, config.jwt.secret) as VerificationPayload;
        await db.users.verify(id);

        const payload: Payload = { id, name };
        const login_token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiration });
        res.status(200).json({ message: "Successfully verified account!", token: login_token });
    } catch (error) {
        console.log(error);

        const { email, id, name } = jwt.decode(token) as VerificationPayload;
        sendVerificationMail({ email, id, name })
            .then(() => {
                res.status(403).json({
                    message: "Verification failed - check your email, a new link which will expire in 15 minutes has been sent",
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json({ message: "An unknown error occurred when attempting to resend verification email, please try verifying again later" });
            });
    }
});

export default router;
