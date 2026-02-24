import { IoAddCircleOutline } from "react-icons/io5";

function AddExpenseButton ({setIsModalOpen}) {
    return(
        <button onClick={() => setIsModalOpen(true)} className="border border-gray-200 gap-3 px-3 py-2 items-center flex flex-row rounded-2xl bg-green-200 hover:cursor-pointer">
            <div>
                <IoAddCircleOutline size={34} />
            </div>
            <div className="flex flex-col items-start">
                <p className="text-lg font-semibold">Add Expense</p>
                <p className="text-sm font-sans font-light">Add a new expense to your records</p>
            </div>
        </button>
    );
}

export default AddExpenseButton;