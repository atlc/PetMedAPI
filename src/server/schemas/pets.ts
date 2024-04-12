import { z } from "zod";

const pet = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(64),
    species: z.string().min(1).max(32),
    birthdate: z.string(),
    image_url: z.string().url().min(1).max(128),
    weight: z.number().min(0),
    household_id: z.string().uuid(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

const createable_pet = pet.partial({
    id: true,
    image_url: true,
    created_at: true,
    updated_at: true,
});

export default {
    pet,
    createable_pet,
};
