"use client";
import { ArrowLeft } from 'lucide-react';
import {Progress} from '@/components/ui/progress';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import FromContainer from './_components/FromContainer';
import QuestionsList from './_components/QuestionsList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/provider';

function CreateInterview() {
    const router = useRouter();
    const [step, setstep] = useState(1);
    const [formData, setformData] = useState({ type: [] });
    const [interview_id, setinterview_id] = useState();
    const {user} = useUser();
    const onHandleInputChange = (field, value) => {
        setformData(prev => {
            const next = { ...(prev || {}), [field]: value };
            console.log('Form Data:', next);
            return next;
        });
    };

    const onToggleType = (type) => {
        setformData(prev => {
            const prevTypes = (prev?.type) || [];
            const exists = prevTypes.includes(type);
            const nextTypes = exists ? prevTypes.filter(t => t !== type) : [...prevTypes, type];
            const next = { ...(prev || {}), type: nextTypes };
            console.log('Form Data (toggle type):', next);
            return next;
        });
    };

    const onGoToNext=()=>{
        // Allow generating questions even when user has no credits.
        // Credits will be enforced when finalizing the interview (onFinish in QuestionsList).

        // Validate required fields. Ensure at least one interview type is selected.
        if (!formData?.jobPosition || !formData?.jobDescription || !formData?.duration || !(formData?.type && formData.type.length > 0)) {
            toast('Please enter all details!');
            return;
        }
        setstep(step+1);
    }

    const onCreateLink =(interview_id)=>{
        setinterview_id(interview_id);
        setstep(step+1);
    }

  return (
    <div className='mt-10 px-10 md:px-24 lg:px-56'>
        
        <div className='flex gap-5 items-center'>
        <ArrowLeft className='cursor-pointer' onClick={()=>router.back()}/>
        <h2 className='font-bold text-2x1'>Create New Interview</h2>
        
        </div>
        <Progress value={step * 33} className="my-5" />
                { step==1?
                    <FromContainer
                        onHandleInputChange={onHandleInputChange}
                        GoToNext={()=>onGoToNext()}
                        selectedTypes={formData.type || []}
                        onToggleType={onToggleType}
                    />
        :step==2?<QuestionsList formData={formData} onCreateLink={(interview_id)=>onCreateLink(interview_id)}/>:
        step==3? <InterviewLink interview_id={interview_id}
        formData={formData}
        />:null
        }
    </div>
  )
}

export default CreateInterview