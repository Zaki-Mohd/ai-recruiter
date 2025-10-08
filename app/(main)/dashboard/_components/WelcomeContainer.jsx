"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';

function WelcomeContainer() {
  const { user } = useUser();
  console.log("User in WelcomeContainer:");

  return (
    <div className='bg-gray-200 dark:bg-gray-800 p-3 rounded-xl flex items-center justify-between'>
      <div>
        {user ? (
          <h1 className='text-lg font-bold dark:text-white'>Welcome Back, {user.name || user.email || "User"}!</h1>
        ) : (
          <h1 className="dark:text-white">Welcome, Guest!</h1>
        )}
        <h2 className='text-grey dark:text-gray-300'>AI-Driven Interviews, Hassle-free hiring</h2>
      </div>
      <div className="flex items-center gap-2">
        {user && <Image src={user?.picture} alt='userAvatar' width={40} height={40} className='rounded-full' />}
        <ThemeToggle />
      </div>
    </div>
  );
}

export default WelcomeContainer;
