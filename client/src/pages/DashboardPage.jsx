import Greeting from "../components/Greeting";
import AddExpenseButton from '../components/AddExpenseButton'
import ExpenseItem from "../components/ExpenseItem";
import TotalSpentCard from "../components/TotalSpentCard";
import TopExpenseCard from "../components/TopExpenseCard";
import TopCategoryCard from '../components/TopCategoryCard'
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import Modal from "../components/Modal";

function DashboardPage ({name}) {

    const [displayName, setDisplayName] = useState(name);

    const [expenses, setExpenses] = useState([]);
    const [expenseError, setExpenseError] = useState(false);

    const [mostSpent, setMostSpent] = useState({});
    const [mostSpentError, setMostSpentError] = useState(false);

    const [topExpense, setTopExpense] = useState({});
    const [topExpenseError, setTopExpenseError] = useState(false);

    const [breakdown, setBreakdown] = useState([]);
    const [breakdownError, setBreakdownError] = useState(false);

    const [totalSpent, setTotalSpent] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

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
    },[])

    useEffect(() => {
        let total = 0;
        expenses.forEach(e => total += e.amount);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTotalSpent(total);
    }, [expenses])

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

                const breakdownErr = !data.categoriesBreakdown
                    ? 'Could not fetch category breakdown'
                    : false;

                setMostSpentError(mostSpentErr);
                setTopExpenseError(topExpenseErr);
                setBreakdownError(breakdownErr);

                setMostSpent(data.mostSpentCategory);
                setTopExpense(data.highestExpense);
                setBreakdown(data.categoriesBreakdown);

            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setMostSpentError(error.response.data.msg);

            }
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getInsights();
    },[])

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
            getInsights();
        } catch (error) {
            console.log(error);
            console.dir(error.response);
            alert('Failed to delete expense');
        }
    }

    const handleCreate = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/api/v1/expenses', data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                } 
            );
            console.dir(response.data);
            setExpenses([response.data.expense, ...expenses]);
            getInsights();
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            console.dir(error.response);
            alert('Failed to create expense')
        }
    }
    
    const handleUpdate = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:3000/api/v1/expenses/${expenseToEdit._id}`, data, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                } 
            );
            console.log(response.data)
            setExpenses(prev => {
                const filtered = prev.filter(expense => expense._id !== expenseToEdit._id);
                return [response.data.updatedExpense, ...filtered];
            });
            getInsights();
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            alert('failed to update expense')
        }
    }


    return (
        <>
            {isModalOpen && (
                <Modal
                    onClose={() => {
                    setIsModalOpen(false);
                    setExpenseToEdit(null);
                    }}
                    mode={expenseToEdit ? "edit" : "create"}
                    initialData={expenseToEdit}
                    onSubmit={expenseToEdit ? handleUpdate : handleCreate}
                />
            )}
            <div className="flex flex-row h-screen overflow-hidden">
                <div className=" flex-8 w-1 h-full overflow-y-auto">
                    {/* main dashboard area */}
                    <div className="mt-30 ml-20 pr-8 min-w-[50vh]" >
                        {/* greeting */}
                        <Greeting name={displayName} />
                        {/* add expense button and cards */}
                        <div className="flex flex-row gap-4 mt-4 mb-4">
                            <AddExpenseButton setIsModalOpen={setIsModalOpen} />
                            <TotalSpentCard totalSpent={totalSpent} />
                            {
                                mostSpentError ? <span className="text-red-500">{mostSpentError}</span> : 
                                <TopCategoryCard category={mostSpent.category} />
                            }
                            {
                                topExpenseError ? <span className="text-red-500">{topExpenseError}</span> :
                                <TopExpenseCard name={topExpense.name} date={dayjs(topExpense.date).format('DD MMM YY')} amount={topExpense.amount} category={topExpense.category} />
                            }
                        </div>
                        <h1 className="font-semibold mb-3 text-2xl">Expenses</h1>

                        {
                            expenseError ? <p className="text-red-600">Failed to fetch Expenses</p> : 
                            expenses.map((expense) => {
                                return <ExpenseItem     
                                            key={expense._id} 
                                            setIsModalOpen={setIsModalOpen}
                                            setExpenseToEdit={setExpenseToEdit}
                                            expense={expense} 
                                            handleDelete={() => handleDelete(expense._id)}
                                        />
                            })
                        }

                    </div>
                </div>
                <div className="bg-blue-950 pl-2 flex-2 flex flex-col items-center justify-center gap-8 h-full">
                    <div>
                        {
                            breakdownError ? <span className="text-red-500">{breakdownError}</span>  :
                            <PieChart 
                                series={[
                                    {
                                        data: breakdown.map((cat, idx) => ({id: idx, value: cat.totalSpent, label: cat.category})),
                                        innerRadius: 30,
                                        outerRadius: 100,
                                        paddingAngle: 5,
                                        cornerRadius: 5,
                                        startAngle: -45,
                                        endAngle: 225,
                                    }
                                ]
                                }
                                width={200}
                                height={200}
                                slotProps={{
                                    legend: {
                                    direction: 'column',
                                    position: { vertical: 'bottom', horizontal: 'center' },
                                    padding: { top: 20 },
                                    sx: { color: 'white' },
                                    },
                                }}
                        />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;