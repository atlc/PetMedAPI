import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../../config";
import { Payload } from "../../types";

export const tokenCheck: RequestHandler = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Missing authentication headers" });

    const [type, token] = authHeader.split(" ");

    if (!type || type.toLowerCase() !== "bearer" || !token || token.substring(0, 2) !== "ey") {
        return res.status(401).json({ message: "Incorrect authentication type presented" });
    }

    try {
        const payload = jwt.verify(token, config.jwt.secret) as Payload;
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token", error });
    }
};
