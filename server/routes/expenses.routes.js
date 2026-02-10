import { Router } from "express";
import authenticate from "../middlewares/auhenticate.middleware.js";

const expensesRouter = Router();

expensesRouter.get('/', authenticate, (req, res) => res.json({msg: 'get all expenses for a user'}));
expensesRouter.post('/', authenticate, (req, res) => res.json({msg: 'create expense'}));
expensesRouter.put('/:id', authenticate, (req, res) => res.json({msg: 'update expense'}));
expensesRouter.delete('/:id', authenticate, (req, res) => res.json({msg: 'delete expense'}));

export default expensesRouter;