"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Provider from "./provider";
import { useUser } from "@/app/provider";

/**
 * Home Page — AIcruiter
 * 
 * Features:
 * - Responsive landing layout with accessible navigation.
 * - Conditional redirect based on authentication state.
 * - Client-only rendering to prevent hydration mismatch.
 */

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Mount only on client to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to Dashboard or Auth
  const handleDashboardClick = () => {
    router.push(user ? "/dashboard" : "/auth");
  };

  if (!mounted) return null;

  return (
    <Provider>
      <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-900 flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-6 sm:px-10 py-4 bg-white/70 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="AIcruiter logo"
              width={42}
              height={42}
              priority
              className="rounded-md"
            />
            <span className="text-2xl font-semibold tracking-tight">
              AIcruiter
            </span>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-6">
            <button
              onClick={handleDashboardClick}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              aria-label="Go to dashboard or login"
            >
              Dashboard
            </button>
            <button
              onClick={() => router.push("/about")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              aria-label="Learn about AIcruiter"
            >
              About
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              aria-label="Contact AIcruiter team"
            >
              Contact
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center text-center flex-grow px-6 py-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-800 leading-tight">
            Simplify Recruitment with AI-Powered Assistance
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mb-10">
            AIcruiter helps you streamline your hiring process — from candidate
            screening to intelligent interview insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDashboardClick}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-all font-semibold"
            >
              {user ? "Go to Dashboard" : "Get Started"}
            </button>
            <button
              onClick={() => router.push("/learn-more")}
              className="px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-lg shadow-sm hover:bg-blue-50 transition-all font-semibold"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-gray-200 text-gray-500 text-sm">
          © {new Date().getFullYear()} AIcruiter. All rights reserved.
        </footer>
      </main>
    </Provider>
  );
}

