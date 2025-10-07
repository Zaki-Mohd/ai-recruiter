"use client";
import React, { useContext, useEffect, useState } from 'react'
import InterviewHeader from '../_components/InterviewHeader'
import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { useRouter } from 'next/navigation';
import QuestionsList from '@/app/(main)/dashboard/create-interview/_components/QuestionsList';

function Interview() {

    const {interview_id }= useParams(); 
    console.log(interview_id);
    const [interviewdata, setinterviewdata] = useState();
    const [username, setusername] = useState();
    const [loading, setloading] = useState(false);
    const [userEmail, setuserEmail] = useState();
    const {interviewInfo, setinterviewInfo} = useContext(InterviewDataContext);
    const router = useRouter();
    
    

useEffect(()=>{
    interview_id&&getInterviewDetails();
}, [interview_id])

    const getInterviewDetails =async()=>{
        setloading(true);
        try{
            // Query lowercase column names (Postgres lowercases unquoted identifiers)
            let { data: Interviews, error } = await supabase
                .from('interviews')
                .select('jobposition,jobdescription,duration,type')
                .eq('interview_id', interview_id);

            console.log(Interviews?.[0]);

            // Normalize DB columns (lowercase) to camelCase for UI consumption
            const row = Interviews?.[0] || null;
            const normalized = row
                ? {
                        jobPosition: row.jobposition || row.jobPosition || null,
                        jobDescription: row.jobdescription || row.jobDescription || null,
                        duration: row.duration || null,
                        type: row.type || null,
                    }
                : null;

            setinterviewdata(normalized);
  setloading(false);

  if(Interviews?.length==0){
    toast('Incorrect Interview Link')
    return;
  }
        } catch(error){

        setloading(false);
        toast('Incorrect Interview Link')
        }
    }

const onJoinInterview = async()=>{
    setloading(true);

        let { data: Interviews, error } = await supabase
            .from('interviews')
            .select('*')
            .eq('interview_id', interview_id);

        const row = Interviews?.[0] || null;
        const normalized = row
            ? {
                    ...row,
                    // normalize common fields to camelCase for downstream code
                    jobPosition: row.jobposition || row.jobPosition || null,
                    jobDescription: row.jobdescription || row.jobDescription || null,
                    questionList: row.questionlist || row.questionList || null,
                }
            : null;

        console.log(normalized);

        setinterviewInfo({
            username: username,
            userEmail: userEmail,
            interviewData: normalized,
        });

 
    router.push('/interview/'+interview_id+'/start');
    setloading(false);
}


  return (
    <div className='px-10 md:px-28 lg:px-48 xl:px-64 mt-16 '>
        <div className="flex flex-col items-center justify-center border rounded-xl p-7 lg:px-33 xl:px-52 mb-20">  <Image src={'/logo.png'} width={80} height={80} alt='logo' className='w-[80px]'/>
        <h2 className='mt-3'>AI-Powered Interview Platform</h2>
        <Image src={'/interview.png'} alt='interview' width={200} height={200} className='my-6'/>
        <h2 className='font-bold text-xl '>{interviewdata?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-gray-500 mt-3'><Clock className='h-4 w-4' /> {interviewdata?.duration}</h2>
        <div className="w-full">
            <h2>Enter your Full name</h2>
            <Input placeholder='e.g. Md Zaki' onChange={(event)=>{
                    setusername(event.target.value);
            }}/>
        </div>

                 <div className="w-full">
            <h2>Enter your Email </h2>
            <Input placeholder='e.g. Zakimohammad9819@gmail.com' onChange={(event)=>{
                    setuserEmail(event.target.value);
            }}/>
        </div>  





                <div className="p-3 mt-5  flex gap-4 rounded-lg ">


                        <Info className='text-primary'/>
                        <div className="">
                            <h2 className='font-bold'>Before you begin</h2>
                            <ul>
                                <li className='text-sm text-primary'>
                                        Test your Camera and microphone

                                </li>
                                <li className='text-sm text-primary'>
                                       Ensure you have stable internet connection
                                </li>
                                <li className='text-sm text-primary'>
                                       Find a quiet place for interview     
                                </li>

                            </ul>
                        </div>



                </div>
                <Button disabled={loading || !username} className={'mt-5 w-full font-bold'} onClick={()=>onJoinInterview()} > 
                    
                <Video/>{loading&&<Loader2Icon/>} Join Interview</Button>

</div>

    </div>
  )
}

export default Interview