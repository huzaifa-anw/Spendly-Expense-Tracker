import {
    Trash2,
    Edit2,
    Utensils,
    Soup,
    ShoppingCart,
    Coffee,
    Car,
    Fuel,
    ParkingCircle,
    Home,
    Wrench,
    Sofa,
    Smartphone,
    Wifi,
    GraduationCap,
    BookOpen,
    Briefcase,
    HeartPulse,
    Pill,
    Dumbbell,
    Clapperboard,
    Shield,
    ShoppingBag,
    Shirt,
    Sparkles,
    Ticket,
    Plane,
    Gift,
    HandHeart,
    Landmark,
    Receipt,
    PiggyBank,
    AlertTriangle,
    MoreHorizontal,
    Package,
    Plug,
    Building2
} from "lucide-react";
import dayjs from 'dayjs';

export default function ExpenseItem({
  name,
  category,
  amount,
  dateCreated,
  onUpdate, // callback for update
  onDelete, // callback for delete
}) {
    const formattedDate = dayjs(dateCreated).format('D/M/YY');
    console.log(category);
    function getCategoryStyles(cat) {
        switch (cat) {
            // 🍔 Food
            case "Food":
            return "bg-orange-500 text-white";
            case "Dining Out":
            return "bg-amber-500 text-white";
            case "Groceries":
            return "bg-yellow-500 text-black"; // readability
            case "Coffee & Snacks":
            return "bg-amber-500 text-white";

            // 🚗 Transport
            case "Transport":
            return "bg-blue-500 text-white";
            case "Fuel":
            return "bg-sky-500 text-white";
            case "Parking":
            return "bg-indigo-500 text-white";

            // 🏠 Home
            case "Rent":
            return "bg-emerald-500 text-white";
            case "Utilities":
            return "bg-green-500 text-white";
            case "Home Maintenance":
            return "bg-lime-500 text-black"; // lime needs black
            case "Furniture":
            return "bg-teal-500 text-white";

            // 📱 Bills & Digital
            case "Mobile Recharge":
            return "bg-cyan-500 text-white";
            case "Internet":
            return "bg-blue-500 text-white";
            case "Subscriptions":
            return "bg-indigo-500 text-white";

            // 🎓 Education & Work
            case "Education":
            return "bg-purple-500 text-white";
            case "Books":
            return "bg-violet-500 text-white";
            case "Work / Freelancing":
            return "bg-fuchsia-500 text-white";

            // 🏥 Health
            case "Health":
            return "bg-teal-500 text-white";
            case "Medicine":
            return "bg-emerald-500 text-white";
            case "Gym / Fitness":
            return "bg-green-500 text-white";
            case "Insurance":
            return "bg-blue-500 text-white";

            // 🛍 Shopping
            case "Shopping":
            return "bg-pink-500 text-white";
            case "Clothing":
            return "bg-rose-500 text-white";
            case "Personal Care":
            return "bg-pink-500 text-white";
            case "Electronics":
            return "bg-slate-500 text-white";

            // 🎬 Entertainment
            case "Entertainment":
            return "bg-indigo-500 text-white";
            case "Events":
            return "bg-purple-500 text-white";

            // ✈ Travel
            case "Travel":
            return "bg-sky-500 text-white";

            // 🎁 Social / Giving
            case "Gifts":
            return "bg-rose-500 text-white";
            case "Charity":
            return "bg-red-500 text-white";
            case "Donations":
            return "bg-red-500 text-white";

            // 💳 Financial Obligations
            case "Loan Payment":
            return "bg-slate-500 text-white";
            case "Taxes / Fees":
            return "bg-gray-500 text-white";

            // 💰 Savings
            case "Savings":
            return "bg-emerald-500 text-white";
            case "Emergency":
            return "bg-red-500 text-white";

            // ❓ Other
            case "Other":
            return "bg-gray-500 text-white";
            case "Miscellaneous":
            return "bg-neutral-500 text-white";

            default:
            return "bg-gray-500 text-white";
        }
    }

    function getCategoryIcon(cat) {
        switch (cat) {
            // 🍔 Food
            case "Food":
            return <Soup size={20} />;
            case "Dining Out":
            return <Utensils size={20} />;
            case "Groceries":
            return <ShoppingCart size={20} />;
            case "Coffee & Snacks":
            return <Coffee size={20} />;

            // 🚗 Transport
            case "Transport":
            return <Car size={20} />;
            case "Fuel":
            return <Fuel size={20} />;
            case "Parking":
            return <ParkingCircle size={20} />;

            // 🏠 Home
            case "Rent":
            return <Building2 size={20} />
            case "Home Maintenance":
            return <Home size={20} />;
            case "Furniture":
            return <Sofa size={20} />
            
            case "Utilities":
            return <Wrench size={20} />

            // 📱 Bills & Digital
            case "Mobile Recharge":
            return <Smartphone size={20} />;
            case "Internet":
            return <Wifi size={20} />;
            case "Subscriptions":
            return <Tv size={20} />;

            // 🎓 Education & Work
            case "Education":
            return <GraduationCap size={20} />
            case "Books":
            return <BookOpen size={20} />;
            case "Work / Freelancing":
            return <Briefcase size={20} />;

            // 🏥 Health
            case "Health":
            return <HeartPulse size={20} />;
            case "Medicine":
            return <Pill size={20} />
            case "Gym / Fitness":
            return <Dumbbell size={20} />;
            case "Insurance":
            return <Shield size={20} />;

            // 🛍 Shopping
            case "Shopping":
            return <ShoppingBag size={20} />;
            case "Clothing":
            return <Shirt size={20} />
            case "Personal Care":
            return <Sparkles size={20} />
            case "Electronics":
            return <Plug size={20} />;

            // 🎬 Entertainment
            case "Entertainment":
            return <Clapperboard size={20} />
            case "Events":
            return <Ticket size={20} />;

            // ✈ Travel
            case "Travel":
            return <Plane size={20} />;

            // 🎁 Social / Giving
            case "Gifts":
            return <Gift size={20} />;
            case "Charity":
            return <Landmark size={20} />;
            case "Donations":
            return <HandHeart size={20} />;

            // 💳 Financial Obligations
            case "Loan Payment":
            return <Banknote size={20} />;
            case "Taxes / Fees":
            return <Receipt size={20} />;

            // 💰 Savings
            case "Savings":
            return <PiggyBank size={20} />;
            case "Emergency":
            return <AlertTriangle size={20} />;

            // ❓ Other
            case "Other":
            return <MoreHorizontal size={20} />;
            case "Miscellaneous":
            return <Package size={20} />;
            default:
            return <HelpCircle size={20} />;
        }
    }

    const categoryStyles = getCategoryStyles(category);

    const categoryIcon = getCategoryIcon(category);
    
  return (
    <div className="w-full mb-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 px-6 py-4 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4 h-16">
            {/* Category Icon */}
            <div
                className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${categoryStyles}`}
            >
                {categoryIcon}
        </div>

        {/* Name + Date */}
        <div className="flex flex-col justify-center">
            <h3 className="text-base font-semibold text-gray-800">
            {name}
            </h3>
            <span className="text-sm text-gray-500">
            {formattedDate}
            </span>
        </div>
        </div>

        {/* MIDDLE SECTION - Category Name */}
        <div className="flex-1 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">
                {category}
            </span>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4 h-16">
            {/* Amount */}
            <span className="text-lg font-semibold text-gray-800">
                Rs {amount}
            </span>

            {/* Update Button */}
            <button
                onClick={onUpdate}
                className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
            >
                <Edit2 size={16} />
            </button>

            {/* Delete Button */}
            <button
                onClick={onDelete}
                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
                <Trash2 size={16} />
            </button>
        </div>
    </div>
  );
}