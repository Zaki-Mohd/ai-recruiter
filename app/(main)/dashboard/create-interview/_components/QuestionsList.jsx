import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Link, Loader2, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import QuestionlistContainer from './QuestionlistContainer';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid';

function QuestionsList({ formData, onCreateLink }) {
  const [loading, setloading] = useState(true);
  const [questionList, setquestionList] = useState();
  const { user, setUser } = useUser();
  const [saveLoading, setsaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setloading(true);
    try {
      const result = await axios.post('/api/ai-model', {
        ...formData,
      });
      const content = result.data.content;

      // New robust parsing logic
      // Strip markdown fences and any leading/trailing whitespace
      let cleanedString = content.replace(/```json/g, '').replace(/```/g, '').trim();

      // Remove the "interviewQuestions=" part if it exists
      if (cleanedString.startsWith('interviewQuestions=')) {
        cleanedString = cleanedString.substring('interviewQuestions='.length);
      }
      
      try {
        // The string is likely a JS object literal, not strict JSON.
        // We can't use JSON.parse directly.
        // A common issue is unquoted keys. This is a simple way to fix it for this specific structure.
        // It's safer than eval().
        const jsonString = cleanedString.replace(/(\w+):/g, '"$1":').replace(/'/g, '"');
        let parsedData = JSON.parse(jsonString);

        // The result might be an array or an object { interviewQuestions: [...] }
        if (Array.isArray(parsedData)) {
          setquestionList(parsedData);
        } else if (parsedData.interviewQuestions && Array.isArray(parsedData.interviewQuestions)) {
          setquestionList(parsedData.interviewQuestions);
        } else {
          throw new Error('Parsed data is not in the expected format.');
        }
      } catch (e) {
        toast('Parsing Error: Invalid response format from AI.');
        console.error('Parsing failed:', e, content);
        setquestionList([]); // Avoid crashing the UI
      }

      setloading(false);
    } catch (e) {
      toast('Server Error, please try again.');
      setloading(false);
    }
  };

  const onFinish = async () => {
    setsaveLoading(true);
    const interview_id = uuidv4();

    const { data, error } = await supabase
      .from('Interviews')
      .insert([
        {
          ...formData,
          questionList: JSON.stringify(questionList),
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    // User Credits Increment

    const userUpdate = await supabase
      .from('Users')
      .update({ credits: Number(user?.credits) - 1 })
      .eq('email', user?.email)
      .select();

    console.log(userUpdate);
    setUser((prev) => ({ ...prev, credits: Number(user?.credits) - 1 }));

    setsaveLoading(false);
    // console.log(data);
    onCreateLink(interview_id);
  };

  return (
    <div>
      {loading && (
        <div className="p-5 bg-blue-50 rounded-xl border border-primary flex gap-5 items-center">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="font-medium">Generating Interview Questions</h2>
            <p className="text-primary">Our AI is Crafting personalized questions based on your job position</p>
          </div>
        </div>
      )}

      {questionList?.length > 0 && <QuestionlistContainer questionList={questionList} />}
      <div className="flex justify-end mt-10">
        <Button onClick={() => onFinish()} disabled={saveLoading}>
          {saveLoading && <Loader2 className="animate-spin" />}
          Create Interview Link & Finish
        </Button>
      </div>
    </div>
  );
}

export default QuestionsList;
