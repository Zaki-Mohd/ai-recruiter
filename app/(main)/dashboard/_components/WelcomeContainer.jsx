'use client'
import { useUser } from '@/app/provider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

function WelcomeContainer() {
  const { user } = useUser()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8 rounded-2xl shadow-md border border-blue-100'
    >
      <div className='flex items-center justify-between gap-4'>
        <div className='space-y-2'>
          {user ? (
            <h1 className='text-3xl font-bold text-gray-900'>
              Welcome back, {user.name || user.email?.split('@')[0] || 'User'}!
            </h1>
          ) : (
            <h1 className='text-3xl font-bold text-gray-900'>
              Welcome, Guest!
            </h1>
          )}
          <p className='text-base md:text-lg text-gray-600 font-medium'>
            AI-driven interviews, streamlined scheduling, and actionable
            insights — all in one place.
          </p>
          <div className='pt-2'>
            <Link href='/dashboard/create-interview'>
              <Button className='bg-blue-600 hover:bg-blue-700'>
                Start New Interview
              </Button>
            </Link>
          </div>
        </div>
        {user && (
          <div className='relative hidden md:block'>
            <Image
              src={user?.picture}
              alt='userAvatar'
              width={60}
              height={60}
              className='rounded-full border-2 border-white shadow-lg'
            />
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white'></div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default WelcomeContainer
