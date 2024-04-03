import { z } from "zod";

const medication_schedule = z.object({
    id: z.string().uuid(),
    medication_id: z.string().uuid(),
    scheduled_time: z.string().datetime(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

const createable_medication_schedule = medication_schedule.partial({
    id: true,
    created_at: true,
    updated_at: true,
});

export default {
    medication_schedule,
    createable_medication_schedule,
};
