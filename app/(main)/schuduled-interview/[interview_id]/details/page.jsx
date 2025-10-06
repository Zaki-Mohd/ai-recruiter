"use client";
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import InterviewDetail from './_components/InterviewDetail';
import CandidateList from './_components/CandidateList';

function InterviewDetails() {

    const {interview_id} = useParams();
    const {user} = useUser();
    const [interviewDetail, setinterviewDetail] = useState();
    useEffect(()=>{
            user&&getinterviewdetail();
    },[user])

    const getinterviewdetail = async()=>{
        const res = await supabase.from('interviews')
          // Request lowercase columns from DB
          .select('jobposition,jobdescription,type,questionlist,duration,interview_id,created_at,interview-feedback(useremail,userName,feedback,created_at)')
          .eq('useremail',user?.email)
                    .eq('interview_id',interview_id)
                    .order('id',{ascending:false})  

                    console.log(res);
                    const row = res?.data?.[0] || null;
                    const normalized = row ? {
                      jobPosition: row.jobposition || row.jobPosition || null,
                      jobDescription: row.jobdescription || row.jobDescription || null,
                      questionList: row.questionlist || row.questionList || null,
                      type: row.type || null,
                      duration: row.duration || null,
                      interview_id: row.interview_id || null,
                      created_at: row.created_at || null,
                      'interview-feedback': row['interview-feedback'] || row['interview-Feedback'] || null,
                    } : null;

                    setinterviewDetail(normalized); 
                    // setinteviewList(res.data );
    }

  return (
    <div className='mt-5'>
        <h2 className='font-bold text-2xl'>Interview Details</h2>
       <InterviewDetail  interviewDetail={interviewDetail}/>
       <CandidateList candidatelist={interviewDetail?.['interview-feedback']}/>
    </div>
  )
}

export default InterviewDetails