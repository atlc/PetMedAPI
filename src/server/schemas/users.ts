import { z } from "zod";

const user = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(64),
    email: z.string().min(1).max(128).email(),
    password: z.string().min(12).max(128),
    is_verified: z.boolean(),
    image_url: z.string().url().max(128),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
});

const createable_user = user.partial({
    id: true,
    is_verified: true,
    image_url: true,
    created_at: true,
    updated_at: true,
});

export default {
    user,
    createable_user,
};
