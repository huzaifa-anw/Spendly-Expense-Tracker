import { Router } from "express";
import authenticate from "../middlewares/auhenticate.middleware.js";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../controllers/expenses.controller.js";

const expensesRouter = Router();

expensesRouter.get('/', authenticate, getExpenses);
expensesRouter.post('/', authenticate, createExpense );
expensesRouter.put('/:id', authenticate, updateExpense);
expensesRouter.delete('/:id', authenticate, deleteExpense);

export default expensesRouter;