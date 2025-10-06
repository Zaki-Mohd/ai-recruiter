"use client";
import Provider from "./provider"; // ✅ same folder
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/provider"; // adjust if needed
import { useEffect, useState } from "react";


export default function Home() {
  const { user } = useUser(); 
  const router = useRouter();
 const [mounted, setMounted] = useState(false);

  
  useEffect(() => {
    setMounted(true);  // ensure rendering only on client
  }, []);


  const handleDashboardClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth");
    }
  };
   if (!mounted) return null;
  return (
    // <Provider>
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <span className="text-xl font-bold">AIcruiter</span>
          </div>
          <div className="space-x-6 hidden md:flex">
            <button onClick={handleDashboardClick} className="text-gray-700 hover:text-black">Features</button>
            <button onClick={handleDashboardClick} className="text-gray-700 hover:text-black">How It Works</button>
            <button onClick={handleDashboardClick} className="text-gray-700 hover:text-black">Pricing</button>
          </div>
          <button
            onClick={handleDashboardClick}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Dashboard
          </button>
        </nav>

        {/* Hero section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-16">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              AI-Powered <span className="text-blue-600">Interview Assistant</span> for Modern Recruiters
            </h1>
            <p className="text-gray-700">
              Let our AI voice agent conduct candidate interviews while you focus on finding the perfect match.
              Save time, reduce bias, and improve your hiring process.
            </p>
            <div className="space-x-4">
              <button onClick={handleDashboardClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Create Interview</button>
              <button onClick={handleDashboardClick} className="border px-4 py-2 rounded hover:bg-gray-100 transition">Watch Demo</button>
            </div>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <Image src="/dashboard.png" alt="Dashboard Preview" width={600} height={400} className="" />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-16 bg-white">
          <h2 className="text-3xl font-bold text-center mb-4">Streamline Your Hiring Process</h2>
          <p className="text-center text-gray-700 mb-8">
            AIcruiter helps you save time and find better candidates with our advanced AI interview technology.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-8">
            <FeatureCard
              icon="/feature1.png"
              title="Save Time"
              description="Automate initial screening interviews and focus on final candidates."
            />
            <FeatureCard
              icon="/feature2.png"
              title="Data-Driven Insights"
              description="Get detailed analytics and candidate comparisons based on interview responses."
            />
            <FeatureCard
              icon="/feature3.png"
              title="Reduce Bias"
              description="Standardized interviews help eliminate unconscious bias in the hiring process."
            />
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-4">How AIcruiter Works</h2>
          <p className="text-center text-gray-700 mb-8">Three simple steps to transform your recruitment process</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-8">
            <StepCard number="1" title="Create Interview" description="Set up your job requirements and customize interview questions." />
            <StepCard number="2" title="Share with Candidates" description="Send interview links to candidates to complete at their convenience." />
            <StepCard number="3" title="Review Results" description="Get AI-analyzed results, transcripts, and candidate comparisons." />
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Hiring Process?</h2>
          <p className="text-gray-700 mb-6">Join hundreds of companies already using AIcruiter to find the best talent.</p>
          <div className="space-x-4">
            <button onClick={handleDashboardClick} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Get Started for Free</button>
            <button onClick={handleDashboardClick} className="border px-4 py-2 rounded hover:bg-gray-100 transition">Schedule a Demo</button>
          </div>
        </section>
      </div>
    // </Provider>
  );
}

// Reusable feature card
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded shadow p-6 text-center w-64">
      <Image src={icon} alt={title} width={48} height={48} className="mx-auto mb-4" />
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

// Reusable step card
function StepCard({ number, title, description }) {
  return (
    <div className="flex flex-col items-center text-center w-64">
      <div className="bg-blue-100 text-blue-700 rounded-full w-12 h-12 flex items-center justify-center mb-4 font-semibold">{number}</div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
