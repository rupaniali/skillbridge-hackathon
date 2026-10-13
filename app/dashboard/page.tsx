"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [githubUser, setGithubUser] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGitHubVerification = async (githubUsername: string) => {
    if (!githubUsername.trim()) {
      alert("Please enter a GitHub username");
      return false;
    }
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername.trim()}`);
      if (!response.ok) {
        alert("Invalid GitHub username!");
        return false;
      }
      const githubData = await response.json();
      alert(`GitHub account verified successfully: ${githubData.login}`);
      return true;
    } catch (error) {
      console.error("Error verifying GitHub:", error);
      alert("Failed to verify GitHub account. Please try again.");
      return false;
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    const isValid = await handleGitHubVerification(githubUser);
    if (isValid) setIsVerified(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar yahan se hata diya gaya hai kyunki wo layout.tsx se aa raha hai */}

      <main className="max-w-6xl mx-auto p-6 md:p-10">
        <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#0A192F] mb-4">Dashboard Overview</h1>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">Your main navigation is now securely placed at the top.</p>
          
          <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg border border-gray-200 text-left">
            <h3 className="font-bold text-[#0A192F] mb-2 flex items-center gap-2">💻 Link GitHub Account</h3>
            <p className="text-xs text-gray-500 mb-4">Verify your coding experience to boost your profile.</p>
            
            {!isVerified ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={githubUser}
                  onChange={(e) => setGithubUser(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm text-black focus:outline-none focus:border-[#00d09c]" 
                />
                <button 
                  onClick={handleVerify} 
                  disabled={loading}
                  className="bg-[#0A192F] text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-800 transition cursor-pointer"
                >
                  {loading ? "Checking..." : "Verify"}
                </button>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-center justify-between">
                <span className="font-semibold text-sm">✅ {githubUser} Linked</span>
                <button onClick={() => setIsVerified(false)} className="text-xs text-gray-500 hover:text-black underline cursor-pointer">Change</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}