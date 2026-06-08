/* eslint-disable react-hooks/set-state-in-effect */
import Greeting from "../components/Greeting";
import AddExpenseButton from '../components/AddExpenseButton'
import ExpenseItem from "../components/ExpenseItem";
import TotalSpentCard from "../components/TotalSpentCard";
import TopExpenseCard from "../components/TopExpenseCard";
import TopCategoryCard from '../components/TopCategoryCard'
import { useEffect, useState, useMemo } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import Modal from "../components/Modal";

function DashboardPage () {

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
        getExpenses();
        getInsights();
    },[])

    useEffect(() => {
        let total = 0;
        expenses.forEach(e => total += e.amount);
        setTotalSpent(total);
    }, [expenses])


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

    const name = useMemo(() => sessionStorage.getItem('name'), []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

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
            {/* NAVBAR */}
            <div className="flex bg-black flex-col sm:flex-row sm:justify-between items-center px-4 sm:px-[2vw] pt-4 gap-4 sm:gap-0">
                <img src="/spendly.png" alt="logo" className="h-10 sm:h-[7vh]" />
                <button
                    onClick={handleLogout}
                    className="rounded-full bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition"
                >
                    Logout
                </button>
            </div>
            <div className="min-h-screen overflow-hidden bg-gray-50">
                <div className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 py-6 sm:py-8 lg:py-10">
                    {/* greeting */}
                    <Greeting name={name} />
                    
                    {/* add expense button and cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-4 mb-6">
                        <AddExpenseButton setIsModalOpen={setIsModalOpen} />
                        <TotalSpentCard totalSpent={totalSpent} />
                        {
                            mostSpentError ? <span className="text-red-500 col-span-1 sm:col-span-2 lg:col-span-1">{mostSpentError}</span> : 
                            <TopCategoryCard category={mostSpent.category} />
                        }
                        {
                            topExpenseError ? <span className="text-red-500 col-span-1 sm:col-span-2 lg:col-span-1">{topExpenseError}</span> :
                            <TopExpenseCard name={topExpense.name} date={dayjs(topExpense.date).format('DD MMM YY')} amount={topExpense.amount} category={topExpense.category} />
                        }
                        
                        {/* Chart Card */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-1 border-gray-200 bg-white rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center">
                            {
                                breakdownError ? <span className="text-red-500 text-center">{breakdownError}</span>  :
                                <PieChart 
                                    series={[
                                        {
                                            data: breakdown.map((cat, idx) => ({id: idx, value: cat.totalSpent, label: cat.category})),
                                            innerRadius: 15,
                                            outerRadius: 55,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                            startAngle: -45,
                                            endAngle: 225,
                                        }
                                    ]
                                    }
                                    width={window.innerWidth < 640 ? 180 : window.innerWidth < 1024 ? 200 : 220}
                                    height={window.innerWidth < 640 ? 180 : window.innerWidth < 1024 ? 200 : 220}
                                    slotProps={{
                                        legend: {
                                        direction: 'column',
                                        position: { vertical: 'bottom', horizontal: 'center' },
                                        padding: { top: 5 },
                                        sx: { color: 'black', fontSize: '10px' },
                                        },
                                    }}
                            />
                            }
                        </div>
                    </div>
                    
                    <h1 className="font-semibold mb-4 text-xl sm:text-2xl">Expenses</h1>

                    <div className="space-y-2 sm:space-y-3">
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
            </div>
        </>
    )
}

export default DashboardPage;