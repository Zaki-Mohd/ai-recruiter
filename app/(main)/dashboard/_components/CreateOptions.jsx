import { Video, BarChart3, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

function CreateOptions() {
  const options = [
    {
      title: 'Start New Interview',
      description:
        'Create a standard AI Interview and Schedule with Candidates',
      icon: Video,
      href: '/dashboard/create-interview',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'View Feedback',
      description: 'Review candidate performance and interview analytics',
      icon: MessageSquare,
      href: '/all-interviews',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Analytics',
      description: 'Track performance trends and hiring insights',
      icon: BarChart3,
      href: '/ats-analyzer',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {options.map((option, index) => (
        <motion.div
          key={option.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={option.href}
            className='group block bg-white border border-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out hover:border-gray-300'
          >
            <div className='space-y-4'>
              <div
                className={`${option.bgColor} rounded-xl p-3 w-fit group-hover:scale-110 transition-transform duration-300`}
              >
                <option.icon className={`h-8 w-8 ${option.iconColor}`} />
              </div>

              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors'>
                  {option.title}
                </h2>
                <p className='text-gray-500 text-sm leading-relaxed'>
                  {option.description}
                </p>
              </div>

              <div
                className={`h-1 w-full bg-gradient-to-r ${option.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

export default CreateOptions
