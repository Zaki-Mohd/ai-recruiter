"use client";
import React from 'react';
import WelcomeContainer from './_components/WelcomeContainer';
import Link from 'next/link'
import { Video, FileText } from 'lucide-react'
import CreateOptions from './_components/CreateOptions';
import { Card } from '@/components/ui/card';
import PerformanceChart from './_components/PerformanceChart';
import LatestInterviewList from './_components/LatestInterviewList';

function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <WelcomeContainer />

      {/* Main content layout using CSS Grid for consistent row alignment */}
      <div className="grid gap-6 lg:grid-cols-3 items-start">

        {/* START section: heading + 3-column row (2 create cards + recent interviews) - spans full width */}
        <div className="lg:col-span-3">
          <h2 className="text-xl font-bold mb-4">Start a New Interview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href={'/dashboard/create-interview'}>
              <Card className="h-full px-6 cursor-pointer card-accent-gradient card-hover-pop focus-glow">
                <Video className='h-10 w-10 icon-accent mb-2' />
                <h3 className='font-bold text-lg'>Standard Interview</h3>
                <p className='text-gray-500 text-sm'>
                  Create a standard AI interview for your candidates.
                </p>
              </Card>
            </Link>

            <Link href={'/resume-upload'}>
              <Card className="h-full px-6 cursor-pointer card-accent-gradient card-hover-pop focus-glow">
                <FileText className='h-10 w-10 icon-accent mb-2' />
                <h3 className='font-bold text-lg'>Resume-Based Interview</h3>
                <p className='text-gray-500 text-sm'>
                  Upload a resume for a tailored interview experience.
                </p>
              </Card>
            </Link>

            <div>
              <LatestInterviewList />
            </div>
          </div>
        </div>

        {/* SECOND ROW: Performance chart spans two columns below */}
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>

      </div>
    </div>
  );
}
    
export default Dashboard;