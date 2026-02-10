import mongoose from "mongoose";

import {EXPENSE_CATEGORIES} from '../constants.js'

const expenseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'expense model: name is required'],
            maxLength: 30,
            trim: true
        },
        amount: {
            type: Number,
            required: [true, 'expense model: amount is required'],
        },
        date: {
            type: Date,
            required: [true, 'expense model: date is required'],
            default: Date.now
        },
        note: {
            type: String,
            maxLength: 50
        },
        category: {
            type: String,
            enum: EXPENSE_CATEGORIES,
            required: [true, 'expense model: category is required'],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {timestamps: true}
)

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;