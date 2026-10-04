"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../supabase';

export default function Dashboard() {
  const router = useRouter();
  
  // GitHub API ke states
  const [githubUser, setGithubUser] = useState("");
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Live GitHub Data Fetch karne ka function
  const fetchGithubStats = async () => {
    if (!githubUser) return;
    setLoading(true);
    setError("");
    setGithubData(null);
    
    try {
      const res = await fetch(`https://api.github.com/users/${githubUser}`);
      if (!res.ok) throw new Error("User not found!");
      const data = await res.json();
      setGithubData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-[#0f172a] text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 border-2 border-dashed border-teal-400 rounded-md flex items-center justify-center text-[10px] text-teal-400">
              LOGO
            </div>
            <span className="text-2xl font-bold tracking-wide">
              <span className="text-white">Skill</span>
              <span className="text-teal-400">Bridge</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-sm text-gray-300 hidden md:block">Welcome, Hacker!</span>
            <button 
              onClick={handleLogout}
              className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-md text-sm font-semibold transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Area */}
      <main className="max-w-7xl mx-auto p-6 mt-8">
        <h1 className="text-3xl font-bold text-[#0f172a] mb-8">Your Learning Path</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 🌟 UPGRADED CARD 1: GitHub API Integration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 text-xl">💻</div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">Verified Skills</h2>
            <p className="text-gray-500 text-sm mb-4">Link your GitHub to prove your coding experience.</p>
            
            {/* Input & Button */}
            <div className="flex space-x-2 mb-4">
              <input 
                type="text" 
                placeholder="GitHub Username" 
                className="w-full text-sm p-2 border border-gray-200 rounded-md focus:outline-none focus:border-teal-500"
                value={githubUser}
                onChange={(e) => setGithubUser(e.target.value)}
              />
              <button 
                onClick={fetchGithubStats}
                className="bg-[#0f172a] text-white px-3 py-2 rounded-md text-sm hover:bg-gray-800 transition-all"
              >
                {loading ? "..." : "Verify"}
              </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

            {/* Live Data Display (Jab data aa jaye tab dikhega) */}
            {githubData && (
              <div className="mt-2 p-3 bg-gray-50 border border-gray-100 rounded-lg flex items-center space-x-4">
                <img src={githubData.avatar_url} alt="Profile" className="w-12 h-12 rounded-full border-2 border-teal-400" />
                <div>
                  <h3 className="text-sm font-bold text-[#0f172a]">{githubData.name || githubData.login}</h3>
                  <div className="flex space-x-3 mt-1">
                    <span className="text-xs text-gray-600 font-medium">📦 {githubData.public_repos} Repos</span>
                    <span className="text-xs text-gray-600 font-medium">👥 {githubData.followers} Followers</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Recommended Jobs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 text-xl">🚀</div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">Recommended Jobs</h2>
            <p className="text-gray-500 text-sm mb-4">AI-matched job opportunities based on your updated profile.</p>
            <button className="text-teal-600 font-bold text-sm hover:underline">Explore Jobs &rarr;</button>
          </div>

          {/* Card 3: Resume Builder */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 text-xl">📄</div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">Resume Builder</h2>
            <p className="text-gray-500 text-sm mb-4">Generate an ATS-friendly professional resume in one click.</p>
            <button className="text-teal-600 font-bold text-sm hover:underline">Build Resume &rarr;</button>
          </div>

        </div>
      </main>
    </div>
  );
}