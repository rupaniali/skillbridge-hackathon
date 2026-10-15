"use client";

import Link from "next/link";
import { useState } from "react";

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (Next.js)",
      company: "TechNova Solutions",
      location: "Remote",
      type: "Full-time",
      stipend: "₹6 LPA - ₹8 LPA",
      skills: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      id: 2,
      title: "UI/UX Design Intern",
      company: "Creative Studio",
      location: "Bangalore",
      type: "Internship",
      stipend: "₹20,000 / month",
      skills: ["Figma", "Prototyping", "Wireframing"],
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "DataCloud Inc.",
      location: "Remote",
      type: "Full-time",
      stipend: "₹8 LPA - ₹12 LPA",
      skills: ["Node.js", "Supabase", "PostgreSQL"],
    },
    {
      id: 4,
      title: "Full Stack PHP Developer",
      company: "WebCraft Agency",
      location: "Mumbai",
      type: "Full-time",
      stipend: "₹5 LPA - ₹7 LPA",
      skills: ["PHP", "Next.js", "MySQL"],
    },
    {
      id: 5,
      title: "E-commerce Operations Intern",
      company: "Lumina Lighting Co.",
      location: "Mumbai",
      type: "Internship",
      stipend: "₹15,000 / month",
      skills: ["Operations", "Excel", "Management"],
    },
    {
      id: 6,
      title: "React Native Developer",
      company: "AppSphere",
      location: "Bangalore",
      type: "Full-time",
      stipend: "₹7 LPA - ₹10 LPA",
      skills: ["React Native", "JavaScript", "Firebase"],
    },
    {
      id: 7,
      title: "Data Analyst Intern",
      company: "QuantMinds",
      location: "Remote",
      type: "Internship",
      stipend: "₹25,000 / month",
      skills: ["Python", "SQL", "Data Visualization"],
    },
    {
      id: 8,
      title: "DevOps Engineer",
      company: "CloudScale",
      location: "Mumbai",
      type: "Full-time",
      stipend: "₹10 LPA - ₹15 LPA",
      skills: ["AWS", "Docker", "CI/CD"],
    },
    {
      id: 9,
      title: "Graphic Designer",
      company: "Visionary Arts",
      location: "Remote",
      type: "Full-time",
      stipend: "₹4 LPA - ₹6 LPA",
      skills: ["Illustrator", "Photoshop", "Branding"],
    },
    {
      id: 10,
      title: "Junior QA Tester",
      company: "BugFree Tech",
      location: "Bangalore",
      type: "Internship",
      stipend: "₹18,000 / month",
      skills: ["Testing", "Selenium", "Automation"],
    },
    {
      id: 11,
      title: "Cybersecurity Analyst",
      company: "SecureNet",
      location: "Mumbai",
      type: "Full-time",
      stipend: "₹9 LPA - ₹14 LPA",
      skills: ["Network Security", "Linux", "Penetration Testing"],
    },
    {
      id: 12,
      title: "Product Management Trainee",
      company: "InnovateX",
      location: "Remote",
      type: "Internship",
      stipend: "₹30,000 / month",
      skills: ["Agile", "Strategy", "Communication"],
    },
  ];

  // 🚀 Live Filtering Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      
    const matchesType = typeFilter === "All" || job.type === typeFilter;
    const matchesLocation = locationFilter === "All" || job.location.includes(locationFilter);

    return matchesSearch && matchesType && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-[#0A192F] mb-4">
            Explore Entry Level Jobs
          </h1>
          <p className="text-gray-600 text-lg">
            The best opportunities that match your verified skills.
          </p>
        </div>

        {/* 🚀 Search & Filter Section */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search by job title, company, or skill..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c]"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c] cursor-pointer"
            >
              <option value="All">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
            </select>
            <select 
              value={locationFilter} 
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c] cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        {/* 🚀 Jobs List */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h2 className="text-xl font-bold text-[#0A192F]">{job.title}</h2>
                  <div className="text-gray-600 mt-1 font-medium">{job.company}</div>
                  
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <span>📍</span> {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💼</span> {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💰</span> {job.stipend}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="w-full md:w-auto mt-4 md:mt-0 flex flex-col gap-2">
                  <Link href="/resume">
                    <button className="w-full md:w-auto bg-[#0A192F] text-white font-bold py-2.5 px-6 rounded-lg hover:bg-gray-800 transition-colors shadow-sm cursor-pointer">
                      Apply with Resume
                    </button>
                  </Link>
                  <span className="text-xs text-gray-400 text-center font-medium">Redirects to Resume Builder</span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-xl font-bold text-[#0A192F]">No jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}