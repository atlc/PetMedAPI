import type { RequestHandler } from "express";
import schemas from "../../schemas";

export const is_valid_medication_schedule: RequestHandler = async (req, res, next) => {
    try {
        schemas.medication_schedules.createable_medication_schedule.parseAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid data" });
    }
};
