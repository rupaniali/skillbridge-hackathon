import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-teal-500 selection:text-white">
      
      {/* 1. Navbar */}
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border-2 border-dashed border-teal-400 rounded-md flex items-center justify-center text-[10px] text-teal-400">
            LOGO
          </div>
          <span className="text-2xl font-bold tracking-wide">
            <span className="text-white">Skill</span>
            <span className="text-teal-400">Bridge</span>
          </span>
        </div>
        <Link href="/login" className="text-white hover:text-teal-400 font-semibold transition-colors">
          Sign In
        </Link>
      </nav>

      {/* 2. Hero Section (Main Content) */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center text-center">
        
        {/* Hackathon Badge */}
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium">
          🚀 Bridging the Skills Gap
        </div>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
          Launch Your Tech Career <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Based on Real Skills.
          </span>
        </h1>
        
        {/* Sub-headline */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12">
          Stop writing fake resumes. Connect your GitHub, verify your live coding data, and get AI-matched with top industry jobs in seconds.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link 
            href="/login" 
            className="bg-teal-500 hover:bg-teal-400 text-[#0f172a] font-bold text-lg px-8 py-4 rounded-lg shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all hover:scale-105"
          >
            Get Started Now &rarr;
          </Link>
          <a 
            href="#features" 
            className="bg-white/5 hover:bg-white/10 text-white font-bold text-lg px-8 py-4 rounded-lg border border-gray-700 transition-all"
          >
            How it works
          </a>
        </div>
      </main>

    </div>
  );
}