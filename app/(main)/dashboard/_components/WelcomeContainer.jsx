"use client";
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react';

function WelcomeContainer() {
  const { user } = useUser();
  console.log("User in WelcomeContainer:");

  return (
    <div className='bg-gray-200 p-3 rounded-xl flex items-center justify-between'>
      <div >
      {user ? (
        <h1 className='text-lg font-bold'>Welcome Back, {user.name || user.email || "User"}!</h1>
        
        
      ) : (
        <h1>Welcome, Guest!</h1>
      )}
      <h2 className='text-grey'>AI-Driven Interviews, Hassel free hiring</h2>
      </div>
      <div className='flex items-center gap-3'>
        {user && (
          <span className='bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full'>
            {user.credits ?? 0} Credits
          </span>
        )}
        {user && <Image src={user?.picture} alt='userAvatar' width={40} height={40} className='rounded-full'></Image>}
      </div>
    </div>
  );
}

export default WelcomeContainer;
