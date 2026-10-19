"use client";

import { useState, useEffect } from "react";
import { supabase } from "../app/supabase";

export default function PeerEndorsements() {
  const [endorsements, setEndorsements] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const fetchEndorsements = async () => {
    const { data: authData } = await supabase.auth.getSession();
    if (authData?.session?.user) {
      const { data } = await supabase
        .from("peer_endorsements")
        .select("*")
        .eq("endorsed_user_id", authData.session.user.id)
        .order("created_at", { ascending: false });
      
      if (data) setEndorsements(data);
    }
  };

  useEffect(() => {
    fetchEndorsements();
  }, []);

  const handleTestEndorse = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { data: authData } = await supabase.auth.getSession();
    if (!authData?.session?.user) return;

    const { error } = await supabase.from("peer_endorsements").insert([
      {
        endorsed_user_id: authData.session.user.id,
        endorser_user_id: authData.session.user.id,
        skill_name: skillInput,
      },
    ]);

    setIsLoading(false);
    if (!error) {
      setSkillInput("");
      fetchEndorsements();
    } else {
      if (error.code === '23505') {
        alert("You are already endorsed for this skill!");
      } else {
        alert("Error adding endorsement!");
      }
    }
  };

  // 🚀 Naya Delete Endorsement Function
  const handleDeleteEndorsement = async (skillName: string) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete your vouch for ${skillName}?`);
    if (!confirmDelete) return;

    const { data: authData } = await supabase.auth.getSession();
    if (!authData?.session?.user) return;

    const { error } = await supabase
      .from("peer_endorsements")
      .delete()
      .eq("endorser_user_id", authData.session.user.id)
      .eq("skill_name", skillName);

    if (!error) {
      fetchEndorsements();
    } else {
      alert("Error deleting endorsement!");
    }
  };

  const groupedEndorsements = endorsements.reduce((acc, curr) => {
    acc[curr.skill_name] = (acc[curr.skill_name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="mt-10 border-t border-gray-200 pt-8 mb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-extrabold text-[#0A192F] flex items-center gap-2">
            <span>🤝</span> Verified Peer Endorsements
          </h2>
          <p className="text-sm text-gray-500">Only developers who passed the Skill Mock Test can vouch for you.</p>
        </div>
      </div>

      <div className="bg-[#f0f4f8] border border-[#d9e2ec] p-5 rounded-xl shadow-sm mb-6">
        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">🛠️ Dev Test Mode: Simulate an Endorsement</h3>
        <form onSubmit={handleTestEndorse} className="flex flex-col sm:flex-row gap-3">
          <input 
            type="text" required placeholder="e.g. Next.js, System Design" 
            className="w-full sm:w-64 border border-gray-300 rounded-lg px-4 py-2 text-sm text-black placeholder-gray-400 bg-white focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
          />
          <button 
            type="submit" disabled={isLoading}
            className="bg-[#0A192F] text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition disabled:opacity-50 whitespace-nowrap"
          >
            {isLoading ? "Vouching..." : "Simulate Endorsement"}
          </button>
        </form>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
        {Object.keys(groupedEndorsements).length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No peers have vouched for your skills yet. Take a Mock Test to invite endorsements!</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {Object.entries(groupedEndorsements).map(([skill, count]) => (
              <div key={skill} className="flex items-center bg-[#f0fdf9] border border-[#00d09c] rounded-full pl-4 pr-2 py-1.5 shadow-sm">
                <span className="font-extrabold text-[#0A192F] text-sm mr-2">{skill}</span>
                <span className="bg-[#00d09c] text-white text-xs font-bold px-2 py-0.5 rounded-full mr-2">
                  ✓ {String(count)} Vouches
                </span>
                <button 
                  onClick={() => handleDeleteEndorsement(skill)}
                  className="text-[#00d09c] hover:bg-red-50 hover:text-red-500 rounded-full p-1 transition"
                  title="Delete this Endorsement"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}