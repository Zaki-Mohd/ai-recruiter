"use client";
import { useUser } from '@/app/provider';
import React, { useEffect, useState } from 'react';
import { Award, Briefcase, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/services/supabaseClient';

function WelcomeContainer() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalInterviews: 0,
    avgScore: 0,
    hiredCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    setLoading(true);

    const { count: interviewCount, error: interviewError } = await supabase
  .from('interviews')
  .select('*', { count: 'exact', head: true })
  .eq('useremail', user.email);

    const { data: feedbackData, error: feedbackError } = await supabase
  .from('interview-feedback')
  .select('feedback')
  .eq('useremail', user.email);

    // FIX: Check for errors OR if data is null/empty
    if (interviewError || feedbackError || !feedbackData) {
      console.error("Error fetching stats or no data found:", interviewError || feedbackError);
      setLoading(false);
      return;
    }

    let totalScore = 0;
    let hiredCount = 0;
    let ratedInterviews = 0;

    feedbackData.forEach(item => {
      const rating = item.feedback?.feedback?.rating;
      if (rating) {
        const ratings = Object.values(rating).filter(val => typeof val === 'number');
        if (ratings.length > 0) {
          totalScore += ratings.reduce((a, b) => a + b, 0) / ratings.length;
          ratedInterviews++;
        }
      }
      const recommendation = item.feedback?.feedback?.Recommendation;
      if (recommendation && !recommendation.toLowerCase().includes('not')) {
        hiredCount++;
      }
    });

    // If there are no rated interviews, set avgScore to null so UI can show a friendly message
    const avgScore = ratedInterviews > 0 ? Number((totalScore / ratedInterviews).toFixed(1)) : null;

    setStats({
      totalInterviews: interviewCount || 0,
      avgScore: avgScore,
      hiredCount: hiredCount,
    });

    setLoading(false);
  };

  if (loading && stats.totalInterviews === 0) {
    return <div>Loading stats...</div>;
  }

  return (
    <div>
      <h1 className='text-2xl font-bold'>
        Welcome Back, {user?.name?.split(' ')[0] || "User"}!
      </h1>
      <p className='text-gray-500'>Here's a snapshot of your recruiting activity.</p>

      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalInterviews}</div>
            <p className="text-xs text-muted-foreground">Total interviews created</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Candidate Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgScore !== null ? `${stats.avgScore}/10` : 'No ratings yet'}</div>
            <p className="text-xs text-muted-foreground">Across all candidates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired Candidates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hiredCount}</div>
            <p className="text-xs text-muted-foreground">Recommended for hire</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WelcomeContainer;