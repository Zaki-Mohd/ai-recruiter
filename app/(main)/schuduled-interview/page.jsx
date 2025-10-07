"use client";

import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient';
import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ScheduledInterview() {

    const {user } = useUser();
    const [inteviewList, setinteviewList] = useState([]);

    useEffect(()=>{
        user&&getInterviewList();
    },[user])


  const getInterviewList = async()=>{
    const res = await supabase.from('interviews')
    // request lowercase columns from DB
    .select('jobposition,duration,interview_id,interview-feedback(useremail)')
    .eq('useremail',user?.email)
    .order('id',{ascending:false})

    console.log(res);
    const rows = res.data || [];
    // normalize each row to camelCase for the UI
    const normalized = rows.map(r => ({
      ...r,
      jobPosition: r.jobposition || r.jobPosition || null,
      duration: r.duration || null,
      interview_id: r.interview_id || r.interviewId || null,
    }));

    setinteviewList(normalized);
  }


  return (
    <div className='mt-7'>
        <h2 className='font-bold text-xl'> 
            Interview List with Candidate Feebdack
        </h2>

         {inteviewList.length ==0 && 
            <div className='p-5 flex flex-col gap-3 items-center mt-5'> 
                <Video className='h-10 w-10 text-primary' />
                <h2>You don't have any interview created!!</h2>
                <Button>+ Create New Interview</Button>
                
                </div>}

              {
                inteviewList&&<div className=' mt-5  grid grid-cols-2 xl:grid-cols-3 gap-5'>
                  {inteviewList?.map((interview,index)=>(
                    <InterviewCard  detail={true} interview={interview} key={index} />
                  )) }
                </div>
}

    </div>
  )
}

export default ScheduledInterview