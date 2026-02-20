import { IoAddCircleOutline } from "react-icons/io5";

function AddExpenseButton () {
    return(
        <button className="border-1 border-gray-400 gap-3 px-3 py-2 items-center flex flex-row rounded-2xl bg-green-200 hover:cursor-pointer">
            <div>
                <IoAddCircleOutline size={34} />
            </div>
            <div className="flex flex-col items-start">
                <p className="text-lg font-semibold">Add Expense</p>
                <p className="text-sm">Add a new expense to your records</p>
            </div>
        </button>
    );
}

export default AddExpenseButton;