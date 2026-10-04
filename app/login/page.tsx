"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "../supabase";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();   
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Naya User Account Banane ka Code
  const handleSignUp = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    
    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ Success! Check your real email inbox to confirm your account.");
    }
    setLoading(false);
  };

  // Purane User ke Login ka Code
  const handleSignIn = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    if (error) {
      setMessage("❌ " + error.message);
    } else {
      setMessage("✅ Login Successful! Redirecting to Dashboard...");
      window.location.href = "/dashboard";
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Sign in to continue to SkillBridge</p>
        </div>

        {/* Message Box (Error ya Success dikhane ke liye) */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg font-medium text-sm ${message.includes("❌") ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message}
          </div>
        )}

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="flex gap-4 pt-2">
            <button 
              onClick={handleSignUp}
              disabled={loading}
              type="button" 
              className="w-1/2 bg-slate-100 text-slate-700 font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all">
              {loading ? "Wait..." : "Sign Up"}
            </button>
            <button 
              onClick={handleSignIn}
              disabled={loading}
              type="button" 
              className="w-1/2 bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-md">
              {loading ? "Wait..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
            ← Back to Home
          </Link>
        </div>
        
      </div>
    </div>
  );
}