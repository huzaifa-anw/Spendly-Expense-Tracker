import Expense from '../models/expense.model.js'
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