"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useUser } from '@/app/provider';
import { supabase } from '@/services/supabaseClient';
import moment from 'moment';

function PerformanceChart() {
  const { user } = useUser();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPerformanceData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchPerformanceData = async () => {
    setLoading(true);

    const { data: feedbackData, error } = await supabase
      .from('interview-feedback')
      .select('created_at, feedback')
      // Postgres lowercases unquoted identifiers; use 'useremail' column
      .eq('useremail', user.email);

    // FIX: Check for errors OR if data is null/empty
    if (error || !feedbackData) {
      console.error("Error fetching performance data or no data found:", error);
      setChartData([]); // Set to empty array if no data
      setLoading(false);
      return;
    }

    const monthlyScores = {};

    feedbackData.forEach(item => {
      const month = moment(item.created_at).format('MMM YY');
      // Prefer an overallScore if provided, otherwise compute average of rating fields
      const overall = item.feedback?.feedback?.overallScore;
      let avgRating = null;

      if (typeof overall === 'number') {
        avgRating = overall;
      } else {
        const rating = item.feedback?.feedback?.rating;
        if (rating) {
          const ratings = Object.values(rating).filter(val => typeof val === 'number');
          if (ratings.length > 0) {
            avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;
          }
        }
      }

      if (avgRating !== null) {
        if (!monthlyScores[month]) {
          monthlyScores[month] = { totalScore: 0, count: 0, date: moment(item.created_at).startOf('month').toDate() };
        }
        monthlyScores[month].totalScore += avgRating;
        monthlyScores[month].count++;
      }
    });
    
    const formattedData = Object.keys(monthlyScores).map(month => ({
      name: month,
      score: (monthlyScores[month].totalScore / monthlyScores[month].count).toFixed(1),
      date: monthlyScores[month].date,
    })).sort((a, b) => a.date - b.date);

    setChartData(formattedData);
    setLoading(false);
  };
  
  if (loading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Candidate Performance Trends</CardTitle>
          <CardDescription>Loading chart data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <p>Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Candidate Performance Trends</CardTitle>
        <CardDescription>Average scores over time</CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 10]}/>
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8884d8" 
                strokeWidth={2} 
                animationDuration={1500} 
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <p className="text-gray-500">No performance data yet. Complete an interview to see your stats!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default PerformanceChart;