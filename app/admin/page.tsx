"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../supabase"; // Correct relative path (app/supabase.ts)

export default function AdminDashboard() {
  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Real Data State from Supabase
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Login Handle function
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@skillbridge.com" && password === "admin123") {
      setIsLoggedIn(true);
      setError("");
      fetchRealUsers(); // Login hote hi real users fetch karo
    } else {
      setError("Invalid email or password");
    }
  };

  // 🚀 Fetch Real Users from Supabase Database
  const fetchRealUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("users").select("*");
      
      if (error) {
        console.error("Error fetching users:", error.message);
      } else {
        setUsers(data || []);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🚀 Delete Real User from Supabase Database
  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const { error } = await supabase.from("users").delete().eq("id", id);
      
      if (error) {
        alert("Error deleting user: " + error.message);
      } else {
        setUsers(users.filter(user => user.id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const totalUsers = users.length;
  const verifiedUsers = users.filter(user => user.status === 'Verified' || user.github_verified === true).length;

  // ---------------- UI 1: LOGIN PAGE ---------------- //
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans">
        <div className="bg-[#1E293B] p-8 rounded-xl shadow-lg border border-gray-800 w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400 text-sm">Sign in to access real-time database</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">
                Admin Email
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@skillbridge.com" 
                className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
              />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">
                Password
              </label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
              />
            </div>
            
            <button type="submit" className="w-full bg-[#00d09c] text-[#0F172A] font-bold py-3 px-4 rounded hover:bg-teal-400 transition mt-6">
              Secure Login to Database
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-gray-500 text-sm hover:text-white transition">
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- UI 2: REAL ADMIN DASHBOARD ---------------- //
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      
      {/* Admin Navbar */}
      <nav className="bg-[#1E293B] text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">LIVE ADMIN</div>
          <span className="text-xl font-bold">SkillBridge Panel</span>
        </div>
        <div className="flex gap-4 items-center">
          <button onClick={fetchRealUsers} className="text-xs bg-gray-700 px-3 py-1.5 rounded hover:bg-gray-600">
            🔄 Refresh Data
          </button>
          <Link href="/" className="text-sm text-gray-300 hover:text-white transition">
            View Live Website
          </Link>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm transition font-semibold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Real-Time Database Overview</h1>

        {/* Real Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-blue-500">
            <p className="text-gray-500 text-sm font-semibold">Total Registered Users</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-[#00d09c]">
            <p className="text-gray-500 text-sm font-semibold">GitHub Verified</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{verifiedUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-purple-500">
            <p className="text-gray-500 text-sm font-semibold">Active Sessions</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">Live</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-yellow-500">
            <p className="text-gray-500 text-sm font-semibold">Database Status</p>
            <p className="text-xl font-bold text-green-600 mt-3 flex items-center gap-1.5">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span> Connected
            </p>
          </div>
        </div>

        {/* Real Users Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h2 className="text-lg font-bold text-gray-800">Database Users Table</h2>
            <span className="text-xs text-gray-500">Fetching live from Supabase</span>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-12 text-center text-gray-500 font-medium">Loading live users from database...</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white text-gray-500 text-xs uppercase tracking-wider border-b">
                    <th className="p-4 font-semibold">Name / ID</th>
                    <th className="p-4 font-semibold">Email</th>
                    <th className="p-4 font-semibold">GitHub</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-900">{user.name || user.full_name || "User #" + user.id}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4 text-blue-600 hover:underline cursor-pointer">{user.github || user.github_username || "-"}</td>
                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700 font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {!loading && users.length === 0 && (
            <div className="p-12 text-center text-gray-500">
              <p className="font-semibold text-base mb-1">No users found in database yet.</p>
              <p className="text-xs text-gray-400">When users sign up on your website, they will appear here automatically.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}