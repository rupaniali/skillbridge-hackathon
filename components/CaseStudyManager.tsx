"use client";

import { useState, useEffect } from "react";
import { supabase } from "../app/supabase"; // Path check kar lena agar error aaye

export default function CaseStudyManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [techStack, setTechStack] = useState("");
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Database se purani case studies lana
  const fetchCaseStudies = async () => {
    const { data: authData } = await supabase.auth.getSession();
    if (authData?.session?.user) {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("user_id", authData.session.user.id)
        .order("created_at", { ascending: false });
      
      if (data) setCaseStudies(data);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  // Nayi case study database mein save karna
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const { data: authData } = await supabase.auth.getSession();
    if (!authData?.session?.user) return;

    const { error } = await supabase.from("case_studies").insert([
      {
        user_id: authData.session.user.id,
        title: title,
        description: problemSolved,
        tech_stack: techStack,
      },
    ]);

    setIsLoading(false);
    if (!error) {
      setIsModalOpen(false);
      setTitle("");
      setProblemSolved("");
      setTechStack("");
      fetchCaseStudies(); // List ko turant refresh karo
    } else {
      alert("Error saving case study!");
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F]">Private Case Studies (NDA)</h2>
          <p className="text-sm text-gray-500">Showcase your enterprise & client work privately.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0A192F] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-800 transition"
        >
          + Add Case Study
        </button>
      </div>

      {/* List of existing case studies */}
      {caseStudies.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-500 text-sm">No private case studies added yet. Prove your skills safely!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="border border-gray-200 p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-[#0A192F] mb-1">{cs.title}</h3>
              <div className="inline-block bg-[#e6fbf5] text-[#00d09c] text-xs font-bold px-2 py-1 rounded mb-3">
                {cs.tech_stack}
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{cs.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Popup Form (Modal) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative animate-fade-in-up">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-lg font-bold transition"
            >
              ✕
            </button>
            <h2 className="text-2xl font-extrabold mb-1 text-[#0A192F]">Add Private Project</h2>
            <p className="text-sm text-gray-500 mb-6">Describe your work without revealing confidential client details.</p>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Project Title / Theme</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., High-Traffic E-Commerce Backend" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d09c] focus:ring-1 focus:ring-[#00d09c]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Problem Solved & Your Logic</label>
                <textarea 
                  required
                  placeholder="Describe the technical challenges, system design, and how you solved them..." 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm h-28 resize-none focus:outline-none focus:border-[#00d09c] focus:ring-1 focus:ring-[#00d09c]"
                  value={problemSolved}
                  onChange={(e) => setProblemSolved(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tech Stack Used</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Next.js, Node.js, PostgreSQL" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d09c] focus:ring-1 focus:ring-[#00d09c]"
                  value={techStack}
                  onChange={(e) => setTechStack(e.target.value)}
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-[#00d09c] text-white font-extrabold py-3 rounded-lg mt-2 hover:bg-[#00b386] transition disabled:opacity-50"
              >
                {isLoading ? "Saving Securely..." : "Save Case Study"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}