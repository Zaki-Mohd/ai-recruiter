import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedback from './CandidateFeedback'

function CandidateList({ candidatelist }) {
  return (
    <div className='bg-gray-100 rounded-xl px-5 py-5 mt-7'>
      <h2 className='font-bold my-5'>Candidates ({candidatelist?.length ?? 0})</h2>
      {candidatelist?.map((candidate, index) => (
        <div key={index} className='p-5 flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3'>
            <h2 className='h-10 w-10 flex items-center justify-center bg-primary text-white rounded-full'>
              {candidate?.userName?.[0] ?? '-'}
            </h2>
            <div>
              <h2>{candidate?.userName}</h2>
              <h2 className='text-sm text-gray-500'>
                Completed On: {moment(candidate?.created_at).format('MMM DD, yyyy')}
              </h2>
            </div>
          </div>
          <div className='flex gap-3 items-center'>
            <h2 className='text-green-600'>{candidate?.feedback?.feedback?.rating?.technicalSkills ?? 0}/10</h2>
            <CandidateFeedback candidate={candidate} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CandidateList
