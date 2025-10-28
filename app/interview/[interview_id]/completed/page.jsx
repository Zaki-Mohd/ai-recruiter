"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const handleCloseBrowser = () => {
    window.open('', '_self'); // some browsers
    window.close();
  };

  return (
   <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* Thank‑you Image */}
      <Image
        src="/thankyou.png" 
        alt="Thank you illustration"
        width={300}
        height={300}
        className="mb-6"
      />

      <h1 className="text-4xl font-extrabold text-center mb-4 text-gray-900 dark:text-white">
        Thank you for attending the interview!
      </h1>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-lg mb-8">
        Our AIcruiter team appreciates your time and wishes you the best. We’re here to help you succeed.
      </p>
      <button
        onClick={handleCloseBrowser}
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
      >
        Close Browser
      </button>
    </div>
  );
}
