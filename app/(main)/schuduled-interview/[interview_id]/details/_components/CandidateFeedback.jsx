import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

function CandidateFeedback({ candidate }) {
  const feedback = candidate?.feedback?.feedback

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='text-primary'>View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div className='mt-5'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-3'>
                  <h2 className='h-10 w-10 flex items-center justify-center bg-primary text-white rounded-full'>
                    {candidate?.userName?.[0] ?? '-'}
                  </h2>
                  <div>
                    <h2>{candidate.userName}</h2>
                    <h2 className='text-sm text-gray-500'>{candidate?.userEmail}</h2>
                  </div>
                </div>
                <div className='flex gap-3 items-center'>
                  <h2 className='text-primary text-2xl font-bold'>{feedback?.rating?.technicalSkills ?? 0}/10</h2>
                </div>
              </div>

              <div className='mt-5'>
                <h2 className='font-bold'>Skills Assessment</h2>
                <div className='mt-3 grid grid-cols-2 gap-10'>
                  <div>
                    <h2 className='flex justify-between'>Technical Skills <span>{feedback?.rating?.technicalSkills ?? 0}/10</span></h2>
                    <Progress value={(feedback?.rating?.technicalSkills ?? 0) * 10} className="mt-1" />
                  </div>
                  <div>
                    <h2 className='flex justify-between'>Communication <span>{feedback?.rating?.communication ?? 0}/10</span></h2>
                    <Progress value={(feedback?.rating?.communication ?? 0) * 10} className="mt-1" />
                  </div>
                  <div>
                    <h2 className='flex justify-between'>Problem Solving <span>{feedback?.rating?.problemSolving ?? 0}/10</span></h2>
                    <Progress value={(feedback?.rating?.problemSolving ?? 0) * 10} className="mt-1" />
                  </div>
                  <div>
                    <h2 className='flex justify-between'>Experience <span>{feedback?.rating?.experience ?? 0}/10</span></h2>
                    <Progress value={(feedback?.rating?.experience ?? 0) * 10} className="mt-1" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h2 className='font-bold'>Performance Summary</h2>
                <div className='p-5 bg-secondary my-3 rounded-md'>
                  {Array.isArray(feedback?.summary) && feedback.summary.map((summery, index) => (
                    <p key={index}>{summery}</p>
                  ))}
                </div>
              </div>

              <div className={`p-5 mt-10 flex items-center justify-between rounded-md ${feedback?.Recommendation === 'No' ? 'bg-red-100' : 'bg-green-100'}`}>
                <div>
                  <h2 className={`font-bold ${feedback?.Recommendation === 'No' ? 'text-red-700' : 'text-green-700'}`}>Recommendation Msg:</h2>
                  <p className={`${feedback?.Recommendation === 'No' ? 'text-red-700' : 'text-green-700'}`}>{feedback?.RecommendationMsg}</p>
                </div>
                <Button className={`${feedback?.Recommendation === 'No' ? 'bg-red-700' : 'bg-green-700'}`}>Send Msg</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CandidateFeedback