"use client";
import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InterviewType } from '@/services/Constants';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

function FromContainer({onHandleInputChange, GoToNext}) {

        const [InterviewsType, setInterviewsType] = useState([]);
        useEffect(() => {   
                if(InterviewsType.length > 0){
                    onHandleInputChange('type', InterviewsType);
                } else {
                    onHandleInputChange('type', null);
                }

        },[InterviewsType])

        const AddInterviewType=(type)=>{
                const data=InterviewsType.includes(type);
                if(!data){
                    setInterviewsType(prev=>[...prev, type])
                }else{
                    const result = InterviewsType.filter(item => item!=type);
                    setInterviewsType(result);
                }
        }

  return (
    <div className='p-5 bg-gray-50 rounded-xl'>
        <div>
            <h2 className='text-sm font-medium'>Job Position</h2>
            <Input onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)} placeholder="e.g Full Stack Developer" className="mt-2" />
        </div>
         <div className='mt-5'>
            <h2 className='text-sm font-medium'>Job Description</h2>
            <Textarea 
            onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}
            placeholder="Enter details of the job"
            className="mt-2 h-[200px]"/>
           
        </div>
          <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview duration</h2>
              <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
                  <SelectTrigger className="w-full mt-2">
                      <SelectValue placeholder="select duration" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="5 min">5 min</SelectItem>
                      <SelectItem value="15 min">15 min</SelectItem>
                      <SelectItem value="30 min">30 min</SelectItem>
                       <SelectItem value="45 min">45 min</SelectItem>
                        <SelectItem value="60 min">60 min</SelectItem>
                  </SelectContent>
              </Select>
          
           
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
                {InterviewType.map((type, index) => (
                    <div key={index} className={`
                    flex gap-2 items-center cursor-pointer hover:bg-secondary p-1 px-2 bg-white border border-gray-300 rounded-2xl
                    ${InterviewsType.includes(type.title) ? 'bg-blue-50 text-primary' : ''}
                    `}
                    onClick={()=> AddInterviewType(type.title)

                    }
                    >
                       <type.icon className='h-4 w-4 '/>
                       <span>{type.title}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className='mt-7 flex justify-end' onClick={()=>GoToNext()}>
                     <Button>Generate Question <ArrowRight></ArrowRight></Button>
        </div>
               

    </div>
  )
}

export default FromContainer