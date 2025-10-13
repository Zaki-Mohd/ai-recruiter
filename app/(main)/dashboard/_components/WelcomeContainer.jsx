"use client";

import { useUser } from "@/app/provider";
import Image from "next/image";
import React from "react";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 p-4 rounded-xl flex items-center justify-between shadow-sm transition-colors duration-300">
      {/* Left side text */}
      <div>
        {user ? (
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Welcome Back, {user.name || user.email || "User"}!
          </h1>
        ) : (
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Welcome, Guest!
          </h1>
        )}

        <h2 className="text-sm text-gray-600 dark:text-gray-400">
          AI-Driven Interviews, Hassle-Free Hiring
        </h2>
      </div>

      {/* Right side avatar */}
      {user?.picture && (
        <Image
          src={user.picture}
          alt={user.name ? `${user.name}'s avatar` : "User avatar"}
          width={48}
          height={48}
          className="rounded-full border border-gray-300 dark:border-gray-700"
        />
      )}
    </div>
  );
}

export default WelcomeContainer;
