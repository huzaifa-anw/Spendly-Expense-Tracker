import { success } from 'zod';
import Expense from '../models/expense.model.js'
import expensesRouter from '../routes/expenses.routes.js';
import { createExpenseSchema, updateExpenseSchema } from '../schemas/expenses.schema.js'

export const getExpenses = async (req, res, next) => {
    try {
        const { user } = req;

        const { sortBy } = req.query;

        let query = Expense.find({ userId: user._id });

        if (sortBy === 'amount') query = query.sort({ amount: -1 }); // most expensive first
        else query = query.sort({ date: -1 }); // newest first

        let expenses = await query;

        res.status(200).json({
            success: true,
            msg: 'Expenses retrieved successfully',
            expenses
        })
    } catch (error) {
        next(error);
    }
}

export const createExpense = async (req, res, next) => {
    try {
        const validationResult = createExpenseSchema.safeParse(req.body);
        if(!validationResult.success) {
            const error = new Error('Create expense input validation failed');
            error.statusCode = 400;
            error.issues = validationResult.error.issues;
            throw error;
        }

        const { name, amount, date, note, category } = validationResult.data;

        const userId = req.user._id;

        const expense = await Expense.create({name, amount, category, note, date, userId});
        
        return res.status(201).json({success: true, msg: 'expense created', expense});
    } catch (error) {
        next(error);
    }
}

export const updateExpense = async (req, res, next) => {
    try {
        const { id } = req.params;
        if(!id) {
            const err = new Error('id not found in params');
            err.statusCode = 400;
            throw err;
        }

        const previousExpense = await Expense.findById(id);
        const expenseOwnerid = previousExpense.userId;
        const expenseId = previousExpense._id

        if(!previousExpense.userId.equals(req.user._id)) {
            const err = new Error('Cant update expenses of other users');
            err.statusCode = 401;
            throw err;
        }

        const validationResult = updateExpenseSchema.safeParse(req.body);
        if(!validationResult.success) {
            const error = new Error('Update expense input validation failed');
            error.statusCode = 400;
            error.issues = validationResult.error.issues;
            throw error;
        }

        const { name, amount, date, note, category } = validationResult.data;

        const updatedExpense = await Expense.findOneAndUpdate(
            {_id: expenseId},
            {name, amount, date, note, category, userId: expenseOwnerid},
            {returnDocument: 'after'}
        )

        return res.status(200).json({success: true, msg: 'expense updated successfully', updatedExpense});

    } catch (error) {
        next(error);
    }
}