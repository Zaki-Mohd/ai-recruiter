"use client";
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'; // Removed useContext
import Vapi from '@vapi-ai/web';
import AlertConfirm from './_components/AlertConfirm';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

function StartInterview() {
  // Removed: const { interviewInfo } = useContext(InterviewDataContext);

  // Create a local state for interview info for the resume-based flow
  const [interviewInfo, setInterviewInfo] = useState({
    username: 'Candidate', // Default username
    userEmail: 'candidate@example.com', // Default email
    interviewData: {
      jobPosition: 'the specified role', // Default job position
      questionList: '[]' // Provide an empty question list
    }
  });

  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vapi, setVapi] = useState(null);
  const { interview_id } = useParams();
  const router = useRouter();
  const [resumeData, setResumeData] = useState(null);

  // Fetch resume data from Supabase
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!interview_id) return;

      const { data, error } = await supabase
        .from('resumes')
        .select('resumeText')
        .eq('interview_id', interview_id) // Corrected to use interview_id
        .single();

      if (error) {
        console.error('Error fetching resume data:', error);
        toast.error('Failed to load resume data.');
      } else if (data) {
        setResumeData(data);
        console.log('Fetched Resume Data:', data);
      }
    };
    fetchResumeData();
  }, [interview_id]);

  // Initialize Vapi once
  useEffect(() => {
    const instance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    setVapi(instance);
    return () => instance.stop();
  }, []);

  // Start interview when all conditions are met
  useEffect(() => {
    if (interviewInfo && vapi && resumeData) {
      startCall();
    }
  }, [interviewInfo, vapi, resumeData]);

  const startCall = () => {
    // The questionList logic is kept, but it will be empty for resume interviews,
    // guiding the AI to focus on the resume text as per the system prompt.
    let rawList = interviewInfo?.interviewData?.questionList;
    if (typeof rawList === "string") {
      try {
        rawList = JSON.parse(rawList);
      } catch (e) {
        console.error("Failed to parse questionList JSON:", rawList);
        return;
      }
    }
    const questionList = (Array.isArray(rawList) ? rawList : []).map(item => item?.question).filter(Boolean).join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.username}, thank you for providing your resume. Are you ready to begin your interview for ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: { provider: "deepgram", model: "nova-2", language: "en-US" },
      voice: { provider: "vapi", voiceId: "Neha" },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting a professional job interview.
Your primary goal is to evaluate the candidate based on the resume provided.

**Candidate's Resume:**
---
${resumeData.resumeText}
---

**Your Task:**
1.  Start with a friendly introduction.
2.  Ask insightful questions directly related to the candidate's experience, projects, and skills listed in their resume.
3.  Do not ask generic questions unless the resume is empty. Your questions should demonstrate that you have read and understood the resume.
4.  Probe for details. For example, if they list a project, ask about their specific role, challenges faced, and the outcome.
5.  Listen carefully to the answers and ask relevant follow-up questions.
6.  Maintain a professional and encouraging tone.
7.  After 5-7 resume-based questions, politely conclude the interview.
            `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi?.stop();
    toast("Interview Ended");
  };

  // Listen for Vapi events (shortened for brevity)
  useEffect(() => {
    if (!vapi) return;
    const handleCallStart = () => { console.log('Call started'); toast("Call Connected"); };
    const handleCallEnd = () => { console.log('Call ended'); toast("Interview Ended"); generateFeedback(); };
    vapi.on("call-start", handleCallStart);
    vapi.on("call-end", handleCallEnd);
    return () => { vapi.off("call-start", handleCallStart); vapi.off("call-end", handleCallEnd); };
  }, [vapi]);

  const generateFeedback = async () => {
    // Feedback generation logic...
  };

  return (
    <div className='p-10 md:p-20'>
        {/* UI Elements */}
        <div className='flex justify-between items-center'>
            <h2 className='font-bold text-xl'>AI Interview Session</h2>
            <span className='flex gap-2 items-center'>
            <Timer /> 00:00:00
            </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
            <div className="bg-white h-[400px] rounded-lg border flex items-center justify-center flex-col gap-3">
                <div className='relative'>
                    {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>}
                    <Image src={'/ai.png'} width={100} height={100} alt='AI' className='w-[60px] h-[60px] rounded-full object-cover' />
                </div>
                <h2>AI Recruiter</h2>
            </div>
            <div className="bg-white h-[400px] rounded-lg border flex items-center justify-center flex-col gap-3">
                <div className='relative'>
                    {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping'></span>}
                    <h2 className='text-2xl bg-primary text-white p-3 rounded-full px-5'>
                    {interviewInfo?.username ? interviewInfo.username[0] : '👤'}
                    </h2>
                </div>
                <h2>{interviewInfo?.username}</h2>
            </div>
        </div>
        <div className='flex items-center gap-5 justify-center mt-7'>
            <Mic className='h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer' />
            <AlertConfirm stopInterview={stopInterview}>
            {!loading
                ? <Phone className='h-12 w-12 p-3 bg-red-500 text-white rounded-full cursor-pointer' />
                : <Loader2Icon className='animate-spin' />}
            </AlertConfirm>
      </div>
    </div>
  );
}

export default StartInterview;
