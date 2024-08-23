import { z } from "zod";

const household = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(64),
    owner_id: z.string().min(36).max(36),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

const createable_household = household.partial({
    id: true,
    owner_id: true,
    created_at: true,
    updated_at: true,
});

export default {
    household,
    createable_household,
};
