import type { RequestHandler } from "express";
import schemas from "../../schemas";

export const is_valid_user: RequestHandler = async (req, res, next) => {
    try {
        await schemas.users.createable_user.parseAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid data" });
    }
};
