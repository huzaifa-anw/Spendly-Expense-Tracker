import mongoose from "mongoose";

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
        }
    },
    {timestamps: true}
)

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;