"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function AdminDashboard() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);

  // Modal States for "Add New Job"
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAdminAuth");
    if (authStatus === "true") {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 🚀 Exact corrected email spelling here
    if (adminEmail === "rupanialiabbas6@gmail.com" && adminPassword === "niga@1220") {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("isAdminAuth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid Admin Credentials. Access Denied!");
    }
  };

  const handleLockDashboard = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("isAdminAuth");
  };

  const fetchRealData = async () => {
    setIsLoading(true);
    try {
      const { data: users, error: usersError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const { count: totalCount, error: totalError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: verifiedCount, error: verifiedError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Verified');

      const { count: pendingCount, error: pendingError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'Pending');

      if (!usersError && users) setRecentUsers(users);
      if (!totalError && totalCount !== null) setTotalUsers(totalCount);
      if (!verifiedError && verifiedCount !== null) setVerifiedUsers(verifiedCount);
      if (!pendingError && pendingCount !== null) setPendingUsers(pendingCount);

    } catch (error) {
      console.error("Error fetching real data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchRealData();
    }
  }, [isAdminAuthenticated]);

  const handleAddJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle || !jobCompany) {
      alert("Please fill in Job Title and Company Name!");
      return;
    }

    setIsSubmittingJob(true);
    try {
      const { error } = await supabase.from('jobs').insert([
        {
          title: jobTitle,
          company: jobCompany,
          salary: jobSalary || "Competitive",
          location: jobLocation || "Remote"
        }
      ]);

      if (error) {
        console.error("Error adding job:", error);
        alert("Failed to add job to database.");
      } else {
        alert("🎉 Job posted successfully and is now live for students!");
        setIsJobModalOpen(false);
        setJobTitle("");
        setJobCompany("");
        setJobSalary("");
        setJobLocation("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingJob(false);
    }
  };

  const stats = [
    { label: "Total Users", value: totalUsers.toString(), trend: "Live from DB", positive: true },
    { label: "Verified Accounts", value: verifiedUsers.toString(), trend: "Active Users", positive: true },
    { label: "Resumes Generated", value: (totalUsers * 2).toString(), trend: "Estimated Activity", positive: true }, 
    { label: "Pending Verifications", value: pendingUsers.toString(), trend: "Action Required", positive: pendingUsers === 0 },
  ];

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex flex-col justify-center items-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-teal-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-black">Admin Gateway</h1>
            <p className="text-black font-semibold text-sm mt-2">Enter credentials to access the command center.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-extrabold text-black mb-1">Admin Email</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="rupanialiabbas6@gmail.com"
                className="w-full border border-gray-400 rounded-lg p-3 text-sm text-black font-bold focus:outline-none focus:border-[#00d09c]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-extrabold text-black mb-1">Passkey</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-400 rounded-lg p-3 text-sm text-black font-bold focus:outline-none focus:border-[#00d09c]"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 text-red-600 text-sm font-bold p-3 rounded-lg border border-red-100 text-center">
                ⚠️ {loginError}
              </div>
            )}

            <button 
              type="submit" 
              className="w-full bg-[#0A192F] text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md cursor-pointer"
            >
              Secure Login
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button onClick={() => router.push('/')} className="text-sm text-black font-bold hover:underline cursor-pointer">
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans relative">
      
      <nav className="print:hidden bg-[#0A192F] text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span className="text-xl font-bold tracking-widest">
            SkillBridge <span className="text-[#00d09c]">ADMIN</span>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-sm text-white font-bold">Logged in as SuperAdmin</span>
          <button 
            onClick={handleLockDashboard} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold text-white transition shadow-sm cursor-pointer"
          >
            Lock Dashboard
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-black">Dashboard Overview</h1>
            <p className="text-black font-semibold mt-1">Monitor your platform's real-time statistics.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchRealData} 
              className="bg-white border border-gray-400 hover:bg-gray-50 text-black px-4 py-2.5 rounded-lg font-bold shadow-sm transition cursor-pointer flex items-center gap-2 text-sm"
            >
              🔄 Refresh Data
            </button>
            <button 
              onClick={() => setIsJobModalOpen(true)}
              className="bg-[#00d09c] text-black px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-teal-400 transition cursor-pointer flex items-center gap-2 text-sm"
            >
              <span>+</span> Add New Job
            </button>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-300 hover:shadow-md transition">
              <p className="text-sm font-extrabold text-black mb-2 uppercase tracking-wide">{stat.label}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-extrabold text-black">
                  {isLoading ? <span className="text-black">...</span> : stat.value}
                </h3>
              </div>
              <p className="text-sm font-bold mt-3 text-black">
                {stat.trend}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-300 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-300 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-extrabold text-black">Recent User Registrations (Live)</h3>
            <button onClick={fetchRealData} className="text-sm font-extrabold text-black hover:underline cursor-pointer">
              Reload List ↻
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-black text-xs uppercase tracking-wider border-b border-gray-300 font-extrabold">
                  <th className="px-6 py-4 font-extrabold text-black">Name</th>
                  <th className="px-6 py-4 font-extrabold text-black">Email</th>
                  <th className="px-6 py-4 font-extrabold text-black">Status</th>
                  <th className="px-6 py-4 font-extrabold text-black">Date Joined</th>
                  <th className="px-6 py-4 font-extrabold text-black text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-black font-bold">
                      Fetching records from Supabase...
                    </td>
                  </tr>
                ) : recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-black font-bold">
                      No users found in database yet.
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-black">{user.name || "N/A"}</td>
                      <td className="px-6 py-4 text-black font-bold">{user.email || "No Email"}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-green-100 text-green-900 border border-green-300">
                          {user.status || 'Verified'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-black font-bold">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-black font-extrabold hover:underline cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* ADD NEW JOB MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-lg font-extrabold text-black">Post a New Job Opening</h3>
              <button 
                onClick={() => setIsJobModalOpen(false)}
                className="text-black font-extrabold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddJobSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-black mb-1">Job Title</label>
                <input 
                  type="text" 
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Senior React Developer"
                  className="w-full border border-gray-400 rounded-lg p-2.5 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase text-black mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={jobCompany}
                  onChange={(e) => setJobCompany(e.target.value)}
                  placeholder="e.g. Google / Microsoft"
                  className="w-full border border-gray-400 rounded-lg p-2.5 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase text-black mb-1">Salary Package</label>
                <input 
                  type="text" 
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  placeholder="e.g. ₹15 LPA - ₹25 LPA"
                  className="w-full border border-gray-400 rounded-lg p-2.5 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c]"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase text-black mb-1">Location</label>
                <input 
                  type="text" 
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  placeholder="e.g. Mumbai / Remote"
                  className="w-full border border-gray-400 rounded-lg p-2.5 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-300">
                <button 
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-4 py-2 rounded-lg font-extrabold text-sm bg-gray-200 hover:bg-gray-300 text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmittingJob}
                  className="px-5 py-2 rounded-lg font-extrabold text-sm bg-[#00d09c] hover:bg-teal-400 text-black shadow-sm cursor-pointer"
                >
                  {isSubmittingJob ? "Posting..." : "Publish Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}