import { Phone, Video, FileText } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
   <div className='grid grid-cols-2 gap-4'>
    <Link href={'/dashboard/create-interview'} className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out'>
        <Video className='p-3 text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg h-12 w-12' />
        <h2 className='font-bold dark:text-white'>Create New Interview (Standard)</h2>
        <p className='text-gray-500 dark:text-gray-400'>Create a standard AI Interview and Schedule with Candidates</p>
    </Link>
    
    {/* New Resume-Based Interview Option */}
    <Link href={'/resume-upload'} className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out'>
        <FileText className='p-3 text-primary dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-lg h-12 w-12' />
        <h2 className='font-bold dark:text-white'>Start Resume-Based Interview</h2>
        <p className='text-gray-500 dark:text-gray-400'>Upload a resume to start an AI interview tailored to their experience</p>
    </Link>
   </div>
  )
}

export default CreateOptions