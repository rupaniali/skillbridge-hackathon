import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Navbar ko wapas import kiya hai taaki yeh har page par apply ho
import Navbar from "../components/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillBridge | Professional Portfolio",
  description: "Generate professional resumes and mock tests",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* 2. Yahan Navbar laga diya hai. Ab yeh Jobs, Resume aur Mock Test par perfectly dikhega! */}
        <Navbar />
        
        {/* Yeh aapke baaki pages ka content hai */}
        {children}
        
      </body>
    </html>
  );
}