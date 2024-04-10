import type { RequestHandler } from "express";
import schemas from "../../schemas";

export const is_valid_household: RequestHandler = async (req, res, next) => {
    try {
        schemas.households.createable_household.parseAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid data" });
    }
};
