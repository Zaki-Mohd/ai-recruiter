"use client";

import React, { useEffect, useState } from 'react'
import InterviewCard from '../dashboard/_components/InterviewCard';
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

function page() {
  const [inteviewlist, setinteviewlist] = useState([])
    const {user} = useUser();

    useEffect(()=>{

      user&&getInterviewList();

    },[user])





    const getInterviewList =async()=>{

        let { data: Interviews, error } = await supabase
        .from('interviews')
        .select('*')
  .eq('useremail',user?.email)
        .order('id',{ascending:false})
        

        console.log(Interviews);
        setinteviewlist(Interviews);
    }

   

  return (
    <div >
            <h2 className='my-5 font-bold text-2xl'>All Previously Created Interviews</h2>
            {inteviewlist.length==0 && 
            <div className='p-5 flex flex-col gap-3 items-center mt-5'> 
                <Video className='h-10 w-10 text-primary' />
                <h2>You don't have any interview created!!</h2>
                <Button>+ Create New Interview</Button>
                
                </div>}

              {
                inteviewlist&&<div className=' mt-5  grid grid-cols-2 xl:grid-cols-3 gap-5'>
                  {inteviewlist.map((interview,index)=>(
                    <InterviewCard  interview={interview} key={index} />
                  )) }
                </div>
              }
    </div>
  )
}

export default page