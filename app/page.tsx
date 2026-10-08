"use client";

import Link from "next/link";

export default function LandingPage() {
  const scrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("features");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col font-sans relative overflow-x-hidden text-white">
      
      {/* Massive Background Watermark Logo */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>

      {/* Header / Navbar */}
      <nav className="p-6 flex justify-between items-center relative z-10 max-w-6xl mx-auto w-full">
        <div className="text-2xl font-extrabold flex items-center gap-2 tracking-tight">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-white">Skill</span><span className="text-[#00d09c]">Bridge</span>
        </div>
        
        {/* ✨ YAHAN ADMIN PANEL LINK AUR SIGN IN BUTTON HAI ✨ */}
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-gray-400 font-semibold hover:text-[#00d09c] transition text-sm">
            Admin Panel
          </Link>
          <Link href="/login" className="text-white font-semibold hover:text-[#00d09c] transition text-sm bg-[#1E293B] px-4 py-2 rounded-md border border-gray-700">
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 relative z-10 py-20">
        <div className="border border-gray-700/50 rounded-full px-4 py-1.5 text-xs text-[#00d09c] mb-8 flex items-center gap-2 bg-gray-800/30 backdrop-blur-sm shadow-sm">
          <span>🚀</span> Bridging the Skills Gap
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Launch Your Tech Career <br/> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d09c] to-blue-500">
            Based on Real Skills.
          </span>
        </h1>
        
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Stop writing fake resumes. Connect your GitHub, verify your live coding data, and get AI-matched with top industry jobs in seconds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="bg-[#00d09c] text-[#0F172A] font-bold py-3 px-8 rounded-md hover:bg-teal-400 transition shadow-lg shadow-teal-500/20">
            Get Started Now →
          </Link>
          <a href="#features" onClick={scrollToFeatures} className="bg-[#1E293B] border border-gray-700 text-white font-bold py-3 px-8 rounded-md hover:bg-gray-800 transition cursor-pointer">
            How it works
          </a>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 relative z-10 bg-[#1E293B]/50 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SkillBridge Works</h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">Three simple steps to transition from a fresher to a hired developer.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
              <div className="text-3xl mb-4 text-[#00d09c] font-bold">01</div>
              <h3 className="text-xl font-bold mb-2">Connect GitHub</h3>
              <p className="text-gray-400 text-sm">Link your GitHub profile to securely verify your real coding experience and repositories.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
              <div className="text-3xl mb-4 text-[#00d09c] font-bold">02</div>
              <h3 className="text-xl font-bold mb-2">Build ATS Resume</h3>
              <p className="text-gray-400 text-sm">Generate a clean, professional, and ATS-friendly resume using our automated builder.</p>
            </div>
            <div className="bg-[#0F172A] p-6 rounded-xl border border-gray-800">
              <div className="text-3xl mb-4 text-[#00d09c] font-bold">03</div>
              <h3 className="text-xl font-bold mb-2">Apply for Jobs</h3>
              <p className="text-gray-400 text-sm">Explore entry-level jobs and internships that perfectly match your verified skill set.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}