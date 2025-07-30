import { Phone, Video, FileText } from 'lucide-react' // Added FileText icon
import Link from 'next/link'
import React from 'react'

function CreateOptions() {
  return (
   <div className='grid grid-cols-2 gap-4 '>

    <Link href={'/dashboard/create-interview'} className='bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out' >
        <Video className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' />
        <h2 className='font-bold'>Create New Interview (Standard)</h2>{/* Updated text */}
        <p className='text-gray-500'>Create a standard AI Interview and Schedule with Candidates</p>{/* Updated text */}
    </Link>
    
    {/* New Resume-Based Interview Option */}
    <Link href={'/resume-upload'} className='bg-white border border-gray-200 rounded-lg p-5 cursor-pointer hover:shadow-lg transition-shadow duration-200 ease-in-out'>
        <FileText className='p-3 text-primary bg-blue-50 rounded-lg h-12 w-12' /> {/* Using FileText icon */}
        <h2 className='font-bold'>Start Resume-Based Interview</h2>{/* New Heading */}
        <p className='text-gray-500'>Upload a resume to start an AI interview tailored to their experience</p>{/* New Description */}
    </Link>

   </div>
  )
}

export default CreateOptions