"use client";

import { useState } from "react";

export default function ResumePage() {
  // Form ke data ko store karne ke liye state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "",
    skills: "",
    experience: "",
  });

  // Resume generate hua ya nahi, ye check karne ke liye state
  const [isGenerated, setIsGenerated] = useState(false);

  // Jab user kuch type karega, toh ye function data update karega
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[#0A192F] mb-2 text-center">
          Build Your Professional Resume
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Fill in your details below to generate a professional resume.
        </p>

        {/* Agar resume generate nahi hua hai, toh Form dikhao */}
        {!isGenerated ? (
          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-black bg-white focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-black bg-white focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Education</label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-black bg-white focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  placeholder="E.g., B.Tech in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-black bg-white focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  placeholder="React, Next.js, JavaScript, Tailwind"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Professional Experience</label>
                <textarea
                  rows={4}
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-black bg-white focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  placeholder="Describe your previous work experience or projects..."
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsGenerated(true)}
                  className="w-full bg-[#0A192F] text-white font-bold py-3 px-4 rounded-md hover:bg-blue-900 transition-colors shadow-sm"
                >
                  Generate Resume
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Agar Generate button click ho gaya, toh ye Live Resume dikhega */
          <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200 mt-6">
            <div className="border-b-4 border-[#0A192F] pb-6 mb-6">
              <h2 className="text-4xl font-extrabold text-[#0A192F] uppercase">{formData.name || "Your Name"}</h2>
              <p className="text-gray-600 mt-2">{formData.email || "your.email@example.com"}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0A192F] mb-2 uppercase border-b-2 border-gray-100 pb-1">Education</h3>
              <p className="text-gray-800 text-lg">{formData.education || "Your Education Details"}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0A192F] mb-2 uppercase border-b-2 border-gray-100 pb-1">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills ? formData.skills.split(',').map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-[#0A192F] px-3 py-1 rounded-full text-sm font-semibold border border-gray-200">
                    {skill.trim()}
                  </span>
                )) : (
                  <span className="text-gray-500 italic">No skills added yet</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#0A192F] mb-2 uppercase border-b-2 border-gray-100 pb-1">Experience / Projects</h3>
              <p className="text-gray-800 whitespace-pre-line">{formData.experience || "Your professional experience will appear here."}</p>
            </div>

            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => setIsGenerated(false)}
                className="bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded hover:bg-gray-300 transition-colors"
              >
                Edit Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}