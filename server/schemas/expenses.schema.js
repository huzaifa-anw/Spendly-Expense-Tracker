import * as z from "zod";
import {EXPENSE_CATEGORIES} from '../constants.js'

export const createExpenseSchema = z.object({
    name: z.string().max(30).trim(),
    amount: z.number().positive(),
    date: z.coerce.date().optional(),
    note: z.string().max(50).trim().optional(),
    category: z.enum(EXPENSE_CATEGORIES),
});

export const updateExpenseSchema = z.object({
    name: z.string().max(30).trim().optional(),
    amount: z.number().positive().optional(),
    date: z.coerce.date().optional(),
    note: z.string().max(50).trim().optional(),
    category: z.enum(EXPENSE_CATEGORIES).optional(),
});