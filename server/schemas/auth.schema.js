import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().trim().max(50),
    email: z.string().trim().email().max(50),
    password: z.string().min(6).max(100)
})

export const loginSchema = z.object({
    email: z.string().trim().email().max(50),
    password: z.string().min(6).max(100)
})