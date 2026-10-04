"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center px-4 relative overflow-x-hidden text-white">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-[700px] h-[700px] text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      </div>

      <div className="mb-8 relative z-10">
        <Link href="/" className="text-2xl font-extrabold flex items-center gap-2 tracking-tight">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-white">Skill</span><span className="text-[#00d09c]">Bridge</span>
        </Link>
      </div>

      <div className="bg-[#1E293B] border border-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md relative z-10 text-white">
        <div className="flex justify-center mb-6 bg-[#0F172A] p-1 rounded-lg border border-gray-800">
          <button 
            type="button"
            onClick={() => setIsLogin(true)}
            className={`w-1/2 py-2 text-sm font-semibold rounded-md transition ${isLogin ? 'bg-[#00d09c] text-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            type="button"
            onClick={() => setIsLogin(false)}
            className={`w-1/2 py-2 text-sm font-semibold rounded-md transition {!isLogin ? 'bg-[#00d09c] text-[#0F172A]' : 'text-gray-400 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-center">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h2>
        <p className="text-gray-400 text-sm text-center mb-6">
          {isLogin ? "Enter your details to access your dashboard" : "Start your professional career journey today"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <input type="text" required placeholder="John Doe" className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d09c]" />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d09c]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00d09c]" />
          </div>
          <button type="submit" className="w-full bg-[#00d09c] text-[#0F172A] font-bold py-3 rounded-md hover:bg-teal-400 transition shadow-lg shadow-teal-500/10 mt-2">
            {isLogin ? "Sign In" : "Register Now"}
          </button>
        </form>
      </div>
    </div>
  );
}