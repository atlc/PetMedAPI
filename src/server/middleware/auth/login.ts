import type { RequestHandler } from "express";
import db from "../../db";
import bcrypt from "bcrypt";
import { sendVerificationMail } from "../../services/mailgun/auth";

export const isValidUser: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: "Must have both email and password" });

    try {
        const [user] = await db.users.find(email);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        if (!user.is_verified) {
            await sendVerificationMail({ email, id: user.id, name: user.name });

            return res.status(403).json({
                message: "You must verify your account first before logging in - check your email, a new link which will expire in 15 minutes has been sent",
            });
        }

        const { id, name } = user;
        req.user = { id, name };
        next();
    } catch (error) {
        const err = error as Error;
        console.log(error);
        res.status(500).json({ message: err.message || "A server error occurred, please try again later" });
    }
};
