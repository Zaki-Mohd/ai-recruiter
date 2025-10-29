'use client'
import React from 'react'
import WelcomeContainer from './_components/WelcomeContainer'
import Provider, { useUser } from '@/app/provider'
import CreateOptions from './_components/CreateOptions'
import LatestInterviewList from './_components/LatestInterviewList'
import ScoreDonut from './_components/ScoreDonut'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

// Mock data for charts
const performanceData = [
  { month: 'Jan', interviews: 12, successRate: 75 },
  { month: 'Feb', interviews: 18, successRate: 82 },
  { month: 'Mar', interviews: 15, successRate: 78 },
  { month: 'Apr', interviews: 22, successRate: 85 },
  { month: 'May', interviews: 28, successRate: 88 },
  { month: 'Jun', interviews: 25, successRate: 90 },
  { month: 'Jul', interviews: 32, successRate: 92 },
  { month: 'Aug', interviews: 30, successRate: 89 },
  { month: 'Sep', interviews: 35, successRate: 94 },
  { month: 'Oct', interviews: 38, successRate: 96 },
  { month: 'Nov', interviews: 42, successRate: 98 },
]

const statsData = [
  {
    label: 'Total Interviews',
    value: '142',
    change: '+12%',
    color: 'text-blue-600',
  },
  {
    label: 'Success Rate',
    value: '89%',
    change: '+5%',
    color: 'text-green-600',
  },
  {
    label: 'Avg Score',
    value: '4.2',
    change: '+0.3',
    color: 'text-purple-600',
  },
  {
    label: 'Active Sessions',
    value: '8',
    change: '+2',
    color: 'text-orange-600',
  },
]

function Dashboard() {
  return (
    <Provider>
      <div className='min-h-screen bg-gray-50'>
        <div className='px-4 md:px-8 py-6 space-y-8'>
          {/* Welcome Section */}
          <WelcomeContainer />

          {/* Action Cards */}
          <CreateOptions />

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className='bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300'
              >
                <div className='space-y-2'>
                  <p className='text-sm font-medium text-gray-600'>
                    {stat.label}
                  </p>
                  <div className='flex items-baseline space-x-2'>
                    <p className={`text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <span className='text-sm text-green-600 font-medium'>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts and Activity */}
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
            {/* Performance Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='bg-white rounded-2xl p-6 border border-gray-200 xl:col-span-2'
            >
              <div className='space-y-4'>
                <div>
                  <h3 className='text-xl font-bold text-gray-900'>
                    Performance Overview
                  </h3>
                  <p className='text-gray-500'>Interview success rate trends</p>
                </div>
                <div className='h-80'>
                  <ResponsiveContainer width='100%' height='100%'>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                      <XAxis dataKey='month' stroke='#666' fontSize={12} />
                      <YAxis stroke='#666' fontSize={12} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend wrapperStyle={{ paddingTop: 8 }} />
                      <Line
                        type='monotone'
                        dataKey='successRate'
                        stroke='#2563eb'
                        strokeWidth={3}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>

            {/* Interviews Frequency & Benchmark */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className='space-y-6'
            >
              <div className='bg-white rounded-2xl p-6 border border-gray-200'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-xl font-bold text-gray-900'>
                      Interview Volume
                    </h3>
                    <p className='text-gray-500'>Sessions per month</p>
                  </div>
                  <div className='h-56'>
                    <ResponsiveContainer width='100%' height='100%'>
                      <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
                        <XAxis dataKey='month' stroke='#666' fontSize={12} />
                        <YAxis stroke='#666' fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                          }}
                        />
                        <Bar
                          dataKey='interviews'
                          fill='#8b5cf6'
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-2xl p-6 border border-gray-200'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h4 className='text-sm font-medium text-gray-600'>
                      This month vs last month
                    </h4>
                    <p className='mt-1 text-3xl font-bold text-gray-900'>
                      +14%
                    </p>
                    <p className='text-sm text-gray-500 mt-1'>
                      Higher interview activity
                    </p>
                  </div>
                  <div className='h-16 w-28'>
                    {/* Simple benchmark sparkline */}
                    <ResponsiveContainer width='100%' height='100%'>
                      <LineChart data={performanceData.slice(-6)}>
                        <YAxis hide domain={['auto', 'auto']} />
                        <XAxis hide dataKey='month' />
                        <Line
                          type='monotone'
                          dataKey='interviews'
                          stroke='#10b981'
                          strokeWidth={3}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-2xl p-6 border border-gray-200'>
                <ScoreDonut label='Avg Score' score={4.2} max={5} />
              </div>
            </motion.div>
          </div>

          {/* Recent activity list */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <LatestInterviewList />
          </div>
        </div>
      </div>
    </Provider>
  )
}

export default Dashboard
