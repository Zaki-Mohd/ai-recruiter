"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { ThemeToggle } from "../_components/ThemeToggle";



export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("authToken");
      toast.success("You have been logged out.");
      router.push("/auth");
    } catch (error) {
      toast.error("Failed to logout. Please try again.");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 rounded shadow p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-2 text-center text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
          Manage your account preferences and security.
        </p>

        <div className="flex items-center justify-between border-t pt-4 mt-4">
          <p className='text-gray-600 dark:text-gray-400'>Switch Theme</p>
          <ThemeToggle />
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-6"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
