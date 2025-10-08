"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Clock,
  BarChartBig,
  Scale,
  Zap,
  CheckCircle,
  Menu,
  X,
  Sparkles,
  Users,
  TrendingUp,
  Play,
} from "lucide-react";
import Image from "next/image";

/**
 * Unified Landing Page for AIcruiter
 * - Merged from both hacktoberfest and main branches
 * - Client-only, responsive, and Vercel-ready
 */

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleDashboardClick = () => {
    window.location.href = "/auth";
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50 via-white to-transparent"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-7xl">
          <button onClick={handleDashboardClick} className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AIcruiter</span>
          </button>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection("features")} className="text-gray-600 hover:text-blue-600 transition-colors">Features</button>
            <button onClick={() => scrollToSection("how-it-works")} className="text-gray-600 hover:text-blue-600 transition-colors">How It Works</button>
            <button onClick={() => scrollToSection("pricing")} className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={handleDashboardClick}
              className="hidden md:inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 group"
            >
              <span>Dashboard</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <div className="container mx-auto px-6 py-4 space-y-3">
              <button onClick={() => scrollToSection("features")} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium">Features</button>
              <button onClick={() => scrollToSection("how-it-works")} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium">How It Works</button>
              <button onClick={() => scrollToSection("pricing")} className="block w-full text-left py-2 text-gray-600 hover:text-blue-600 font-medium">Pricing</button>
              <button onClick={handleDashboardClick} className="w-full mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700">
                Dashboard
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-24 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm font-medium text-blue-700">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Recruitment Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Hire Faster, Smarter, and
                <span className="block text-blue-600 mt-2">Without Bias</span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl">
                AIcruiter automates interviews with AI voice agents, providing deep candidate analysis so you can focus on the perfect hire.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleDashboardClick}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={handleDashboardClick}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-gray-900 transition-all hover:border-gray-400 hover:shadow-md"
                >
                  <Play className="mr-2 h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-200 to-purple-200 rounded-3xl blur-2xl opacity-30"></div>
                <div className="relative">
                  <Image
                    src="/dashboard.png"
                    alt="AIcruiter Dashboard Preview"
                    width={1200}
                    height={840}
                    className="rounded-3xl shadow-2xl border border-gray-200/50"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-12 max-w-7xl flex flex-col md:flex-row justify-between items-center gap-4">
          <button onClick={handleDashboardClick} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">AIcruiter</span>
          </button>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} AIcruiter. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
