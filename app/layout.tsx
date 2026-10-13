import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Yahan humne Navbar ko import kiya hai
import Navbar from "../components/Navbar"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Browser tab ka naam 'Create Next App' se badal kar SkillBridge kar diya hai
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
        
        {/* 2. Navbar yahan add kar diya, ab yeh har page par dikhega! */}
        <Navbar />
        
        {/* Yeh aapke baaki pages ka content hai */}
        {children}
        
      </body>
    </html>
  );
}