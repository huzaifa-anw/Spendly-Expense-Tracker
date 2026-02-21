import Greeting from "../components/Greeting";
import AddExpenseButton from '../components/AddExpenseButton'
import ExpenseItem from "../components/ExpenseItem";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage ({name}) {

    const [expenses, setExpenses] = useState([]);
    const [expenseError, setExpenseError] = useState(false);

    // const [mostSpent, setMostSpent] = useState([]);
    // const [mostSpentError, setMostSpentError] = useState(false);

    // const [breakdown, setBreakdown] = useState([]);
    // const [breakdownError, setBreakdownError] = useState(false);

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
                    setExpenses(response.data.expenses);
                }

            } catch (error) {
                if (error.response) {
                    setExpenseError(error.response.data.msg);
                }
            }
        }
        getExpenses();
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
                        {/* buttons */}
                        <div className="flex flex-row gap-4 mt-4 mb-4">
                            <AddExpenseButton />
                            <AddExpenseButton />
                            <AddExpenseButton />
                        </div>
                        <h1 className="font-semibold mb-3 text-2xl">Expenses</h1>
                        {expenseError ?? <p className="text-red-600">Failed to fetch Expenses</p>}
                        {expenses.map((expense) => {
                            return <ExpenseItem     
                                        key={expense._id} 
                                        name={expense.name}     
                                        category={expense.category} 
                                        amount={expense.amount} 
                                        dateCreated={expense.date} 
                                        handleDelete={() => handleDelete(expense._id)}
                                    />
                        })}
                    </div>
                </div>
                <div className="border flex-2 h-full">div 2</div>
            </div>
        </>
    )
}

export default DashboardPage;