"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

const staticJobs = [
  {
    id: "dummy-1",
    title: "Senior Full Stack Developer",
    company: "TechCorp Global",
    salary: "₹20 LPA - ₹35 LPA",
    location: "Remote",
    type: "Full-time",
    created_at: "2026-10-01"
  },
  {
    id: "dummy-2",
    title: "React & Next.js Engineer",
    company: "InnovateLabs",
    salary: "₹15 LPA - ₹25 LPA",
    location: "Mumbai",
    type: "Full-time",
    created_at: "2026-10-05"
  },
  {
    id: "dummy-3",
    title: "Backend Node.js Specialist",
    company: "CloudScale Systems",
    salary: "₹18 LPA - ₹28 LPA",
    location: "Bangalore",
    type: "Part-time",
    created_at: "2026-10-08"
  },
  {
    id: "dummy-4",
    title: "Junior Data Analyst",
    company: "Fractal Analytics",
    salary: "₹8 LPA - ₹12 LPA",
    location: "Mumbai / Hybrid",
    type: "Internship",
    created_at: "2026-10-10"
  },
  {
    id: "dummy-5",
    title: "Senior Data Scientist",
    company: "Deloitte",
    salary: "₹16 LPA - ₹24 LPA",
    location: "Bangalore / Remote",
    type: "Full-time",
    created_at: "2026-10-12"
  },
  {
    id: "dummy-6",
    title: "Business Intelligence Analyst",
    company: "Mu Sigma",
    salary: "₹10 LPA - ₹15 LPA",
    location: "Pune / Remote",
    type: "Part-time",
    created_at: "2026-10-14"
  }
];

export default function JobsPage() {
  const [dbJobs, setDbJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const fetchLiveJobs = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching jobs:", error);
        } else if (data) {
          setDbJobs(data.map(j => ({ ...j, type: j.type || "Full-time" })));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveJobs();
  }, []);

  const allJobs = [...dbJobs, ...staticJobs];

  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = 
      selectedLocation === "All" || job.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesType = 
      selectedType === "All" || (job.type && job.type.toLowerCase() === selectedType.toLowerCase());

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-black p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-black">Recommended Jobs</h1>
          <p className="text-black font-extrabold mt-2">Explore verified job openings and match your skills instantly.</p>
        </div>

        {/* Search & Filter Bar with Job Type Filter */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-300 mb-8 flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            placeholder="Search by job title or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border border-gray-400 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c]"
          />
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c] bg-white cursor-pointer"
          >
            <option value="All">All Locations</option>
            <option value="Remote">Remote</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
          </select>

          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-400 rounded-xl px-4 py-3 text-sm font-bold text-black focus:outline-none focus:border-[#00d09c] bg-white cursor-pointer"
          >
            <option value="All">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-black font-extrabold text-lg animate-pulse">
            Loading jobs...
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-white border border-gray-300 rounded-2xl p-12 text-center shadow-sm">
            <h3 className="text-xl font-extrabold text-black mb-2">No jobs found</h3>
            <p className="text-black font-bold">Try searching with a different keyword or filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-3 gap-2">
                    <span className="bg-teal-100 text-black text-xs font-extrabold px-3 py-1 rounded-full border border-teal-300">
                      {job.location || "Remote"}
                    </span>
                    <span className="bg-gray-200 text-black text-xs font-extrabold px-3 py-1 rounded-full">
                      {job.type || "Full-time"}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-black mb-1">{job.title}</h3>
                  <p className="text-sm font-extrabold text-black mb-4">{job.company}</p>

                  <div className="text-sm font-extrabold text-black mb-6 bg-gray-50 p-3 rounded-xl border border-gray-200">
                    💰 {job.salary || "Competitive"}
                  </div>
                </div>

                <Link href="/resume">
                  <button className="w-full bg-[#0A192F] hover:bg-black text-white font-extrabold py-3 rounded-xl transition shadow-sm cursor-pointer text-sm">
                    Apply with Resume →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}