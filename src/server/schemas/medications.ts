import { z } from "zod";

const medication = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(64),
    pet_id: z.string().uuid(),
    dosage_amount: z.string().min(1).max(64),
    dosage_unit: z.string().uuid(),
    schedule_quantity: z.string().min(1).max(64),
    schedule_unit: z.string().uuid(),
    start_date: z.string().datetime().optional(),
    end_date: z.string().datetime().optional(),
    notes: z.string().max(1024).optional(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

const createable_medication = medication.partial({
    id: true,
    start_date: true,
    end_date: true,
    notes: true,
    created_at: true,
    updated_at: true,
});

export default {
    medication,
    createable_medication,
};
