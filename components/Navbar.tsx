"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; 
import { supabase } from "../app/supabase"; // Apna path verify kar lena

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  // 1. Yahan humne Admin pages ki ek nayi condition add kar di hai
  const isPublicPage = pathname === "/" || pathname === "/login";
  const isAdminPage = pathname.startsWith("/admin"); // Agar URL '/admin' hai toh

  useEffect(() => {
    const checkSecurityAndUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        // 🔒 SECURITY CHECK: Ab yeh guard Admin pages ko wapas /login par redirect NAHI karega
        if (!session && !isPublicPage && !isAdminPage) {
          router.push("/login");
          return;
        }

        if (session?.user) {
          const user = session.user;
          if (user.user_metadata?.name) {
            setUserName(user.user_metadata.name);
          } else if (user.user_metadata?.full_name) {
            setUserName(user.user_metadata.full_name);
          } else {
            const emailName = user.email?.split('@')[0];
            if (emailName) setUserName(emailName);
          }
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      }
    };

    checkSecurityAndUser();
  }, [pathname, router, isPublicPage, isAdminPage]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // 👁️ VISIBILITY CHECK: Agar Home, Login, YA Admin page hai, toh yeh student wala Navbar mat dikhao
  if (isPublicPage || isAdminPage) {
    return null;
  }

  return (
    <nav className="print:hidden bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm w-full sticky top-0 z-50">
      
      {/* Left: Brand Logo */}
      <div className="flex items-center">
        <Link href="/dashboard" className="text-xl font-extrabold flex items-center gap-2 tracking-tight cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-[#0A192F]">Skill</span><span className="text-gray-500 font-medium">BRIDGE</span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
        <Link href="/dashboard" className="hover:text-[#00d09c] transition border-b-2 border-transparent hover:border-[#00d09c] pb-1">Verified Skills</Link>
        <Link href="/jobs" className="hover:text-[#00d09c] transition border-b-2 border-transparent hover:border-[#00d09c] pb-1">Recommended Jobs</Link>
        <Link href="/resume" className="hover:text-[#00d09c] transition border-b-2 border-transparent hover:border-[#00d09c] pb-1">Resume Builder</Link>
        <Link href="/dashboard/mock-test" className="hover:text-[#00d09c] transition border-b-2 border-transparent hover:border-[#00d09c] pb-1">Skill Mock Test</Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-xs">
           <span className="text-gray-500 mr-2">Welcome,</span>
           <span className="font-bold text-[#0A192F]">{userName}</span>
        </div>
        <button onClick={handleLogout} className="bg-[#eab308] text-white px-5 py-2 rounded-md font-bold text-sm hover:bg-yellow-500 transition shadow-sm cursor-pointer flex items-center gap-2">
          Logout
        </button>
      </div>
    </nav>
  );
}