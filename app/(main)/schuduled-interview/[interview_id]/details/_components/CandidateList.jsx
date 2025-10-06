import { Button } from '@/components/ui/button'
import moment from 'moment'
import React from 'react'
import CandidateFeedback from './CandidateFeedback'

// Utility function to determine score color based on rating
const getScoreColor = (score) => {
  if (score >= 7) return 'text-green-600'; // High score - Green
  if (score >= 4) return 'text-yellow-600'; // Average score - Yellow
  return 'text-red-600'; // Low score - Red
};

function CandidateList({ candidatelist }) {
  return (
    <div className='bg-gray-100 rounded-xl px-5 py-5 mt-7'>
      <h2 className='font-bold my-5'>Candidates ({candidatelist?.length ?? 0})</h2>
      {candidatelist?.map((candidate, index) => {
        // Try both possible property names for technical skills
        const technicalScore = candidate?.feedback?.feedback?.rating?.TechnicalSkills ?? 
                              candidate?.feedback?.feedback?.rating?.technicalSkills ?? 0;
        return (
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
              <h2 className={getScoreColor(technicalScore)}>{technicalScore}/10</h2>
              <CandidateFeedback candidate={candidate} />
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default CandidateList
