"use client";
import { InterviewDataContext } from '@/context/InterviewDataContext';
import { Loader2Icon, Mic, Phone, Timer } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Vapi from '@vapi-ai/web';
import AlertConfirm from './_components/AlertConfirm';
import { toast } from 'sonner';
import { supabase } from '@/services/supabaseClient';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vapi, setVapi] = useState(null);
  const { interview_id } = useParams();
  const router = useRouter();

  const [resumeData, setResumeData] = useState(null); // State to store resume data

  // Fetch resume data from Supabase
  useEffect(() => {
    const fetchResumeData = async () => {
      if (!interview_id) return; // Don't fetch if interview_id is not available

      const { data, error } = await supabase
        .from('resumes')
        .select('resumeText') // Select the resumeText column
        .eq('id', interview_id) // Filter by the interview_id (which is the resume ID)
        .single(); // Expect a single row

      if (error) {
        console.error('Error fetching resume data:', error);
        toast.error('Failed to load resume data.'); // Show an error toast
      } else if (data) {
        setResumeData(data); // Store the fetched resume data
        console.log('Fetched Resume Data:', data);
      }
    };

    fetchResumeData();
  }, [interview_id]); // Refetch when interview_id changes

  // Initialize Vapi once
  useEffect(() => {
    const instance = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
    setVapi(instance);
    return () => instance.stop();
  }, []);

  // Start interview when info is ready, vapi is ready, and resumeData is ready
  useEffect(() => {
    if (interviewInfo && vapi && resumeData) startCall();
  }, [interviewInfo, vapi, resumeData]); // Add resumeData to dependencies

  const startCall = () => {
    console.log("startCall() called");

    let rawList = interviewInfo?.interviewData?.questionList;

    if (typeof rawList === "string") {
      try {
        rawList = JSON.parse(rawList);
      } catch (e) {
        console.error("Failed to parse questionList JSON:", rawList);
        return;
      }
    }

    if (!Array.isArray(rawList)) {
      console.error("questionList is still not an array:", rawList);
      return;
    }

    const questionList = rawList.map(item => item?.question).filter(Boolean).join(", ");

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.username}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "vapi",
        voiceId: "Neha",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews for the role of ${interviewInfo?.interviewData?.jobPosition || 'a position'}.
Your primary goal is to evaluate the candidate's suitability for this role based on their resume and responses.

Begin with a friendly introduction.

Use the following resume data to formulate specific questions about the candidate's past experience, skills, and projects. Probe deeper into the details provided in the resume.

Resume Data:
---
${resumeData.resumeText}
---

In addition to resume-based questions, ask some of the following general interview questions to assess their broader capabilities:

General Questions: ${questionList}

Listen carefully to the candidate's answers. Evaluate their responses against the information in the resume and the requirements of the ${interviewInfo?.interviewData?.jobPosition || 'position'}. Look for consistency, depth of knowledge, and relevant experience.

Offer hints if the candidate struggles.

Conduct a structured interview covering key aspects of the resume and general interview topics. Aim for a total of 5–7 questions (a mix of resume-based and general questions).

After the questions, wrap up the interview politely and end on a positive note.
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
    console.log("Final conversation:", conversation);
  };

  // Listen for Vapi events
  useEffect(() => {
    if (!vapi) return;

    const handleMessage = (message) => {
      console.log("Vapi message:", message);
      if (message.type === 'model-output' && message.output) {
        setConversation(prev => [...prev, { role: 'assistant', content: message.output }]);
      } else if (message.type === 'voice-input' && message.input) {
        setConversation(prev => [...prev, { role: 'user', content: message.input }]);
      }
    };

    const handleCallStart = () => {
      console.log('Call started');
      toast("Call Connected");
    };

    const handleSpeechStart = () => setActiveUser(false);
    const handleSpeechEnd = () => setActiveUser(true);

    const handleCallEnd = () => {
      console.log('Call ended');
      toast("Interview Ended");
      generateFeedback();
    };

    vapi.on("message", handleMessage);
vapi.on("call-start", handleCallStart);
vapi.on("speech-start", handleSpeechStart);
vapi.on("speech-end", handleSpeechEnd);
vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.off("message", handleMessage);
vapi.off("call-start", handleCallStart);
vapi.off("speech-start", handleSpeechStart);
vapi.off("speech-end", handleSpeechEnd);
vapi.off("call-end", handleCallEnd);
    };
  }, [vapi]);

  const generateFeedback = async () => {
    if (loading) return;
    toast("Generating feedback... This might take a few seconds.");
    setLoading(true);

    try {
      const result = await axios.post('/api/ai-feedback', { conversation });
      const content = result?.data?.content;
      const finalContent = content.replace('```json', '').replace('```', '');

      const { data } = await supabase.from('interview-feedback').insert([{
        userName: interviewInfo?.username,
        userEmail: interviewInfo?.userEmail,
        interview_id: interview_id,
        feedback: JSON.parse(finalContent),
        recommended: false,
      }]);

      console.log(data);
      router.replace('/interview/' + interview_id + '/completed');
    } catch (error) {
      console.error("Feedback generation failed:", error);
      toast("Failed to generate feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-20 lg:px-48 xl:px-56'>
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
