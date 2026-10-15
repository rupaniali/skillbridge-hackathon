"use client";
import { useState } from "react";

export default function ResumePage() {
  const [data, setData] = useState({
    name: "Dexter",
    role: "Full Stack Developer",
    email: "dexter@example.com",
    phone: "+91 9876543210",
    github: "github.com/dexter-dev",
    linkedin: "linkedin.com/in/dexter",
    skills: "Next.js, React, Supabase, PHP, Tailwind CSS, Git",
    education: "S.Y. B.Com",
    eduCollege: "Pillai University",
    expCompany: "HackCelestial 3.0 Hackathon",
    expRole: "Frontend & AI Integration",
    expDuration: "September 2026",
    expDesc: "Built a weather-driven AI Digital Twin simulation layer. Developed SkillBridge platform featuring GitHub profile verification, Next.js route protection, and Supabase authentication."
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 print:p-0 print:m-0 print:bg-white">
      
      {/* 🚀 Header section (Hides on print) */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-[#0A192F]">Live Resume Builder</h1>
          <p className="text-gray-500 text-sm mt-1">Fill details on the left, see preview on the right.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="bg-[#00d09c] text-[#0A192F] px-6 py-3 rounded-lg font-bold hover:bg-teal-400 transition shadow-md flex items-center gap-2 cursor-pointer"
        >
          📄 Download PDF
        </button>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-2 gap-10 print:block print:w-full">
        
        {/* ================= LEFT SIDE: INPUT FORM (HIDES ON PRINT) ================= */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 print:hidden overflow-y-auto max-h-[75vh] custom-scrollbar">
          
          <h2 className="text-xl font-bold text-[#0A192F] mb-4 border-b pb-2">Personal Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Full Name" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="role" value={data.role} onChange={handleChange} placeholder="Job Role" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="github" value={data.github} onChange={handleChange} placeholder="GitHub URL" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="linkedin" value={data.linkedin} onChange={handleChange} placeholder="LinkedIn URL" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
          </div>

          <h2 className="text-xl font-bold text-[#0A192F] mb-4 border-b pb-2">Skills</h2>
          <div className="mb-6">
            <input type="text" name="skills" value={data.skills} onChange={handleChange} placeholder="React, Node.js, etc." className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
          </div>

          <h2 className="text-xl font-bold text-[#0A192F] mb-4 border-b pb-2">Experience / Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" name="expCompany" value={data.expCompany} onChange={handleChange} placeholder="Project or Company Name" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="expRole" value={data.expRole} onChange={handleChange} placeholder="Role" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="expDuration" value={data.expDuration} onChange={handleChange} placeholder="Duration (e.g. Sept 2026)" className="border rounded p-2 text-sm text-gray-900 font-medium w-full md:col-span-2 focus:outline-none focus:border-[#00d09c]" />
          </div>
          <textarea name="expDesc" value={data.expDesc} onChange={handleChange} placeholder="What did you build?" rows={3} className="border rounded p-2 text-sm text-gray-900 font-medium w-full mb-6 focus:outline-none focus:border-[#00d09c]"></textarea>

          <h2 className="text-xl font-bold text-[#0A192F] mb-4 border-b pb-2">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="education" value={data.education} onChange={handleChange} placeholder="Degree (e.g. S.Y. B.Com)" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
            <input type="text" name="eduCollege" value={data.eduCollege} onChange={handleChange} placeholder="University/College" className="border rounded p-2 text-sm text-gray-900 font-medium w-full focus:outline-none focus:border-[#00d09c]" />
          </div>
        </div>

        {/* ================= RIGHT SIDE: A4 LIVE PREVIEW ================= */}
        {/* Is div ko fix kiya gaya hai taaki margin/padding ekdum perfect A4 jaisi aaye */}
        <div className="flex justify-center print:block print:w-full print:m-0">
          <div className="bg-white p-12 md:p-14 border border-gray-200 shadow-lg w-full max-w-[210mm] min-h-[297mm] print:shadow-none print:border-none print:p-12 print:mx-auto">
            
            {/* Header */}
            <div className="border-b-2 border-gray-800 pb-5 mb-8">
              <h1 className="text-4xl font-extrabold text-gray-900 uppercase tracking-tight">{data.name || "Your Name"}</h1>
              <p className="text-xl text-[#00d09c] font-semibold mt-2">{data.role}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-sm text-gray-700 font-medium">
                {data.email && <span className="flex items-center gap-1">📧 {data.email}</span>}
                {data.phone && <span className="flex items-center gap-1">📱 {data.phone}</span>}
                {data.github && <span className="flex items-center gap-1">💻 {data.github}</span>}
                {data.linkedin && <span className="flex items-center gap-1">🔗 {data.linkedin}</span>}
              </div>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-2 mb-4">Technical Skills</h2>
              <p className="text-gray-800 font-medium leading-relaxed">{data.skills}</p>
            </div>

            {/* Experience / Projects Section */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-2 mb-5">Experience & Projects</h2>
              
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{data.expCompany}</h3>
                  <span className="text-sm font-bold text-[#00d09c]">{data.expDuration}</span>
                </div>
                <p className="text-md font-semibold text-gray-700 italic mb-3">{data.expRole}</p>
                <ul className="list-disc list-outside ml-6 text-gray-700 text-sm leading-relaxed space-y-1">
                  <li>{data.expDesc}</li>
                </ul>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-2 mb-5">Education</h2>
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold text-gray-900">{data.education}</h3>
              </div>
              <p className="text-md font-semibold text-gray-700 italic">{data.eduCollege}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}