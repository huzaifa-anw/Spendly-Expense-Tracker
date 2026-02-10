import { Router } from "express";
import authenticate from "../middlewares/auhenticate.middleware.js";
import { getExpenses, createExpense, updateExpense } from "../controllers/expenses.controller.js";

const expensesRouter = Router();

expensesRouter.get('/', authenticate, getExpenses);
expensesRouter.post('/', authenticate, createExpense );
expensesRouter.put('/:id', authenticate, updateExpense);
expensesRouter.delete('/:id', authenticate, (req, res) => res.json({msg: 'delete expense'}));

export default expensesRouter;