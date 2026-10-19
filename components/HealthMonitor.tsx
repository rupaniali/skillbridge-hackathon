"use client";

import { useState, useEffect } from "react";
import { supabase } from "../app/supabase";

export default function HealthMonitor() {
  const [projects, setProjects] = useState<any[]>([]);
  const [projectName, setProjectName] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    const { data: authData } = await supabase.auth.getSession();
    if (authData?.session?.user) {
      const { data } = await supabase
        .from("live_projects")
        .select("*")
        .eq("user_id", authData.session.user.id)
        .order("created_at", { ascending: false });
      if (data) setProjects(data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: authData } = await supabase.auth.getSession();
    if (!authData?.session?.user) return;

    const { data: newProject, error } = await supabase
      .from("live_projects")
      .insert([
        {
          user_id: authData.session.user.id,
          project_name: projectName,
          project_url: projectUrl,
          status: "Pending ⏳",
        },
      ])
      .select()
      .single();

    if (error || !newProject) {
      alert("Error adding project!");
      setIsLoading(false);
      return;
    }

    setProjects([newProject, ...projects]);
    setProjectName("");
    setProjectUrl("");

    try {
      const res = await fetch("/api/check-health", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newProject.project_url }),
      });
      const { status } = await res.json();

      await supabase
        .from("live_projects")
        .update({ status: status, last_checked: new Date() })
        .eq("id", newProject.id);

      fetchProjects(); 
    } catch (err) {
      console.error("Health check failed");
    }

    setIsLoading(false);
  };

  // 🚀 Naya Delete Function
  const handleDeleteProject = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this project?");
    if (!confirmDelete) return;

    const { error } = await supabase.from("live_projects").delete().eq("id", id);
    
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id)); // Screen se turant hatao
    } else {
      alert("Error deleting project!");
    }
  };

  return (
    <div className="mt-10 border-t border-gray-200 pt-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F] flex items-center gap-2">
            <span>🟢</span> Live Project Health
          </h2>
          <p className="text-sm text-gray-500">Prove your websites are actually running with a 100% Uptime Badge.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 p-5 rounded-xl shadow-sm mb-6">
        <form onSubmit={handleAddProject} className="flex flex-col md:flex-row gap-3 items-end">
          <div className="w-full">
            <label className="block text-xs font-bold text-gray-700 mb-1">Project Name</label>
            <input 
              type="text" required placeholder="e.g. SkillBridge Platform" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:border-[#00d09c]"
              value={projectName} onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-bold text-gray-700 mb-1">Live URL (https://...)</label>
            <input 
              type="url" required placeholder="https://skillbridge.vercel.app" 
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:border-[#00d09c]"
              value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)}
            />
          </div>
          <button 
            type="submit" disabled={isLoading}
            className="bg-[#00d09c] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-[#00b386] transition whitespace-nowrap h-[38px] disabled:opacity-50"
          >
            {isLoading ? "Checking..." : "+ Add & Ping"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.length === 0 ? (
           <div className="col-span-full text-center text-sm text-gray-500 p-4 border border-dashed rounded-lg">No live projects tracked yet.</div>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between border border-gray-200 p-4 rounded-xl bg-gray-50 shadow-sm relative group">
              <div className="truncate pr-2">
                <h3 className="font-bold text-sm text-[#0A192F] truncate">{p.project_name}</h3>
                <a href={p.project_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline truncate block">
                  {p.project_url}
                </a>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-xs font-bold px-2 py-1 rounded-full border ${
                  p.status.includes("Live") ? "bg-green-100 text-green-700 border-green-200" : 
                  p.status.includes("Down") ? "bg-red-100 text-red-700 border-red-200" : 
                  "bg-yellow-100 text-yellow-700 border-yellow-200"
                }`}>
                  {p.status}
                </span>
                
                {/* 🚀 Delete Button Yahan Add Kiya */}
                <button 
                  onClick={() => handleDeleteProject(p.id)}
                  title="Remove Project"
                  className="text-gray-400 hover:text-red-500 transition px-1"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}