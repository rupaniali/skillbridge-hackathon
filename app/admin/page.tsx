"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function AdminDashboard() {
  // 🚀 Admin Authentication States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [verifiedUsers, setVerifiedUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);

  const router = useRouter();

  // 🚀 Admin Login Handler
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Tumhara diya hua email aur password yahan check ho raha hai
    if (adminEmail === "rupanialiabbas6@gmail.com" && adminPassword === "niga@1220") {
      setIsAdminAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid Admin Credentials. Access Denied!");
    }
  };

  // 🚀 REAL-TIME: Fetching data (Sirf tab chalega jab admin login kar lega)
  useEffect(() => {
    if (!isAdminAuthenticated) return;

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

    fetchRealData();
  }, [isAdminAuthenticated]);

  const stats = [
    { label: "Total Users", value: totalUsers.toString(), trend: "Live from DB", positive: true },
    { label: "Verified Accounts", value: verifiedUsers.toString(), trend: "Active Users", positive: true },
    { label: "Resumes Generated", value: (totalUsers * 2).toString(), trend: "Estimated Activity", positive: true }, 
    { label: "Pending Verifications", value: pendingUsers.toString(), trend: "Action Required", positive: pendingUsers === 0 },
  ];

  // 🔒 SECURITY LOCK: Agar login nahi hai, toh sirf Login Screen dikhao
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
            <h1 className="text-2xl font-extrabold text-gray-900">Admin Gateway</h1>
            <p className="text-gray-500 text-sm mt-2">Enter credentials to access the command center.</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Admin Email</label>
              <input 
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@skillbridge.com"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Passkey</label>
              <input 
                type="password" 
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c]"
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
              className="w-full bg-[#0A192F] text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors shadow-md"
            >
              Secure Login
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button onClick={() => router.push('/')} className="text-sm text-gray-500 hover:text-gray-800 font-medium transition underline">
              ← Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 🚀 Yahan se original Admin Dashboard shuru hota hai (Sirf login ke baad dikhega)
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
      {/* 🚀 Admin Dedicated Navbar */}
      <nav className="print:hidden bg-[#0A192F] text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
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
          <span className="hidden md:inline text-sm text-gray-400 font-medium">Logged in as SuperAdmin</span>
          <button 
            onClick={() => setIsAdminAuthenticated(false)} 
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold text-white transition shadow-sm cursor-pointer"
          >
            Lock Dashboard
          </button>
        </div>
      </nav>

      {/* 🚀 Main Admin Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1 font-medium">Monitor your platform's real-time statistics.</p>
          </div>
          <button className="bg-[#00d09c] text-[#0A192F] px-5 py-2.5 rounded-lg font-bold shadow-sm hover:bg-teal-400 transition cursor-pointer flex items-center gap-2">
            <span>+</span> Add New Job
          </button>
        </div>

        {/* 🚀 REAL-TIME Top Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition">
              <p className="text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">{stat.label}</p>
              <div className="flex items-end gap-3">
                <h3 className="text-4xl font-extrabold text-[#0A192F]">
                  {isLoading ? <span className="text-gray-300">...</span> : stat.value}
                </h3>
              </div>
              <p className={`text-sm font-semibold mt-3 ${stat.positive ? 'text-green-600' : 'text-red-500'}`}>
                {stat.trend}
              </p>
            </div>
          ))}
        </div>

        {/* 🚀 REAL-TIME Recent Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent User Registrations (Live)</h3>
            <button className="text-sm font-bold text-[#00d09c] hover:text-teal-600 transition cursor-pointer">View All →</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200">
                  <th className="px-6 py-4 font-bold">Name</th>
                  <th className="px-6 py-4 font-bold">Email</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Date Joined</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400 font-medium animate-pulse">
                      Connecting to Supabase and fetching records...
                    </td>
                  </tr>
                ) : recentUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-400 font-medium">
                      No users found in database yet.
                    </td>
                  </tr>
                ) : (
                  recentUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900">{user.name || "N/A"}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{user.email || "No Email"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.status === 'Verified' ? 'bg-green-100 text-green-700 border border-green-200' : 
                          'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}>
                          {user.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[#00d09c] hover:text-[#0A192F] font-bold text-sm transition cursor-pointer">Edit</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}