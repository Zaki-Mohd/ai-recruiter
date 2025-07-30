"use client";
import React, { useState } from 'react';

function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [interviewLink, setInterviewLink] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus(''); // Clear status when a new file is selected
    setInterviewLink(null); // Clear previous link
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first!');
      return;
    }

    setUploadStatus('Uploading...');
    setInterviewLink(null); // Clear previous link

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`File uploaded successfully!`);
        setInterviewLink(result.interviewLink); // Set the generated link
        console.log('Upload successful:', result);
      } else {
        setUploadStatus(`Upload failed: ${result.error}`);
        setInterviewLink(null); // Clear link on failure
        console.error('Upload failed:', result);
      }
    } catch (error) {
      setUploadStatus(`An error occurred during upload: ${error.message}`);
      setInterviewLink(null); // Clear link on error
      console.error('Upload error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8">
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          onChange={handleFileChange} 
          className="mb-4"
        />
        <button 
          onClick={handleUpload} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={uploadStatus === 'Uploading...'}
        >
          {uploadStatus === 'Uploading...' ? 'Uploading...' : 'Upload Resume'}
        </button>
        {selectedFile && <p className="mt-2">Selected file: {selectedFile.name}</p>}
        {uploadStatus && <p className="mt-2 text-blue-600">{uploadStatus}</p>}
        {interviewLink && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Your Interview Link:</h2>
            <a 
              href={interviewLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              {interviewLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUpload;