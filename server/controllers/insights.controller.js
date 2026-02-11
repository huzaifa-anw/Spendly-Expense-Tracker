import Expense from "../models/expense.model.js";


export const dashboard = async (req, res, next) => {
    try {
        const uid = req.user._id; 

        const mostSpentCategoryPipeline = [
            {
                $match: {userId: uid}
            },

            {
                $group: {
                    _id: '$category',
                    totalSpent: { $sum : '$amount' }
                }
            },

            {
                $sort : {
                    totalSpent: -1
                }
            },
            
            {
                $limit: 1
            }, 

            {
                $project: {
                    category: "$_id",
                    totalSpent: 1,
                    _id: 0
                }
            }
        ];

        const highestExpensePipeline = [
            {
                $match: {userId: uid}
            },

            {
                $sort: {
                    amount: -1
                }
            },

            {
                $limit: 1
            },

            {
                $project: {
                    _id: 1,
                    name: 1,
                    amount: 1,
                    date: 1,
                    category: 1,
                }
            }

        ];

        const categoriesBreakdownPipeline = [
            {
                $match: {userId: uid}
            },

            {
                $group: {
                    _id: '$category',
                    totalSpent: { $sum : '$amount' }
                }
            },

            {
                $sort : {
                    totalSpent: -1
                }
            },

            {
                $project: {
                    category: "$_id",
                    totalSpent: 1,
                    _id: 0
                }
            }
        ];

        const mostSpentCategory = await Expense.aggregate(mostSpentCategoryPipeline);
        
        const highestExpense = await Expense.aggregate(highestExpensePipeline);

        const categoriesBreakdown = await Expense.aggregate(categoriesBreakdownPipeline);

        let grandTotal = 0;

        for (const category of categoriesBreakdown) {
            grandTotal += category.totalSpent;
        }

        const finalBreakdown = categoriesBreakdown.map((category) => {
            return {...category, 
                percentage: parseFloat(((category.totalSpent / grandTotal) * 100).toFixed(2))
            }
        })

        res.status(200).json({success: true, 
            msg: "fetched all user insights",
            mostSpentCategory: mostSpentCategory[0], 
            highestExpense: highestExpense[0], 
            categoriesBreakdown: finalBreakdown
        });

    } catch (error) {
        next(error);
    }
} 