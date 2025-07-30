"use client";
import React, { useState, useRef } from 'react'; // Import useRef

function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [interviewLink, setInterviewLink] = useState(null);

  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleFileChange = (event) => {
    console.log('handleFileChange triggered'); // Log when the function is called
    console.log('Event target files:', event.target.files); // Log the files object

    if (event.target.files && event.target.files.length > 0) {
      console.log('File selected:', event.target.files[0]); // Log the selected file
      setSelectedFile(event.target.files[0]);
      setUploadStatus(''); // Clear status when a new file is selected
      setInterviewLink(null); // Clear previous link
    } else {
      console.log('No file selected'); // Log if no file is selected
      setSelectedFile(null);
    }
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

  // Function to trigger the file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <div 
        className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-blue-500"
        onClick={triggerFileInput} // Trigger file input on click
      >
        {/* Hidden file input */}
        <input 
          type="file" 
          accept=".pdf,.doc,.docx" 
          onChange={handleFileChange} 
          className="hidden" // Hide the input
          ref={fileInputRef} // Assign the ref
        />
        
        {/* Display text based on whether a file is selected */}
        {selectedFile ? (
          <p>Selected file: {selectedFile.name}</p>
        ) : (
          <p>Drag and drop a resume here, or click to select a file (PDF or DOCX)</p>
        )}

      </div>

      <div className="flex justify-center mt-4">
        <button 
            onClick={handleUpload} 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={!selectedFile || uploadStatus === 'Uploading...'} // Disable if no file selected or uploading
          >
            {uploadStatus === 'Uploading...' ? 'Uploading...' : 'Upload Resume'}
          </button>
      </div>

      {uploadStatus && <p className="mt-4 text-center text-blue-600">{uploadStatus}</p>}
      {interviewLink && (
        <div className="mt-4 text-center">
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
  );
}

export default ResumeUpload;