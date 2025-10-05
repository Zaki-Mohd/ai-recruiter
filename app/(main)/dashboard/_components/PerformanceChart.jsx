"use client"
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Placeholder data
const data = [
  { name: 'Jan', score: 6.5 },
  { name: 'Feb', score: 7.2 },
  { name: 'Mar', score: 7.8 },
  { name: 'Apr', score: 8.1 },
  { name: 'May', score: 8.5 },
  { name: 'Jun', score: 7.9 },
];

function PerformanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Performance Trends</CardTitle>
        <CardDescription>Average scores over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
<Line 
  type="monotone" 
  dataKey="score" 
  stroke="#8884d8" 
  strokeWidth={2} 
  animationDuration={1500} 
/>          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PerformanceChart;