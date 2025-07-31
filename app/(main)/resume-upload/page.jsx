"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Loader2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ResumeUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            toast.error("No file selected", {
                description: "Please select a resume file to upload.",
            });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('resume', selectedFile);

        try {
            const response = await fetch('/api/resume/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Resume uploaded successfully!", {
                    description: `An interview has been created. Redirecting you to the interview page...`,
                });
                router.push(data.interviewLink);
            } else {
                toast.error("Upload failed", {
                    description: data.error || "An unknown error occurred.",
                });
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error("Upload error", {
                description: "There was a problem with the upload process.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl font-bold">Upload Your Resume</h1>
            <p className="text-gray-500 mt-2">
                Upload a DOCX or PDF file to start a new resume-based interview.
            </p>

            <div className="mt-8 p-8 border-2 border-dashed rounded-lg w-full max-w-md glassmorphism">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Upload className="w-16 h-16 text-gray-400" />
                    <Input
                        type="file"
                        onChange={handleFileChange}
                        className="file:text-primary file:font-bold"
                        accept=".pdf,.docx"
                    />
                    {selectedFile && <p className="text-sm text-gray-400">Selected file: {selectedFile.name}</p>}
                </div>
            </div>

            <Button
                onClick={handleUpload}
                disabled={loading || !selectedFile}
                className="mt-6"
            >
                {loading && <Loader2 className="animate-spin mr-2" />}
                {loading ? "Analyzing..." : "Start Interview"}
            </Button>
        </div>
    );
};

export default ResumeUploadPage;