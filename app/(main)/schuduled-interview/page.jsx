"use client";

import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';

function ScheduledInterview() {
    const {user } = useUser();
    const [inteviewList, setinteviewList] = useState([]);

    useEffect(()=>{
        user&&getInterviewList();
    },[user])


    const getInterviewList = async()=>{
        const res = await supabase.from('Interviews')
        .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
        .eq('userEmail',user?.email)
        .order('id',{ascending:false})
        
        console.log(res);
        setinteviewList(res.data );
    }


  return (
    <div className='mt-7 dark:bg-gray-900 dark:text-white'>
        {/* Add theme toggle in top right */}
        <div className="absolute top-4 right-4 z-50">
            <ThemeToggle />
        </div>
        
        <h2 className='font-bold text-xl'> 
            Interview List with Candidate Feedback
        </h2>

         {inteviewList.length === 0 && 
            <div className='p-5 flex flex-col gap-3 items-center mt-5 bg-white dark:bg-gray-800 rounded-lg'> 
                <Video className='h-10 w-10 text-primary dark:text-blue-400' />
                <h2 className="dark:text-white">You don't have any interview created!!</h2>
                <Button>+ Create New Interview</Button>
            </div>}

            {inteviewList && 
                <div className='mt-5 grid grid-cols-2 xl:grid-cols-3 gap-5'>
                  {inteviewList?.map((interview,index) => (
                    <InterviewCard detail={true} interview={interview} key={index} />
                  ))}
                </div>
            }
    </div>
  )
}

export default ScheduledInterview