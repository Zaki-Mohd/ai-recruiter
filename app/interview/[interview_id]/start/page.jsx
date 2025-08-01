"use client";
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import AlertConfirm from './_components/AlertConfirm';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';

function StartInterview() {
  const [interviewInfo, setInterviewInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [vapi, setVapi] = useState(null);
  const { interview_id } = useParams();
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isResumeInterview, setIsResumeInterview] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);

  useEffect(() => {
    const fetchInterviewData = async () => {
      if (!interview_id) return;
      setLoading(true);

      const { data: interviewDetails, error: interviewError } = await supabase
        .from('Interviews')
        .select('*')
        .eq('interview_id', interview_id)
        .single();

      if (interviewError) {
        toast.error('Interview not found.');
        setLoading(false);
        router.push('/');
        return;
      }

      let candidateName = 'Candidate';
      const { data: feedbackData } = await supabase
        .from('interview-feedback')
        .select('userName')
        .eq('interview_id', interview_id);
      
      if (feedbackData && feedbackData.length > 0) {
        candidateName = feedbackData[0].userName;
      }

      const finalInterviewInfo = {
        ...interviewDetails,
        username: candidateName
      };
      setInterviewInfo(finalInterviewInfo);
      
      const durationInMinutes = parseInt(finalInterviewInfo.duration, 10) || 5;
      setTimeLeft(durationInMinutes * 60);

      const isResumeType = finalInterviewInfo.type === 'resume-based';
      
      if (isResumeType) {
        setIsResumeInterview(true);
        const { data: resume, error: resumeError } = await supabase
          .from('resumes')
          .select('resumeText')
          .eq('interview_id', interview_id)
          .single();


        
        if (resumeError) {
          toast.error('Could not load the resume for this interview.');
        } else {
          setResumeData(resume);
        }
      } else {
        setIsResumeInterview(false);
      }
      setLoading(false);
    };

    fetchInterviewData();
  }, [interview_id, router]);

  useEffect(() => {
    if (isCallActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime > 0 ? prevTime - 1 : 0);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isCallActive) {
      stopInterview();
    }
  }, [timeLeft, isCallActive]);

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const instance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    setVapi(instance);
    return () => instance.stop();
  }, []);

  useEffect(() => {
    if (loading || !vapi || !interviewInfo || isCallActive) {
      return;
    }
    
    if (isResumeInterview && !resumeData) {
      return;
    }

    startCall();
  }, [interviewInfo, vapi, resumeData, loading, isResumeInterview, isCallActive]);

  const startCall = () => {
    let systemContent = '';
    let firstMessage = '';
    const interviewData = interviewInfo || {};

    if (isResumeInterview) {
      systemContent = `
You are an AI voice assistant conducting a professional job interview.
Your primary goal is to evaluate the candidate based on the resume provided.
**Candidate's Resume:**
---
${resumeData.resumeText}
---
**Your Task:**
1. Start with a friendly introduction for the role of ${interviewData.jobPosition}.
2. Ask insightful questions directly related to the candidate's experience, projects, and skills listed in their resume.
3. Maintain a professional and encouraging tone.
      `.trim();
      firstMessage = `Hi ${interviewInfo.username}, thank you for providing your resume. Are you ready to begin your interview for the ${interviewData.jobPosition}?`;
    } else {
      let rawList = interviewData.questionList;
      
      if (typeof rawList === 'string') {
        try {
          rawList = JSON.parse(rawList);
        } catch (e) {
          console.error("Failed to parse questionList JSON:", e);
          rawList = [];
        }
      }

      const questionList = (Array.isArray(rawList) ? rawList : [])
        .map(item => item?.question)
        .filter(Boolean)
        .join(" - ");
      
      if (!questionList) {
        toast.error("Could not load interview questions. The list is empty.");
        console.error("Aborting startCall because questionList is empty. Check data format in Supabase.");
        return;
      }

      systemContent = `
You are an AI voice assistant conducting a job interview for the position of ${interviewData.jobPosition}.
Your task is to ask the candidate the following questions one by one.
**Interview Questions:**
- ${questionList}
      `.trim();
      firstMessage = `Hi ${interviewInfo.username}, welcome to your interview for the ${interviewData.jobPosition} role. Shall we begin with the first question?`;
    }

    const assistantOptions = {
        name: "AI Recruiter",
        firstMessage,
        transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
        voice: { provider: "vapi", voiceId: "Neha" },
        model: {
          provider: "openai",
          model: "gpt-4",
          messages: [{ role: "system", content: systemContent }],
        },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    setIsCallActive(false);
    vapi?.stop();
  };




  useEffect(() => {
    if (!vapi) return;
    const handleCallStart = () => { 
        toast("Call Connected"); 
        setIsCallActive(true); 
    };
    const handleCallEnd = () => { 
        toast("Interview Ended"); 

        setIsCallActive(false); 
    };
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("call-end", handleCallEnd);
    };
  }, [vapi]);

  
    



  if (loading) {
    return <div className="p-10 flex justify-center items-center h-screen"><Loader2Icon className="animate-spin h-8 w-8" /> <span className="ml-2">Loading Interview...</span></div>;
  }

  return (
    <div className='p-5 md:p-10 lg:p-20 bg-gray-50 min-h-screen'>
        <div className='max-w-7xl mx-auto'>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-8 gap-4'>
                <h2 className='font-bold text-2xl text-gray-800'>AI Interview Session</h2>
                <span className='flex gap-2 items-center bg-red-500 text-white px-4 py-2 rounded-full shadow-lg'>
                    <Timer size={20} /> <span className='font-mono text-lg font-semibold tracking-wider'>{formatTime(timeLeft)}</span>
                </span>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-10">
                {/* AI Panel */}
                <div className="w-full md:w-1/2 lg:w-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center justify-center p-6 gap-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <Image src={'/ai.png'} width={120} height={120} alt='AI Recruiter' className='rounded-full object-cover border-4 border-indigo-200 p-1' />
                    <h2 className='font-semibold text-gray-700 text-2xl'>AI Recruiter</h2>
                    <div className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full'>
                      <div className={`w-3 h-3 rounded-full transition-colors ${isCallActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                      <span className='text-sm text-gray-600 font-medium'>{isCallActive ? 'Active' : 'Not Connected'}</span>
                    </div>
                </div>
                {/* Candidate Panel */}
                <div className="w-full md:w-1/2 lg:w-[450px] bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col items-center justify-center p-6 gap-5 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                    <div className='bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center w-32 h-32 rounded-full shadow-lg'>
                        <span className='text-6xl font-extrabold'>
                            {interviewInfo?.username ? interviewInfo.username[0].toUpperCase() : 'C'}
                        </span>
                    </div>
                    <h2 className='font-semibold text-gray-700 text-2xl'>{interviewInfo?.username || 'Candidate'}</h2>
                </div>
            </div>

            <div className='flex items-center gap-8 justify-center mt-12'>
                <div className='p-4 bg-gray-200 rounded-full cursor-not-allowed'>
                    <Mic className='h-12 w-12 text-gray-400' />
                </div>
                {/* This is the corrected usage that prevents the error */}
                <AlertConfirm onConfirm={stopInterview}>
                    <div className='p-5 bg-red-500 hover:bg-red-600 transition-colors rounded-full cursor-pointer shadow-lg hover:shadow-xl'>
                        <Phone className='h-12 w-12 text-white' />
                    </div>
                </AlertConfirm>
            </div>
        </div>
    </div>
  );
}

export default StartInterview;