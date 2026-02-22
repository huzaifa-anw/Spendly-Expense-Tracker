export default function TopExpenseCard ({name, date, amount, category}) {
    return (
        <div className="border felx flex-col font-sans border-gray-200 bg-white rounded-2xl shadow-sm px-3 py-4">
            <div className="font-semibold text-lg">Top Expense</div>
            <div className="px-5 flex flex-row gap-6 items-start justify-between text-sm">
                <div className="flex flex-col">
                    <div>
                        {name}
                    </div>
                    <div className="text-xs text-blue-400">
                        {category}
                    </div>
                </div>
                <div className="text-gray-500">
                    {date}
                </div>
                <div className="text-gray-500">
                    PKR {amount}
                </div>
            </div>
        </div>
    );
}