"use client";
import { useUser } from '@/app/provider';
import React from 'react';
import { Award, Briefcase, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function WelcomeContainer() {
  const { user } = useUser();

  return (
    <div>
      <h1 className='text-2xl font-bold'>
        Welcome Back, {user?.name?.split(' ')[0] || "User"}!
      </h1>
      <p className='text-gray-500'>Here's a snapshot of your recruiting activity.</p>

      <div className="grid gap-4 md:grid-cols-3 mt-4">
        <Card className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Candidate Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2/10</div>
            <p className="text-xs text-muted-foreground">-0.5 from last month</p>
          </CardContent>
        </Card>
        <Card className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired Candidates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default WelcomeContainer;