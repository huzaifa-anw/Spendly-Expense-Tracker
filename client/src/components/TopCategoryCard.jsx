export default function TopCategoryCard ({category}) {
    return (
        <div className="border felx flex-col border-gray-200 bg-white rounded-2xl shadow-sm px-3 py-4">
            <div className="font-semibold text-lg">Top Category</div>
            <div className="px-8 flex font-semibold items-center justify-center text-2xl">
                <div>{category}</div>
            </div>
        </div>
    );
}