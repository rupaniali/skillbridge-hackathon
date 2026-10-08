"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../supabase";

export default function LoginPage() {
  const [authMode, setAuthMode] = useState<"signin" | "signup" | "verify" | "forgot">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (authMode === "signup") {
        if (!email || !password || !confirmPassword || !name || !phone) {
          setError("Please fill in all details");
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          setError("Passwords do not match!");
          setLoading(false);
          return;
        }

        // 1. Sign Up user in Supabase Auth
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, phone: phone },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
        } else {
          // Save to custom users table
          await supabase.from("users").upsert([
            { email: email, name: name, phone: phone, status: "Pending OTP" }
          ], { onConflict: "email" });

          setSuccessMsg("Registration initiated! Please check your real email for the verification code.");
          setAuthMode("verify"); // Move to OTP Verification step
        }
      } 
      else if (authMode === "verify") {
        if (!otpCode) {
          setError("Please enter the verification code sent to your email");
          setLoading(false);
          return;
        }

        // 2. Verify OTP Token
        const { data, error: verifyError } = await supabase.auth.verifyOtp({
          email,
          token: otpCode,
          type: "signup",
        });

        if (verifyError) {
          setError("Invalid or expired verification code. Please check and try again.");
        } else {
          // Update database status to Verified
          await supabase.from("users").update({ status: "Verified" }).eq("email", email);
          
          setSuccessMsg("Email verified successfully! You can now sign in.");
          setAuthMode("signin");
          setOtpCode("");
        }
      }
      else if (authMode === "signin") {
        if (!email || !password) {
          setError("Please enter both email and password");
          setLoading(false);
          return;
        }

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError("Invalid email, password, or email not verified yet.");
        } else {
          router.push("/dashboard");
        }
      } 
      else if (authMode === "forgot") {
        if (!email) {
          setError("Please enter your registered email address");
          setLoading(false);
          return;
        }

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + "/login",
        });

        if (resetError) {
          setError(resetError.message);
        } else {
          setSuccessMsg("Password reset link sent to your email!");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4 font-sans text-white">
      <div className="bg-[#1E293B] p-8 rounded-xl shadow-lg border border-gray-800 w-full max-w-md">
        
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-extrabold flex items-center justify-center gap-2 mb-2">
            <span className="text-white">Skill</span><span className="text-[#00d09c]">Bridge</span>
          </Link>
          <p className="text-gray-400 text-sm">
            {authMode === "signup" ? "Create your new account" : 
             authMode === "verify" ? "Enter OTP Code sent to your Email" :
             authMode === "forgot" ? "Reset your password" : 
             "Sign in to your account"}
          </p>
        </div>

        {/* Tabs */}
        {(authMode === "signin" || authMode === "signup") && (
          <div className="flex bg-[#0F172A] p-1 rounded-lg mb-6 border border-gray-700">
            <button
              type="button"
              onClick={() => { setAuthMode("signin"); setError(""); setSuccessMsg(""); }}
              className={`w-1/2 py-2 text-xs font-bold rounded-md transition ${
                authMode === "signin" ? "bg-[#00d09c] text-[#0F172A]" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode("signup"); setError(""); setSuccessMsg(""); }}
              className={`w-1/2 py-2 text-xs font-bold rounded-md transition ${
                authMode === "signup" ? "bg-[#00d09c] text-[#0F172A]" : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded mb-6 text-sm font-semibold">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded mb-6 text-sm font-semibold">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Sign Up Fields */}
          {authMode === "signup" && (
            <>
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="AliAbbas Rupani" 
                  required
                  className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
                />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Phone Number</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210" 
                  required
                  className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
                />
              </div>
            </>
          )}

          {/* OTP Verification Step */}
          {authMode === "verify" ? (
            <div>
              <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Enter 6-Digit Verification Code</label>
              <input 
                type="text" 
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="123456" 
                required
                maxLength={6}
                className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-center text-xl tracking-widest text-white focus:outline-none focus:border-[#00d09c]" 
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com" 
                  required
                  className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
                />
              </div>

              {authMode !== "forgot" && (
                <div>
                  <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
                  />
                </div>
              )}

              {authMode === "signup" && (
                <div>
                  <label className="block text-gray-400 text-xs font-bold mb-2 uppercase tracking-wide">Confirm Password</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="w-full bg-[#0F172A] border border-gray-700 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00d09c]" 
                  />
                </div>
              )}
            </>
          )}

          {authMode === "signin" && (
            <div className="text-right">
              <button 
                type="button" 
                onClick={() => { setAuthMode("forgot"); setError(""); setSuccessMsg(""); }}
                className="text-xs text-[#00d09c] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#00d09c] text-[#0F172A] font-bold py-3 px-4 rounded hover:bg-teal-400 transition mt-6 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Processing..." : 
             authMode === "signup" ? "Proceed to Verify OTP →" : 
             authMode === "verify" ? "Confirm Verification Code →" :
             authMode === "forgot" ? "Send Reset Link →" : 
             "Sign In →"}
          </button>
        </form>

        {authMode === "verify" && (
          <div className="mt-4 text-center">
            <button 
              type="button" 
              onClick={() => { setAuthMode("signup"); setError(""); setSuccessMsg(""); }}
              className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
              ← Back to Sign Up
            </button>
          </div>
        )}

        {authMode === "forgot" && (
          <div className="mt-4 text-center">
            <button 
              type="button" 
              onClick={() => { setAuthMode("signin"); setError(""); setSuccessMsg(""); }}
              className="text-xs text-gray-400 hover:text-white underline cursor-pointer"
            >
              ← Back to Sign In
            </button>
          </div>
        )}
        
        <div className="mt-6 text-center border-t border-gray-800 pt-4">
          <Link href="/" className="text-gray-500 text-xs hover:text-white transition">
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}