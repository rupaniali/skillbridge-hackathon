"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../app/supabase"; 

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    fetchUser();
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  // 🚀 YAHAN FIX KIYA HAI: Homepage ("/"), Admin, aur Login page par yeh global navbar nahi dikhega
  if (pathname === "/" || pathname === "/admin" || pathname === "/login") return null;

  if (!user) {
     return (
      <nav className="bg-white text-black px-6 py-4 flex justify-between items-center shadow-md border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#00d09c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-xl font-bold tracking-tight">
            Skill<span className="text-gray-500 font-light">BRIDGE</span>
          </span>
        </Link>
        <Link href="/login" className="bg-[#00d09c] text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-teal-500 transition">
          Login
        </Link>
      </nav>
     );
  }

  // 🚀 MAIN NAVBAR (LOGGED IN USER)
  return (
    <nav className="bg-white text-black border-b border-gray-100 shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer z-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#00d09c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span className="text-xl font-bold tracking-tight">
              Skill<span className="text-gray-500 font-light">BRIDGE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-bold text-sm text-gray-700">
            <Link href="/dashboard" className="hover:text-[#00d09c] transition">Verified Skills</Link>
            <Link href="/jobs" className="hover:text-[#00d09c] transition">Recommended Jobs</Link>
            <Link href="/resume" className="hover:text-[#00d09c] transition">Resume Builder</Link>
            <Link href="/dashboard/mock-test" className="hover:text-[#00d09c] transition">Skill Mock Test</Link>
          </div>

          <div className="flex items-center gap-3 z-50">
            <div className="hidden sm:flex items-center gap-2 border border-gray-200 px-3 py-1.5 rounded-lg bg-gray-50">
              <span className="text-xs text-gray-400 font-medium">Welcome,</span>
              <span className="text-xs font-bold text-gray-700">
                {user?.user_metadata?.name || user?.email?.split('@')[0]}
              </span>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="hidden sm:block bg-[#eab308] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm hover:bg-yellow-600 transition"
            >
              Logout
            </button>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-lg px-4 py-6 flex flex-col gap-4 animate-fade-in-up">
          <Link 
            href="/dashboard" 
            onClick={() => setIsMenuOpen(false)}
            className="font-bold text-gray-800 hover:text-[#00d09c] p-2 border-b border-gray-50"
          >
            Verified Skills
          </Link>
          <Link 
            href="/jobs" 
            onClick={() => setIsMenuOpen(false)}
            className="font-bold text-gray-800 hover:text-[#00d09c] p-2 border-b border-gray-50"
          >
            Recommended Jobs
          </Link>
          <Link 
            href="/resume" 
            onClick={() => setIsMenuOpen(false)}
            className="font-bold text-gray-800 hover:text-[#00d09c] p-2 border-b border-gray-50"
          >
            Resume Builder
          </Link>
          <Link 
            href="/dashboard/mock-test" 
            onClick={() => setIsMenuOpen(false)}
            className="font-bold text-gray-800 hover:text-[#00d09c] p-2 border-b border-gray-50"
          >
            Skill Mock Test
          </Link>
          
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-lg bg-gray-50">
              <span className="text-sm text-gray-500 font-medium">Signed in as:</span>
              <span className="text-sm font-bold text-[#0A192F]">
                {user?.user_metadata?.name || user?.email?.split('@')[0]}
              </span>
            </div>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                handleLogout();
              }} 
              className="bg-[#eab308] text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-yellow-600 transition w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}