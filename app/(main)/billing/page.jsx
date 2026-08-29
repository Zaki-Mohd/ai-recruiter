"use client";
import { toast } from "sonner"; // adjust if you use another toast lib
import { CreditCard, CheckCircle, Zap, Shield } from "lucide-react"; // free icons from lucide-react
import { useUser } from "@/app/provider";

export default function BillingPage() {
  const { user } = useUser();
  const handleUnderMaintenance = () => {
    toast.warning("⚠️ This feature is under maintenance. Please try again later.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6 md:px-12">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Billing</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Manage your payment and credits</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Your Credits */}
        <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
          <h2 className="font-semibold mb-2 text-gray-900 dark:text-white">Your Credits</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Current usage and remaining credits</p>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full p-3">
              <CreditCard size={24} />
            </div>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{user?.credits ?? 0} interviews left</span>
          </div>
          <button
            onClick={handleUnderMaintenance}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            + Add More Credits
          </button>
        </div>

        {/* Purchase Credits */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlanCard
            title="Basic"
            price="$5"
            interviews="20 interviews"
            features={["Basic interview templates", "Email support"]}
            icon={<CheckCircle size={24} />}
            onClick={handleUnderMaintenance}
          />
          <PlanCard
            title="Standard"
            price="$12"
            interviews="50 interviews"
            features={["All interview templates", "Priority support", "Basic analytics"]}
            icon={<Zap size={24} />}
            highlighted
            onClick={handleUnderMaintenance}
          />
          <PlanCard
            title="Pro"
            price="$25"
            interviews="120 interviews"
            features={["All interview templates", "24/7 support", "Advanced analytics"]}
            icon={<Shield size={24} />}
            onClick={handleUnderMaintenance}
          />
        </div>
      </div>
    </div>
  );
}

// PlanCard Component
function PlanCard({ title, price, interviews, features, highlighted, icon, onClick }) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded shadow p-6 flex flex-col justify-between border
      ${highlighted ? "border-blue-400 dark:border-blue-500" : "border-gray-200 dark:border-gray-700"}
      hover:scale-[1.02] hover:shadow-md transition transform
    `}>
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{title}</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{price}</p>
        <p className="text-gray-500 dark:text-gray-400 mb-4">{interviews}</p>
        <ul className="space-y-1 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
              <span className="text-blue-500 dark:text-blue-400 mr-2">•</span>{feature}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onClick}
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Purchase Credits
      </button>
    </div>
  );
}
