import { Phone, Video, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Standard Interview */}
      <Link
        href="/dashboard/create-interview"
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-gray-800/50 transition-shadow duration-200 ease-in-out"
      >
        <Video className="p-3 text-primary bg-blue-50 dark:bg-blue-950 rounded-lg h-12 w-12" />
        <h2 className="font-bold text-gray-900 dark:text-gray-100 mt-3">
          Create New Interview (Standard)
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create a standard AI Interview and schedule with candidates
        </p>
      </Link>

      {/* Resume-Based Interview */}
      <Link
        href="/resume-upload"
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-gray-800/50 transition-shadow duration-200 ease-in-out"
      >
        <FileText className="p-3 text-primary bg-blue-50 dark:bg-blue-950 rounded-lg h-12 w-12" />
        <h2 className="font-bold text-gray-900 dark:text-gray-100 mt-3">
          Start Resume-Based Interview
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Upload a resume to start an AI interview tailored to their experience
        </p>
      </Link>
    </div>
  );
}

export default CreateOptions;
