import { Router } from "express";

const expensesRouter = Router();

expensesRouter.get('/', (req, res) => res.json({msg: 'get all expenses for a user'}));
expensesRouter.post('/', (req, res) => res.json({msg: 'create expense'}));
expensesRouter.put('/:id', (req, res) => res.json({msg: 'update expense'}));
expensesRouter.delete('/:id', (req, res) => res.json({msg: 'delete expense'}));

export default expensesRouter;