"use client"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ATSPage = () => {
    const [resume, setResume] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [atsScore, setAtsScore] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [upskillingResources, setUpskillingResources] = useState([]);
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setResumeFile(e.target.files[0]);
    };

    const handleSubmit = async() => {
        if(!jobDescription) {
            toast.error("Job Description is required", {
                description: "Please paste the job description to continue.",
              });
            return;
        }

        setLoading(true);
        let resumeText = resume;

        if (resumeFile) {
            const formData = new FormData();
            formData.append('resume', resumeFile);

            try {
                const response = await fetch('/api/ats/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                if (response.ok) {
                    resumeText = data.resumeText;
                    setResume(data.resumeText);
                } else {
                    console.error('Failed to parse resume:', data.error);
                    toast.error("Failed to parse resume", { description: data.error });
                    setLoading(false);
                    return;
                }
            } catch (error) {
                console.error('Error uploading file:', error);
                toast.error("Error uploading file");
                setLoading(false);
                return;
            }
        }
        
        if (!resumeText) {
            toast.error("Resume is required", {
                description: "Please upload or paste your resume to continue.",
              });
            setLoading(false);
            return;
        }

        await analyzeResume(resumeText);
        setLoading(false);
    }

    const analyzeResume = async (resumeText) => {
        try {
            const response = await fetch('/api/ats/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ resume: resumeText, jobDescription }),
            });
            const data = await response.json();
            if (response.ok) {
                setAtsScore(data.atsScore);
                setRecommendations(data.recommendations);
                setSkills(data.skills);
                setUpskillingResources(data.upskillingResources);
            } else {
                console.error('Failed to analyze resume:', data.error);
                toast.error("Failed to analyze resume", { description: data.error });
            }
        } catch (error) {
            console.error('Error analyzing resume:', error);
            toast.error("Failed to analyze resume");
        }
    };

  return (
    <div className='p-10'>
        <h1 className='text-3xl font-bold'>ATS Score Analyzer</h1>
        <p className='text-gray-500'>Get your resume analyzed and get recommendations to improve it.</p>

        <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
            <div>
                <label className='font-bold text-lg'>Your Resume</label>
                <div className="flex flex-col gap-2 mt-2">
                    <Input type="file" onChange={handleFileChange} />
                    <Textarea className='h-[350px]' placeholder='Or paste your resume here...' onChange={(e) => setResume(e.target.value)} value={resume} />
                </div>
            </div>
            <div>
                <label className='font-bold text-lg'>Job Description <span className='text-red-500'>*</span></label>
                <Textarea className='mt-2 h-[400px]' placeholder='Paste the job description here...' onChange={(e) => setJobDescription(e.target.value)} />
            </div>
        </div>
        <div className='flex justify-center mt-5'>
            <Button onClick={handleSubmit} disabled={loading}>
                {loading && <Loader2 className="animate-spin mr-2" />}
                Analyze
            </Button>
        </div>

        {atsScore && (
            <div className='mt-10 p-5 rounded-lg glassmorphism'>
                <h2 className='text-2xl font-bold mb-5'>Results</h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                    <div className="flex flex-col items-center justify-center">
                        <h3 className='text-xl font-bold'>ATS Score</h3>
                        <div className='w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold mt-2'>
                            {atsScore}%
                        </div>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold'>Recommendations</h3>
                        <ul className='list-disc pl-5 mt-2'>
                            {recommendations.map((rec, index) => <li key={index}>{rec}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold'>Skills to Improve</h3>
                        <ul className='list-disc pl-5 mt-2'>
                            {skills.map((skill, index) => <li key={index}>{skill}</li>)}
                        </ul>
                    </div>
                    <div>
                        <h3 className='text-xl font-bold'>Upskilling Resources</h3>
                        <ul className='list-disc pl-5 mt-2'>
                            {upskillingResources.map((resource, index) => <li key={index}>{resource}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default ATSPage;