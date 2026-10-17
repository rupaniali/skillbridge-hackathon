"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../app/supabase";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [displayName, setDisplayName] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile Menu State
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserFullName = async () => {
      const { data: authData } = await supabase.auth.getSession();
      if (authData?.session?.user) {
        const user = authData.session.user;
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        const exactName = 
          profile?.full_name || 
          profile?.fullName || 
          profile?.name || 
          user.user_metadata?.full_name || 
          user.user_metadata?.name || 
          user.email?.split("@")[0];
          
        if (exactName) setDisplayName(exactName);
      }
    };
    fetchUserFullName();
  }, [pathname]);

  if (pathname === "/" || pathname === "/login" || pathname === "/admin") {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* 🚀 Main Navbar Bar */}
      <div className="px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 sm:gap-10 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-1.5 sm:gap-2.5 font-extrabold text-[15px] sm:text-lg text-black tracking-tight">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-[#00d09c] flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <span>Skill<span className="text-gray-500 font-medium uppercase tracking-widest text-[10px] sm:text-sm ml-0.5">BRIDGE</span></span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-[#0A192F]">
            <Link href="/dashboard" className={`transition ${pathname === '/dashboard' ? 'text-[#00d09c]' : 'hover:text-[#00d09c]'}`}>Verified Skills</Link>
            <Link href="/jobs" className={`transition ${pathname === '/jobs' ? 'text-[#00d09c]' : 'hover:text-[#00d09c]'}`}>Recommended Jobs</Link>
            <Link href="/resume" className={`transition ${pathname === '/resume' ? 'text-[#00d09c]' : 'hover:text-[#00d09c]'}`}>Resume Builder</Link>
            <Link href="/dashboard/mock-test" className={`transition ${pathname === '/dashboard/mock-test' ? 'text-[#00d09c]' : 'hover:text-[#00d09c]'}`}>Skill Mock Test</Link>
          </div>
        </div>

        {/* Desktop User Actions & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          {/* Desktop Login/Logout (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-4">
            {displayName ? (
              <>
                <div className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 bg-white">
                  Welcome, <span className="text-black font-extrabold ml-1">{displayName}</span>
                </div>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/login");
                  }}
                  className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-extrabold text-sm px-5 py-2.5 rounded-lg transition cursor-pointer whitespace-nowrap"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login">
                <button className="bg-[#00d09c] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition cursor-pointer">Login</button>
              </Link>
            )}
          </div>

          {/* 🚀 Mobile Menu Hamburger Icon */}
          <button 
            className="md:hidden p-2 text-gray-600 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* 🚀 Custom Mobile Menu Dropdown (Replaces the old one) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-6 flex flex-col gap-4 shadow-lg absolute w-full left-0">
          <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold py-2 ${pathname === '/dashboard' ? 'text-[#00d09c]' : 'text-gray-700'}`}>Verified Skills</Link>
          <Link href="/jobs" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold py-2 ${pathname === '/jobs' ? 'text-[#00d09c]' : 'text-gray-700'}`}>Recommended Jobs</Link>
          <Link href="/resume" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold py-2 ${pathname === '/resume' ? 'text-[#00d09c]' : 'text-gray-700'}`}>Resume Builder</Link>
          <Link href="/dashboard/mock-test" onClick={() => setIsMobileMenuOpen(false)} className={`font-bold py-2 ${pathname === '/dashboard/mock-test' ? 'text-[#00d09c]' : 'text-gray-700'}`}>Skill Mock Test</Link>
          
          <div className="border-t border-gray-200 mt-2 pt-4">
            {displayName ? (
               <div className="flex flex-col gap-3">
                 <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-600 text-center">
                   Signed in as: <span className="text-black font-extrabold ml-1">{displayName}</span>
                 </div>
                 <button
                   onClick={async () => {
                     setIsMobileMenuOpen(false);
                     await supabase.auth.signOut();
                     router.push("/login");
                   }}
                   className="bg-[#f59e0b] hover:bg-[#d97706] text-white font-extrabold text-sm px-5 py-3 rounded-lg transition w-full text-center"
                 >
                   Logout
                 </button>
               </div>
            ) : (
               <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                 <button className="bg-[#00d09c] text-white font-bold text-sm px-5 py-3 rounded-lg transition w-full text-center">Login</button>
               </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}