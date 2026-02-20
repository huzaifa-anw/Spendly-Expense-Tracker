import { MoreVertical, Edit2, Trash2 } from "lucide-react";
import dayjs from 'dayjs';

export default function ExpenseItem({
  icon,
  name,
  category,
  amount,
  dateCreated,
  categoryColor = "bg-blue-100 text-blue-600",
  onUpdate, // callback for update
  onDelete, // callback for delete
}) {
    const formattedDate = dayjs(dateCreated).format('D/M/YY');
  return (
    <div className="w-full mb-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 px-6 py-4 flex items-center justify-between">

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">

        {/* Category Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${categoryColor}`}
        >
          {icon}
        </div>

        {/* Name + Date */}
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-800">
            {name}
          </h3>
          <span className="text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-4">

        {/* Amount */}
        <span className="text-lg font-semibold text-gray-800">
          Rs {amount}
        </span>

        {/* Update Button */}
        <button
          onClick={onUpdate}
          className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition flex items-center gap-1"
        >
          <Edit2 size={16} />
        </button>

        {/* Delete Button */}
        <button
          onClick={onDelete}
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition flex items-center gap-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}