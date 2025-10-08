"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import ThemeToggle from "@/components/ThemeToggle";

const Login = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://ai-recruiter-azure.vercel.app/dashboard`,
      },
    });

    if (error) {
      console.error("Error signing in with Google:", error.message);
    }
  };

  // Theme toggle state and functionality
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Set initial theme
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen dark:bg-gray-900">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 dark:bg-gray-900">
        {/* Logo & Title */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="AIcruiter Logo"
              width={40}
              height={40}
              className="cursor-pointer"
            />
            <span className="text-xl font-bold dark:text-white">AIcruiter</span>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Features
          </button>
          <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            How It Works
          </button>
          <button className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
            Pricing
          </button>
        </div>

        {/* Theme toggle */}
        <ThemeToggle />
      </nav>

      {/* Login Section */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-4">
        <div className="flex flex-col items-center justify-center border rounded-2xl p-8 shadow-lg max-w-md w-full bg-white dark:bg-gray-800 dark:border-gray-700">
          <Image
            className="w-[95px]"
            src="/logo.png"
            alt="logo"
            width={95}
            height={95}
          />

          <div className="flex flex-col items-center justify-center mt-6">
            <Image
              className="w-[400px] h-[400px] rounded-2xl object-cover"
              src="/login.png"
              alt="login"
              width={400}
              height={400}
            />
            <h2 className="text-2xl font-bold text-center mt-4 dark:text-white">
              Welcome to AIcruiter
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Login via Google Authentication
            </p>
            <Button onClick={signInWithGoogle} className="w-full mt-7">
              Sign in with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;