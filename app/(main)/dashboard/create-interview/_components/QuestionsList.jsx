import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Link, Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionlistContainer from './QuestionlistContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import {v4 as uuidv4} from 'uuid';

function QuestionsList({formData, onCreateLink}) {

  const [loading, setloading] = useState(true) 
  const [questionList, setquestionList] = useState();
  const {user} = useUser();
  const [saveLoading, setsaveLoading] = useState(false);

    useEffect(()=>{
        if(formData){
            GenerateQuestionList();
        }
    },[formData])

    const GenerateQuestionList=async()=> {

      setloading(true)
      try{

      
                      const result = await axios.post('/api/ai-model',{...formData})  
                      console.log(result.data.content);
                      const content = result.data.content

                      const matched = content.match(/```json([\s\S]*?)```/);
                      const jsonString = matched ? matched[1].trim() : content;

                      try {
                        setquestionList(JSON.parse(jsonString));
                      } catch (e) {
                        // clearer parsing error
                        toast.error('Parsing Error: Invalid response format');
                        console.error("Parsing failed:", e, jsonString);
                      }

                      setloading(false);
                    }
                    catch(e){
                       // surface server/axios error details so user sees reason
                           const serverMsg = e?.response?.data || e?.message || String(e);
                           console.error('AI generation error:', serverMsg, e);

                           // If the failure mentions credits (or similar billing block), don't permanently block the flow.
                           // Provide a small fallback default question list so the user can continue creating the interview.
                           const serverMsgString = typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg);
                           if (/credit/i.test(serverMsgString) || /please add/i.test(serverMsgString)) {
                             toast.warning('AI generation unavailable due to billing/credits — using default questions so you can continue.');
                             const defaultQuestions = [
                               { question: 'Tell me about yourself and your background.', type: 'intro' },
                               { question: 'Why are you interested in this role?', type: 'behavioral' },
                               { question: 'Describe a challenging technical problem you solved.', type: 'technical' },
                               { question: 'How do you approach debugging a production issue?', type: 'technical' },
                               { question: 'Tell us about a time you worked on a team project.', type: 'behavioral' },
                               { question: 'How do you prioritize tasks under tight deadlines?', type: 'behavioral' },
                               { question: 'Explain a design decision you made and why.', type: 'technical' },
                               { question: 'How do you stay current with new technologies?', type: 'culture' },
                               { question: 'Describe a time you received critical feedback and how you responded.', type: 'behavioral' },
                               { question: 'Do you have any questions for us?', type: 'closing' },
                             ];
                             setquestionList(defaultQuestions);
                             setloading(false);
                             return;
                           }

                           // Generic error handling for other errors
                           toast.error('Server Error: ' + (typeof serverMsg === 'string' ? serverMsg : JSON.stringify(serverMsg)));
                           setloading(false)
                    }
    }

   // replace onFinish with robust handling and column normalization
   const onFinish = async () => {
    setsaveLoading(true);
    const interview_id = uuidv4();

    try {
      // Map the client-side camelCase formData keys to the lowercase column names
      // that exist in Postgres (unquoted identifiers are lowercased).
      // Only send lowercase column names to match Postgres unquoted identifiers
      const payload = {
        jobposition: formData?.jobPosition || null,
        jobdescription: formData?.jobDescription || null,
        questionlist: JSON.stringify(questionList),
        useremail: user?.email || null,
        interview_id: interview_id,
        duration: formData?.duration || null,
        type: formData?.type || null,
      };

      const { data, error } = await supabase.from('interviews').insert([payload]).select();

      if (error) {
        console.error('Insert interview error:', error);
        toast.error('Failed to create interview: ' + (error.message || JSON.stringify(error)));
        setsaveLoading(false);
        return;
      }

      // decrement user credits but do not fail the whole flow if this errors
      const { data: userData, error: userError } = await supabase
        .from('users')
        .update({ credits: Math.max(0, Number(user?.credits || 0) - 1) })
        .eq('email', user?.email)
        .select();

      if (userError) {
        console.error('Failed to decrement credits:', userError);
        toast.error('Interview created but failed to update credits: ' + (userError.message || JSON.stringify(userError)));
      }

      setsaveLoading(false);
      onCreateLink(interview_id);
    } catch (e) {
      console.error('Unexpected error in onFinish:', e);
      toast.error('Server Error: ' + (e?.message || String(e)));
      setsaveLoading(false);
    }

   }

  return (
    <div>
      {loading && <div className='p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center'>
        
        <Loader2Icon className='animate-spin'/>
        <div>
          <h2 className='font-medium'>Generating Interview Questions</h2>
          <p className='text-primary'>Our AI is Crafting personalized questions based on your job position </p>
        </div>


         


        </div>
        }

         {
            questionList?.length>0 && <QuestionlistContainer questionList ={questionList} />
            // <div className='p-5 border border-gray-300 rounded-xl'>
            //   {
            //     questionList.map((item,index)=>(
            //       <div key={index} className='p-3 border border-gray-200 rounded-x1 mb-3'>
            //           <h2 className='font-medium'>{item.question}</h2>
            //           <h2 className='text-primary text-sm'>Type: {item?.type}</h2>
            //       </div>
            //     ))
            //   }

            // </div>
          }
          <div className='flex justify-end mt-10'>
            
            <Button onClick={()=>onFinish()} disabled={saveLoading}>
              
              {saveLoading && <Loader2 className='animate-spin'/>}


              Create Interview Link & Finish</Button>

          </div>
    </div>
  )
}

export default QuestionsList