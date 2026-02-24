import { useEffect, useState } from "react";

const EXPENSE_CATEGORIES = [
  "Food",
  "Dining Out",
  "Groceries",
  "Coffee & Snacks",
  "Transport",
  "Fuel",
  "Parking",
  "Rent",
  "Utilities",
  "Home Maintenance",
  "Furniture",
  "Mobile Recharge",
  "Internet",
  "Subscriptions",
  "Education",
  "Books",
  "Work / Freelancing",
  "Health",
  "Medicine",
  "Gym / Fitness",
  "Insurance",
  "Shopping",
  "Clothing",
  "Personal Care",
  "Electronics",
  "Entertainment",
  "Events",
  "Travel",
  "Gifts",
  "Charity",
  "Donations",
  "Loan Payment",
  "Taxes / Fees",
  "Savings",
  "Emergency",
  "Other",
  "Miscellaneous",
];

export default function Modal({ onClose, onSubmit, mode, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "",
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: initialData.name,
        amount: initialData.amount,
        category: initialData.category,
      });
    } else {
      setFormData({
        name: "",
        amount: "",
        category: "",
      });
    }
  }, [mode, initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      ...formData,
      amount: Number(formData.amount),
    });
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {mode === "edit" ? "Edit Expense" : "Add Expense"}
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            maxLength={30}
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Expense name"
          />

          <input
            type="number"
            name="amount"
            step="0.01"
            min="0"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
            placeholder="Amount"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="">Select category</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl"
            >
              {mode === "edit" ? "Update Expense" : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
