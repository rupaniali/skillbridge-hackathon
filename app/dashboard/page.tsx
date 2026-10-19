"use client";

import { useState } from "react";
// 🚀 Teeno Components Import Kiye (Path apne folder structure ke hisaab se check kar lena)
import PeerEndorsements from "../../components/PeerEndorsements";
import CaseStudyManager from "../../components/CaseStudyManager"; 
import BugManager from "../../components/BugManager"; 
import HealthMonitor from "../../components/HealthMonitor"; // 🟢 Naya Health Monitor Import

export default function DashboardPage() {
  const [githubUser, setGithubUser] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [githubData, setGithubData] = useState<any>(null); 

  const handleGitHubVerification = async () => {
    if (!githubUser.trim()) {
      alert("Please enter a GitHub username");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${githubUser.trim()}`);
      if (!response.ok) {
        alert("Invalid GitHub username! Please check and try again.");
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      setGithubData(data);
      setIsVerified(true);
    } catch (error) {
      console.error("Error verifying GitHub:", error);
      alert("Failed to verify GitHub account. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#0A192F] mb-4">Dashboard Overview</h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">Manage your profile, skills, and platform integrations.</p>
          
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 text-left">
            
            {/* Left Column: Link GitHub Account */}
            <div className="flex-1 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="font-bold text-[#0A192F] mb-2 flex items-center gap-2">💻 Link GitHub Account</h3>
              <p className="text-xs text-gray-500 mb-5">Verify your coding experience to boost your profile visibility.</p>
              
              {!isVerified ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text" 
                    placeholder="Enter GitHub Username (e.g. dexter)" 
                    value={githubUser}
                    onChange={(e) => setGithubUser(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleGitHubVerification()}
                    className="border border-gray-300 rounded-lg px-3 py-2 w-full text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c]" 
                  />
                  <button 
                    onClick={handleGitHubVerification} 
                    disabled={loading}
                    className="bg-[#0A192F] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition cursor-pointer whitespace-nowrap"
                  >
                    {loading ? "Checking..." : "Verify Now"}
                  </button>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm transition-all animate-fade-in-up">
                  
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={githubData?.avatar_url} 
                      alt="GitHub Avatar" 
                      className="w-16 h-16 rounded-full border-2 border-[#00d09c] p-0.5 shadow-sm" 
                    />
                    <div>
                      <h4 className="font-extrabold text-[#0A192F] text-lg leading-tight">
                        {githubData?.name || githubData?.login}
                      </h4>
                      <a 
                        href={githubData?.html_url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm font-bold text-[#00d09c] hover:underline"
                      >
                        @{githubData?.login}
                      </a>
                    </div>
                  </div>

                  {githubData?.bio && (
                    <p className="text-sm text-gray-600 mb-5 italic border-l-2 border-gray-200 pl-3">
                      "{githubData.bio}"
                    </p>
                  )}
                  
                  <div className="grid grid-cols-2 gap-3 text-center mb-5">
                    <div className="bg-gray-50 py-3 rounded-lg border border-gray-100">
                      <div className="text-2xl font-extrabold text-[#0A192F]">{githubData?.public_repos}</div>
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Repositories</div>
                    </div>
                    <div className="bg-gray-50 py-3 rounded-lg border border-gray-100">
                      <div className="text-2xl font-extrabold text-[#0A192F]">{githubData?.followers}</div>
                      <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mt-1">Followers</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-100 flex items-center gap-1">
                      ✅ Verified Developer
                    </span>
                    <button 
                      onClick={() => {
                        setIsVerified(false);
                        setGithubUser("");
                      }} 
                      className="text-xs font-bold text-gray-400 hover:text-red-500 transition cursor-pointer"
                    >
                      Unlink Account
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* 🚀 Teeno Naye Components Yahan Ek Saath Hain */}
          <div className="max-w-4xl mx-auto text-left border-t border-gray-200 mt-10 pt-4">
            <CaseStudyManager />
            <BugManager />
            <HealthMonitor /> {/* 🟢 Naya feature */}
            <PeerEndorsements /> {/* 🤝 Yeh naya add kiya */}
          </div>

        </div>
      </main>
    </div>
  );
}