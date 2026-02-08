import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().max(50).trim(),
    email: z.email().min(5).max(50).trim(),
    password: z.string().min(6).max(100)
})

export const loginSchema = z.object({
    email: z.email().min(5).max(50).trim(),
    password: z.string().min(6).max(100)
})