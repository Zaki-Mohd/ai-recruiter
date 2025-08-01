"use client";
import React from 'react'
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';





const login = () => {
  

  const signInWithGoogle = async() => {
    
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
     options: {
    redirectTo: `http://ai-recruiter-azure.vercel.app/dashboard` 
  }
})
if (error) {  
  console.error('Error signing in with Google:', error.message);
  } 
 

  }


  return (
    <div className='flex flex-col items-center justify-center h-screen  '>
      <div className='flex flex-col items-center justify-center border rounded-2xl p-8'>
        <Image className="w-[95px]" src={'/logo.png'} alt = 'logo' width={400} height={100} />
      
      <div className='flex flex-col items-center justify-center'>
        <Image className="w-[400px] h-[400px]  rounded-2xl " src={'/login.png'} alt = 'login' width={600} height={400} ></Image>
        <h2 className='text-2xl font-bold text-center'>Welcome to Acruitor</h2>
        <p className='text-center text-black-300'>Login via Google Authentication</p>
        <Button
              onClick={signInWithGoogle}
              className="w-full mt-7"
              >Sign in with Google
        </Button>
      </div>
      </div>
    </div>
  )
}

export default login