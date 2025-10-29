import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Send, Calendar, Users, Clock } from 'lucide-react'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function InterviewCard({ interview, detail = false }) {
  const url =
    process.env.NEXT_PUBLIC_HOST_URL + '/interview/' + interview?.interview_id

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    toast('Copied')
  }

  const onSend = () => {
    toast('Sending Email')
    window.location.href =
      'mailto:zlol5696@gmail.com?subject=AICruiter Interview Link &body=Interview Link :' +
      url
  }

  // Determine status based on candidates count and other factors
  const getStatusInfo = () => {
    const candidateCount = interview['interview-feedback']?.length || 0
    if (candidateCount === 0) {
      return {
        status: 'Pending',
        color: 'bg-yellow-100 text-yellow-800',
        dotColor: 'bg-yellow-500',
      }
    } else if (candidateCount > 0) {
      return {
        status: 'Active',
        color: 'bg-green-100 text-green-800',
        dotColor: 'bg-green-500',
      }
    }
    return {
      status: 'Completed',
      color: 'bg-blue-100 text-blue-800',
      dotColor: 'bg-blue-500',
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className='bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 ease-in-out hover:border-gray-300'
    >
      {/* Header with avatar and date */}
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
            <span className='text-white font-bold text-lg'>
              {interview?.jobPosition?.charAt(0) || 'I'}
            </span>
          </div>
          <div>
            <h3 className='font-semibold text-gray-900'>
              {interview?.jobPosition}
            </h3>
            <div className='flex items-center text-sm text-gray-500'>
              <Calendar className='h-4 w-4 mr-1' />
              {moment(interview?.created_at).format('MMM DD, YYYY')}
            </div>
          </div>
        </div>

        {/* Status chip */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${statusInfo.color}`}
        >
          <div className={`w-2 h-2 rounded-full ${statusInfo.dotColor}`}></div>
          <span>{statusInfo.status}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className='flex items-center justify-between mb-6 text-sm text-gray-600'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <Clock className='h-4 w-4 mr-1' />
            <span>{interview?.duration}</span>
          </div>
          <div className='flex items-center'>
            <Users className='h-4 w-4 mr-1' />
            <span>
              {interview['interview-feedback']?.length || 0} candidates
            </span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      {!detail ? (
        <div className='flex gap-3'>
          <Button
            variant='outline'
            className='flex-1 hover:bg-gray-50 hover:text-gray-900 transition-colors border-gray-200'
            onClick={copyLink}
          >
            <Copy className='mr-2 h-4 w-4' />
            Copy Link
          </Button>

          <Button
            className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300'
            onClick={onSend}
          >
            <Send className='mr-2 h-4 w-4' />
            Send
          </Button>
        </div>
      ) : (
        <Link
          href={'/schuduled-interview/' + interview?.interview_id + '/details'}
        >
          <Button
            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300'
            variant='outline'
          >
            View Details
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </Link>
      )}
    </motion.div>
  )
}

export default InterviewCard
