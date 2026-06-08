export default function TopExpenseCard ({name, date, amount, category}) {
    return (
        <div className="border flex flex-col font-sans border-gray-200 bg-white rounded-2xl shadow-sm px-4 py-4 sm:px-5 sm:py-5">
            <div className="font-semibold text-base sm:text-lg mb-3">Top Expense</div>
            <div className="flex flex-row flex-wrap items-center justify-between gap-3 text-sm">
                <div className="flex min-w-0 flex-col sm:pr-4">
                    <div className="font-medium text-gray-800 truncate">
                        {name}
                    </div>
                    <div className="text-xs sm:text-sm text-blue-400 truncate">
                        {category}
                    </div>
                </div>
                <div className="flex-1 text-center text-gray-500">
                    <span className="text-sm sm:text-base">{date}</span>
                </div>
                <div className="flex-shrink-0 text-sm sm:text-base font-semibold text-gray-800 whitespace-nowrap">
                    PKR {amount}
                </div>
            </div>
        </div>
    );
}