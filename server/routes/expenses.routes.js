import { Router } from "express";
import authenticate from "../middlewares/auhenticate.middleware.js";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expenses.controller.js";
import { createLimiter, modifyLimiter } from "../middlewares/rateLimit.middleware.js";

const expensesRouter = Router();

expensesRouter.get('/', authenticate, getExpenses);
expensesRouter.post('/', createLimiter, authenticate, createExpense );
expensesRouter.put('/:id', modifyLimiter, authenticate, updateExpense);
expensesRouter.delete('/:id', modifyLimiter, authenticate, deleteExpense);

export default expensesRouter;