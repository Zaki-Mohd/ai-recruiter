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
                if(InterviewsType){
                    onHandleInputChange('type', InterviewsType);
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
    <div className='p-5 bg-gray-50 dark:bg-gray-800 rounded-xl'>
        <div>
            <h2 className='text-sm font-medium dark:text-white'>Job Position</h2>
            <Input onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)} 
                  placeholder="e.g Full Stack Developer" 
                  className="mt-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
         <div className='mt-5'>
            <h2 className='text-sm font-medium dark:text-white'>Job Description</h2>
            <Textarea 
            onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}
            placeholder="Enter details of the job"
            className="mt-2 h-[200px] dark:bg-gray-700 dark:border-gray-600"/>
           
        </div>
          <div className='mt-5'>
            <h2 className='text-sm font-medium dark:text-white'>Interview duration</h2>
              <Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
                  <SelectTrigger className="w-full mt-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="select duration" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="5 min">5 min</SelectItem>
                      <SelectItem value="15 min">15 min</SelectItem>
                      <SelectItem value="30 min">30 min</SelectItem>
                      <SelectItem value="45 min">45 min</SelectItem>
                      <SelectItem value="60 min">60 min</SelectItem>
                  </SelectContent>
              </Select>
        </div>

        <div className='mt-5'>
            <h2 className='text-sm font-medium dark:text-white'>Interview Type</h2>
            <div className='flex gap-3 flex-wrap mt-2'>
                {InterviewType.map((type, index) => (
                    <div key={index} className={`
                    flex gap-2 items-center cursor-pointer hover:bg-secondary p-1 px-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl
                    ${InterviewsType.includes(type.title) ? 'bg-blue-50 text-primary dark:bg-blue-900/40 dark:text-blue-300' : 'dark:text-gray-300'}
                    `}
                    onClick={()=> AddInterviewType(type.title)}>
                       <type.icon className='h-4 w-4'/>
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