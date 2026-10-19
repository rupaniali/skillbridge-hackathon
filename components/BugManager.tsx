"use client";

import { useState, useEffect } from "react";
import { supabase } from "../app/supabase"; 

export default function BugManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bugTitle, setBugTitle] = useState("");
  const [theProblem, setTheProblem] = useState("");
  const [theSolution, setTheSolution] = useState("");
  const [timeTaken, setTimeTaken] = useState("");
  const [bugs, setBugs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBugs = async () => {
    const { data: authData } = await supabase.auth.getSession();
    if (authData?.session?.user) {
      const { data } = await supabase
        .from("toughest_bugs")
        .select("*")
        .eq("user_id", authData.session.user.id)
        .order("created_at", { ascending: false });
      
      if (data) setBugs(data);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data: authData } = await supabase.auth.getSession();
    if (!authData?.session?.user) return;

    const { error } = await supabase.from("toughest_bugs").insert([
      {
        user_id: authData.session.user.id,
        bug_title: bugTitle,
        the_problem: theProblem,
        the_solution: theSolution,
        time_taken: timeTaken,
      },
    ]);

    setIsLoading(false);
    if (!error) {
      setIsModalOpen(false);
      setBugTitle("");
      setTheProblem("");
      setTheSolution("");
      setTimeTaken("");
      fetchBugs();
    } else {
      alert("Error saving your bug details!");
    }
  };

const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this bug report?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("toughest_bugs").delete().eq("id", id);
    if (!error) {
      setBugs(bugs.filter((b) => b.id !== id));
    } else {
      alert("Error deleting bug!");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F] flex items-center gap-2">
            <span>🐛</span> Toughest Bugs Fixed
          </h2>
          <p className="text-sm text-gray-500">Show recruiters your real-world debugging skills.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-red-50 text-red-600 border border-red-200 px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-red-100 transition"
        >
          + Add a Bug
        </button>
      </div>

      {bugs.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500 text-sm">No bugs added yet. Share a legendary bug you crushed!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {bugs.map((b) => (
            <div key={b.id} className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm hover:border-red-200 transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-[#0A192F]">{b.bug_title}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">
                  ⏱️ Fixed in: {b.time_taken}
                </span>
                <button 
        onClick={() => handleDelete(b.id)}
        className="text-gray-400 hover:text-red-500 transition px-1"
        title="Delete Bug"
      >
        🗑️
      </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <h4 className="text-xs font-extrabold text-red-800 uppercase tracking-wider mb-1">The Nightmare (Problem)</h4>
                  <p className="text-sm text-red-900 whitespace-pre-wrap">{b.the_problem}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <h4 className="text-xs font-extrabold text-green-800 uppercase tracking-wider mb-1">The Fix (Solution)</h4>
                  <p className="text-sm text-green-900 whitespace-pre-wrap">{b.the_solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-lg font-bold transition"
            >
              ✕
            </button>
            <h2 className="text-2xl font-extrabold mb-1 text-[#0A192F]">Log a Tough Bug</h2>
            <p className="text-sm text-gray-500 mb-6">What went wrong, and how did you play the hero?</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Bug Title</label>
                {/* 🚀 FIX: text-black and placeholder-gray-400 added */}
                <input 
                  type="text" required placeholder="e.g., Infinite Loop in Payment Gateway" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                  value={bugTitle} onChange={(e) => setBugTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">The Problem</label>
                {/* 🚀 FIX: text-black and placeholder-gray-400 added */}
                <textarea 
                  required placeholder="What was breaking and why was it hard to find?" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 bg-white h-20 resize-none focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                  value={theProblem} onChange={(e) => setTheProblem(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Your Solution</label>
                {/* 🚀 FIX: text-black and placeholder-gray-400 added */}
                <textarea 
                  required placeholder="How did you fix it? What was the root cause?" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 bg-white h-20 resize-none focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  value={theSolution} onChange={(e) => setTheSolution(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Time Taken to Fix</label>
                {/* 🚀 FIX: text-black and placeholder-gray-400 added */}
                <input 
                  type="text" required placeholder="e.g., 4 Hours, 3 Days" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                  value={timeTaken} onChange={(e) => setTimeTaken(e.target.value)}
                />
              </div>

              <button 
                type="submit" disabled={isLoading}
                className="w-full bg-[#0A192F] text-white font-extrabold py-3 rounded-lg mt-2 hover:bg-gray-800 transition disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Bug Report"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}