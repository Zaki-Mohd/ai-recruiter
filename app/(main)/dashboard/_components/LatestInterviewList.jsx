"use client";
import { useUser } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InterviewCard from './InterviewCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Ensure you have these from ShadCN

function LatestInterviewList() {
  const [inteviewlist, setinteviewlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getInterviewList();
    } else {
      setLoading(false);
      setinteviewlist([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const getInterviewList = async () => {
    setLoading(true);
    setFetchError(null);

    try {
      // Connectivity/permissions test: minimal select
      const { data: testData, error: testError } = await supabase.from('interviews').select('id').limit(1);
      console.debug('Supabase connectivity test:', { testData, testError });
      if (testError) {
        console.error('Supabase connectivity test failed:', testError);
        setFetchError(testError);
        setinteviewlist([]);
        setLoading(false);
        return;
      }

      // Primary query: filter by user email
      const { data: interviews, error } = await supabase
        .from('interviews')
        .select('*')
        // Postgres lowercases unquoted identifiers; use 'useremail' column
        .eq('useremail', user?.email)
        .order('id', { ascending: false })
        .limit(5);

      console.debug('Supabase response for interviews:', { interviews, error });

      if (error) {
        // Try a fallback: unfiltered select to see if the issue is with RLS or column name
        console.warn('Filtered query failed, attempting unfiltered check:', error);
        const { data: fallbackData, error: fallbackError } = await supabase.from('interviews').select('*').limit(5);
        console.debug('Supabase fallback response:', { fallbackData, fallbackError });

        setFetchError(error || fallbackError || { message: 'Unknown Supabase error' });
        setinteviewlist([]);
      } else {
        setinteviewlist(interviews || []);
      }
    } catch (ex) {
      console.error('Caught exception fetching recent interviews:', ex);
      setFetchError(ex);
      setinteviewlist([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Recent Interviews</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-40">
          <p>Loading recent interviews...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        {fetchError ? (
          <div className="flex flex-col items-center text-center p-4 space-y-3">
            <p className="text-sm text-red-500 font-medium">Error fetching recent interviews.</p>
            <pre className="text-xs text-left bg-gray-50 p-2 rounded w-full overflow-auto" style={{ maxHeight: 120 }}>
              {String(fetchError?.message || JSON.stringify(fetchError))}
            </pre>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={getInterviewList}>Retry</Button>
            </div>
          </div>
        ) : inteviewlist.length === 0 ? (
          <div className="flex flex-col items-center text-center p-4">
            <Video className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">You haven't created any interviews yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {inteviewlist.map((interview, index) => (
              <InterviewCard interview={interview} key={index} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LatestInterviewList;