"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react';

function WelcomeContainer() {
  const { user } = useUser();
  console.log("User in WelcomeContainer:");

  return (
    <div className='bg-gray-200 p-3 rounded-xl flex items-center justify-between dark:text-gray-800'>
      <div >
      {user ? (
        <h1 className='text-lg font-bold'>Welcome Back, {user.name || user.email || "User"}!</h1>
        
        
      ) : (
        <h1>Welcome, Guest!</h1>
      )}
      <h2 className='text-grey'>AI-Driven Interviews, Hassel free hiring</h2>
      </div>
      {user && <Image src={user?.picture} alt='userAvatar' width={40} height={40} className='rounded-full'></Image>}
    </div>
  );
}

export default WelcomeContainer;
