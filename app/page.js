"use client";
import { useState, useEffect } from "react";
import { ArrowRight, BrainCircuit, Clock, BarChartBig, Scale, Zap, CheckCircle, Menu, X, Sparkles, Users, TrendingUp, Play, MessageSquare, FileText, Award, Linkedin, Facebook, Instagram, Youtube, Github } from "lucide-react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function ProfessionalLandingPage() {
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Subtle Background Gradient */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-blue-50 via-white to-transparent dark:from-gray-800 dark:via-gray-900 dark:to-transparent"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-100 dark:bg-blue-900 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-40 left-10 w-80 h-80 bg-purple-100 dark:bg-purple-900 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Enhanced Professional Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/60 dark:border-gray-700/60 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-sm">
        <div className="container mx-auto flex h-18 items-center justify-between px-6 max-w-7xl">
          {/* Logo Section */}
          <button 
            onClick={handleDashboardClick} 
            className="flex items-center gap-3 group transition-all duration-200 hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/25 group-hover:from-blue-500 group-hover:via-blue-400 group-hover:to-blue-600 transition-all duration-300">
              <BrainCircuit className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
              AIcruiter
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Features', id: 'features' },
              { label: 'How It Works', id: 'how-it-works' },
              { label: 'Pricing', id: 'pricing' }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)} 
                className="relative px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 rounded-lg hover:bg-blue-50/50 dark:hover:bg-blue-900/50 group"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
              </button>
            ))}
          </nav>

          {/* CTA Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleDashboardClick}
              className="hidden md:inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 group"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/60 dark:border-gray-700/60 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-xl">
            <div className="container mx-auto px-6 py-6 space-y-1">
              {[
                { label: 'Features', id: 'features' },
                { label: 'How It Works', id: 'how-it-works' },
                { label: 'Pricing', id: 'pricing' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)} 
                  className="block w-full text-left py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/50 font-medium rounded-lg transition-all duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                <button
                  onClick={handleDashboardClick}
                  className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg transition-all duration-300 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-20 pb-24 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/50 border border-blue-200 dark:border-blue-800 rounded-full text-sm font-medium text-blue-700 dark:text-blue-300">
                <Sparkles className="w-4 h-4" />
                <span>AI-Powered Recruitment Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 leading-tight">
                Hire Faster, Smarter, and
                <span className="block text-blue-600 dark:text-blue-400 mt-2">Without Bias</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
                AIcruiter automates initial screening interviews with AI voice agents, providing deep candidate analysis so you can focus on finding the perfect match.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleDashboardClick}
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 group"
                >
                  <span>Get Started for Free</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={handleDashboardClick}
                  className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-8 py-4 font-semibold text-gray-900 dark:text-gray-100 transition-all hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md"
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

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                The Future of Interviewing is Here
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Unlock powerful tools designed to give you a competitive edge in talent acquisition
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                className="lg:col-span-2"
                icon={<BarChartBig className="h-8 w-8 text-blue-600" />}
                title="AI-Powered Analysis"
                description="Go beyond transcripts. Our AI analyzes sentiment, response quality, and key competencies to give you a ranked list of candidates with actionable insights."
              />
              <FeatureCard
                icon={<Clock className="h-8 w-8 text-blue-600" />}
                title="Save Time on Screening"
                description="Automate first-round interviews and reclaim your week. Focus on final-round candidates who are already vetted."
              />
              <FeatureCard
                icon={<Scale className="h-8 w-8 text-blue-600" />}
                title="Eliminate Unconscious Bias"
                description="Ensure every candidate is evaluated on the same criteria with standardized, structured interviews."
              />
              <FeatureCard
                icon={<Zap className="h-8 w-8 text-blue-600" />}
                title="24/7 Availability"
                description="Candidates can take interviews anytime, anywhere, on any device—no scheduling conflicts or timezone issues."
              />
              <FeatureCard
                icon={<CheckCircle className="h-8 w-8 text-blue-600" />}
                title="Fully Customizable"
                description="Tailor questions, branding, and evaluation criteria to perfectly match your specific role requirements."
              />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Get Started in 3 Simple Steps
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Launch your first AI-powered interview campaign in minutes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200"></div>

              {[
                {
                  number: "01",
                  title: "Create Your Interview",
                  description: "Use our templates or create custom questions for your job role. Set your evaluation criteria and branding in minutes.",
                  icon: <BrainCircuit className="w-6 h-6" />,
                },
                {
                  number: "02",
                  title: "Invite Candidates",
                  description: "Share a single link with all applicants. They complete the interview on their own schedule, 24/7.",
                  icon: <Users className="w-6 h-6" />,
                },
                {
                  number: "03",
                  title: "Review AI Analysis",
                  description: "Receive a dashboard with ranked candidates, full transcripts, and deep insights to make your decision.",
                  icon: <TrendingUp className="w-6 h-6" />,
                },
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center mb-6 mx-auto text-white shadow-lg">
                      {step.icon}
                    </div>
                    <div className="text-sm font-bold text-blue-600 dark:text-blue-400 text-center mb-2">STEP {step.number}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 text-center">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="pricing" className="py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center shadow-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to Transform Your Hiring Process?
                </h2>
                <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join companies already using AIcruiter to find the best talent faster and smarter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleDashboardClick}
                    className="px-8 py-4 bg-white rounded-lg font-semibold text-blue-600 transition-all hover:shadow-2xl hover:scale-105"
                  >
                    Start Your Free Trial
                  </button>
                  <button
                    onClick={handleDashboardClick}
                    className="px-8 py-4 bg-blue-800 rounded-lg font-semibold text-white border-2 border-blue-400 transition-all hover:bg-blue-900"
                  >
                    Schedule a Demo
                  </button>
                </div>
                <div className="flex items-center justify-center gap-6 mt-8 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Setup in minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-6 pt-12 pb-0 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Branding + Intro + Newsletter */}
            <div>
              <button onClick={handleDashboardClick} className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                  <BrainCircuit className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100">AIcruiter</span>
              </button>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Welcome to AIcruiter — your gateway to bias-free, seamless
                candidate screening with AI-driven insights.
              </p>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Subscribe to our newsletter</h4>
                <form
                  onSubmit={(e) => { e.preventDefault(); }}
                  className="flex items-stretch gap-2"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Subscribe
                  </button>
                </form>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">We respect your privacy. Unsubscribe anytime.</p>
              </div>
            </div>

            {/* Product */}
            <div className="pl-30">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Product</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
                <button onClick={() => scrollToSection('features')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</button>
                <button onClick={() => scrollToSection('pricing')} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</button>
                <button onClick={handleDashboardClick} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Demo</button>
              </div>
            </div>

            {/* Company */}
            <div className="pl-10">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
                <button onClick={handleDashboardClick} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</button>
                <button onClick={handleDashboardClick} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Careers</button>
                <button onClick={handleDashboardClick} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</button>
              </div>
            </div>

            {/* Legal */}
            <div className="-ml-8">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h3>
              <div className="flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
                <button onClick={handleDashboardClick} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</button>
                <button onClick={handleDashboardClick} className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</button>
              </div>
              
              {/* Social Media Icons */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-sm">Follow Us</h4>
                <div className="flex gap-3">
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-900 dark:hover:bg-gray-600 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                    aria-label="X (formerly Twitter)"
                  >
                    <X className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={3} />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-700 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-blue-800 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-800 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-3 mt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center items-center">
            
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
              © 2025 AIcruiter. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ className, icon, title, description }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all group ${className || ""}`}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-50 dark:bg-blue-900/50 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/50 border border-blue-100 dark:border-blue-800 mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
