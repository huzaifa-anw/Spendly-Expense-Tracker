import Greeting from "../components/Greeting";
import AddExpenseButton from '../components/AddExpenseButton'
import ExpenseItem from "../components/ExpenseItem";
import TotalSpentCard from "../components/TotalSpentCard";
import TopExpenseCard from "../components/TopExpenseCard";
import TopCategoryCard from '../components/TopCategoryCard'
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

// TODO
// handle mostSpentError topExpenseError on the ui
// work on displaying the breakdown on the right side of the page
// handle breakdownError on the ui

function DashboardPage ({name}) {

    const [expenses, setExpenses] = useState([]);
    const [expenseError, setExpenseError] = useState(false);

    const [mostSpent, setMostSpent] = useState({});
    const [mostSpentError, setMostSpentError] = useState(false);

    const [topExpense, setTopExpense] = useState({});
    const [topExpenseError, setTopExpenseError] = useState(false);

    const [breakdown, setBreakdown] = useState([]);
    const [breakdownError, setBreakdownError] = useState(false);

    const [totalSpent, setTotalSpent] = useState(0);

    useEffect(() => {
        async function getExpenses() {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:3000/api/v1/expenses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data){
                    const fetchedExpenses = response.data.expenses;
                    setExpenses(fetchedExpenses);
                    setExpenseError(false);
                    let total = 0;
                    fetchedExpenses.forEach(e => total += e.amount);
                    setTotalSpent(total);
                }

            } catch (error) {
                console.log(error);
                if (error.response) {
                    setExpenseError(error.response.data.msg);
                }
            }
        }
        getExpenses();
    }, [])

    useEffect(() => {
        async function getInsights() {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:3000/api/v1/insights/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.data) {
                    const data = response.data;

                    const mostSpentErr = !data.mostSpentCategory
                        ? 'Could not fetch most spent category'
                        : false;

                    const topExpenseErr = !data.highestExpense
                        ? 'Could not fetch top expense'
                        : false;

                    const breakdownErr = !data.breakdown
                        ? 'Could not fetch category breakdown'
                        : false;

                    setMostSpentError(mostSpentErr);
                    setTopExpenseError(topExpenseErr);
                    setBreakdownError(breakdownErr);

                    setMostSpent(data.mostSpentCategory);
                    setTopExpense(data.highestExpense);
                    setBreakdown(data.breakdown);

                    console.dir(data);
                }
            } catch (error) {
                console.log(error);
                if (error.response) {
                    setMostSpentError(error.response.data.msg);

                }
            }
        }
        getInsights();
    }, [])

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3000/api/v1/expenses/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }      
            );
            setExpenses(prev => prev.filter(expense => expense._id !== id) );
        } catch (error) {
            console.log(error);
            console.dir(error.response);
            alert('Failed to delete expense');
        }
    }

    return (
        <>

            <div className="flex flex-row">
                <div className=" flex-8 h-screen w-1">
                    {/* main dashboard area */}
                    <div className="mt-30 ml-20 w-50vh" >
                        {/* greeting */}
                        <Greeting name={name} />
                        {/* add expense button and cards */}
                        <div className="flex flex-row gap-4 mt-4 mb-4">
                            <AddExpenseButton />
                            <TotalSpentCard totalSpent={totalSpent} />
                            {
                                mostSpentError ? mostSpentError : 
                                <TopCategoryCard category={mostSpent.category} />
                            }
                            {
                                topExpenseError ? topExpenseError :
                                <TopExpenseCard name={topExpense.name} date={dayjs(topExpense.date).format('DD MMM YY')} amount={topExpense.amount} category={topExpense.category} />
                            }
                        </div>
                        <h1 className="font-semibold mb-3 text-2xl">Expenses</h1>

                        {
                            expenseError ? <p className="text-red-600">Failed to fetch Expenses</p> : 
                            expenses.map((expense) => {
                                return <ExpenseItem     
                                            key={expense._id} 
                                            name={expense.name}     
                                            category={expense.category} 
                                            amount={expense.amount} 
                                            dateCreated={expense.date} 
                                            handleDelete={() => handleDelete(expense._id)}
                                        />
                            })
                        }

                    </div>
                </div>
                <div className="border flex-2 h-full">div 2</div>
            </div>
        </>
    )
}

export default DashboardPage;