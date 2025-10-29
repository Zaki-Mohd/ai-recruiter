'use client'
import { useUser } from '@/app/provider'
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import { Video, ArrowRight, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import InterviewCard from './InterviewCard'
import { motion } from 'framer-motion'
import Link from 'next/link'

function LatestInterviewList() {
  const [inteviewlist, setinteviewlist] = useState([])
  const { user } = useUser()

  useEffect(() => {
    user && getInterviewList()
  }, [user])

  const getInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })
      .limit(5)

    console.log(Interviews)
    setinteviewlist(Interviews)
  }

  return (
    <div className='bg-white rounded-2xl border border-gray-200 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900'>
            Recent Interviews
          </h2>
          <p className='text-gray-500 mt-1'>Your latest interview sessions</p>
        </div>
        <Link href='/all-interviews'>
          <Button
            variant='outline'
            className='flex items-center space-x-2 hover:bg-gray-50'
          >
            <span>View All</span>
            <ArrowRight className='h-4 w-4' />
          </Button>
        </Link>
      </div>

      {/* Content */}
      {inteviewlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className='p-8 flex flex-col items-center justify-center text-center space-y-4'
        >
          <div className='bg-blue-50 rounded-2xl p-6'>
            <Video className='h-12 w-12 text-blue-600 mx-auto' />
          </div>
          <div className='space-y-2'>
            <h3 className='text-xl font-semibold text-gray-900'>
              No interviews yet
            </h3>
            <p className='text-gray-500 max-w-sm'>
              Start your first AI-powered interview to streamline your hiring
              process
            </p>
          </div>
          <Link href='/dashboard/create-interview'>
            <Button className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300'>
              <Plus className='mr-2 h-4 w-4' />
              Create New Interview
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className='space-y-4'>
          {inteviewlist.map((interview, index) => (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <InterviewCard interview={interview} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LatestInterviewList
