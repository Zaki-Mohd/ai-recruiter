"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("light");

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

      const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(initialTheme);

      // Apply the theme to document
      document.documentElement.classList.toggle("dark", initialTheme === "dark");
    } catch (e) {
      // Ignore errors (like localStorage not available)
    }
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    try {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    } catch (e) {
      // Ignore errors
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md transition-colors ${
        theme === "dark"
          ? "bg-gray-800 text-yellow-400 hover:bg-gray-700"
          : "bg-white text-gray-800 hover:bg-gray-100"
      } border border-gray-200 dark:border-gray-700 shadow-sm ${className}`}
      aria-label="Toggle dark mode"
      title="Toggle dark/light mode"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}
