import Link from "next/link";

export default function JobsPage() {
  // Demo ke liye kuch Jobs ka data
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer (Next.js)",
      company: "TechNova Solutions",
      location: "Remote / Mumbai",
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
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A192F] mb-4">
            Explore Entry-Level Jobs
          </h1>
          <p className="text-gray-600 text-lg">
            Aapke skills se match karti hui best opportunities.
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div>
                <h2 className="text-xl font-bold text-[#0A192F]">{job.title}</h2>
                <div className="text-gray-600 mt-1 font-medium">{job.company}</div>
                
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
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
                    <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-auto mt-4 md:mt-0">
                <Link href="/resume">
                  <button className="w-full md:w-auto bg-[#0A192F] text-white font-bold py-2 px-6 rounded-md hover:bg-blue-900 transition-colors">
                    Apply with Resume
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}