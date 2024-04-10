import type { RequestHandler } from "express";
import schemas from "../../schemas";

export const is_valid_medication: RequestHandler = async (req, res, next) => {
    try {
        schemas.medications.createable_medication.parseAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid data" });
    }
};
