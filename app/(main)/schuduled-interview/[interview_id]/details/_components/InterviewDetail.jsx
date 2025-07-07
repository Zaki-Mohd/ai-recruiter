import { Calendar, Clock } from 'lucide-react'
import moment from 'moment'
import React from 'react'

function InterviewDetail({ interviewDetail }) {
  let parsedType = []
  try {
    parsedType = JSON.parse(interviewDetail?.type || '[]')
  } catch (e) {
    console.error('Invalid type JSON:', interviewDetail?.type)
  }

  let parsedQuestions = []
  try {
    parsedQuestions = JSON.parse(interviewDetail?.questionList || '[]')
  } catch (e) {
    console.error('Invalid questionList JSON:', interviewDetail?.questionList)
  }

  return (
    <div className='p-5 bg-gray-100 rounded-lg mt-5'>
      <h2 className='font-bold'>{interviewDetail?.jobPosition}</h2>

      <div className='mt-4 flex items-center justify-between lg:pr-52'>
        <div>
          <h2 className='text-sm text-gray-500'>Duration</h2>
          <h2 className='flex text-sm font-bold items-center gap-3 mt-2'><Clock /> {interviewDetail?.duration}</h2>
        </div>

        <div>
          <h2 className='text-sm text-gray-500'>Created On</h2>
          <h2 className='flex text-sm font-bold items-center gap-3 mt-2'><Calendar /> {moment(interviewDetail?.created_at).format('MMM DD, yyyy')}</h2>
        </div>

        {parsedType.length > 0 &&
          <div>
            <h2 className='text-sm text-gray-500'>Type</h2>
            <h2 className='flex text-sm font-bold items-center gap-3 mt-2'><Clock /> {parsedType[0]}</h2>
          </div>
        }
      </div>

      <div className='mt-4'>
        <h2 className='font-bold'>Job Description</h2>
        <p className='text-sm leading-6'>{interviewDetail?.jobDescription}</p>
      </div>

      <div className='mt-5'>
        <h2 className='font-bold'>Interview Questions</h2>
        <div className='grid grid-col-2 gap-3 mt-3'>
          {parsedQuestions.map((item, index) => (
            <h2 key={index} className='text-xs flex'>{index + 1}. {item?.question}</h2>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InterviewDetail
