"use client";

import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  // GitHub verification ke liye states
  const [githubUser, setGithubUser] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = () => {
    if (githubUser.trim() !== "") {
      // Demo ke liye hum isko instantly verify kar rahe hain
      setIsVerified(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header / Navbar */}
      <nav className="bg-[#0A192F] text-white p-4 flex justify-between items-center shadow-md">
        
        {/* NAYA SVG LOGO YAHAN HAI */}
        <div className="text-2xl font-extrabold flex items-center gap-2 tracking-tight cursor-pointer">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-8 h-8 text-[#00d09c]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-white">Skill</span><span className="text-[#00d09c]">Bridge</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm hidden sm:block">Welcome, Hacker!</span>
          <button className="bg-[#00d09c] text-[#0A192F] px-4 py-2 rounded font-bold text-sm hover:bg-teal-400 transition">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <h1 className="text-3xl font-bold text-[#0A192F] mb-8">Your Learning Path</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Verified Skills */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col">
            <div className="text-3xl mb-4">💻</div>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Verified Skills</h2>
            <p className="text-gray-500 text-sm mb-6">Link your GitHub to prove your coding experience.</p>
            
            {/* Conditional Rendering: Agar verify nahi hua toh Input dikhao, warna Success badge */}
            {!isVerified ? (
              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <input 
                  type="text" 
                  placeholder="GitHub Username" 
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm text-black focus:outline-none focus:border-[#00d09c]" 
                />
                <button 
                  onClick={handleVerify}
                  className="bg-[#0A192F] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition"
                >
                  Verify
                </button>
              </div>
            ) : (
              <div className="mt-auto bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center justify-between">
                <span className="font-semibold text-sm">✅ {githubUser} Linked</span>
                <button 
                  onClick={() => setIsVerified(false)} 
                  className="text-xs text-gray-500 hover:text-black underline"
                >
                  Change
                </button>
              </div>
            )}
          </div>

          {/* Card 2: Recommended Jobs */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col">
            <div className="text-3xl mb-4">🚀</div>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Recommended Jobs</h2>
            <p className="text-gray-500 text-sm mb-8">AI-matched job opportunities based on your updated profile.</p>
            <div className="mt-auto">
              <Link href="/jobs" className="text-[#00d09c] font-bold hover:underline cursor-pointer flex items-center gap-1">
                Explore Jobs <span>→</span>
              </Link>
            </div>
          </div>

          {/* Card 3: Resume Builder */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition flex flex-col">
            <div className="text-3xl mb-4">📄</div>
            <h2 className="text-xl font-bold text-[#0A192F] mb-2">Resume Builder</h2>
            <p className="text-gray-500 text-sm mb-8">Generate an ATS-friendly professional resume in one click.</p>
            <div className="mt-auto">
              <Link href="/resume" className="text-[#00d09c] font-bold hover:underline cursor-pointer flex items-center gap-1">
                Build Resume <span>→</span>
              </Link>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}