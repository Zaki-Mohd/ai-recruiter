"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react';

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div className="
      sticky top-0 z-20
      bg-[#0e1625]/80 backdrop-blur-md
      border border-white/10
      text-white rounded-xl px-6 py-4 mb-6
      flex items-center justify-between shadow-sm
    ">
      <div>
        {user ? (
          <h1 className="text-lg font-semibold tracking-wide">
            Welcome back, {user.name || user.email || "User"} 👋
          </h1>
        ) : (
          <h1 className="text-lg font-semibold">Welcome, Guest!</h1>
        )}
        <h2 className="text-sm text-gray-400">
          AI-Driven Interviews, Hassle-Free Hiring
        </h2>
      </div>

      {user?.picture && (
        <Image
          src={user.picture}
          alt="user avatar"
          width={40}
          height={40}
          className="rounded-full border border-gray-700"
        />
      )}
    </div>
  );
}

export default WelcomeContainer;
