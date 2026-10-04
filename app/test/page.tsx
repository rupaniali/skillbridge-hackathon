"use client";
import { useState } from "react";
import Link from "next/link";

export default function TestPage() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    "It is a direct copy of the HTML DOM.",
    "It is a lightweight JavaScript representation of the real DOM.",
    "It is a database used by React to store user data.",
    "It is a styling engine for CSS in JS."
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Test Header */}
      <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-blue-600">SkillBridge Assessment</h1>
          <p className="text-sm text-slate-500 font-medium">Frontend React Developer</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
            ⏱ 14:59
          </div>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 font-medium">
            Exit Test
          </Link>
        </div>
      </header>

      {/* Main Test Area */}
      <main className="max-w-3xl mx-auto mt-12 px-4 pb-20">
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
            <span>Question 1 of 10</span>
            <span>10% Completed</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full w-[10%]"></div>
          </div>
        </div>

        {/* Question Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 leading-relaxed mb-6">
            What is the "Virtual DOM" in React and why is it used?
          </h2>

          <div className="space-y-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedOption(index)}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all font-medium text-lg
                  ${selectedOption === index 
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md' 
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                  }`}
              >
                <span className="inline-block w-8 h-8 rounded-lg bg-white border border-slate-200 text-center leading-7 mr-4 text-slate-500">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button className="text-slate-500 font-bold hover:text-slate-800 px-4 py-2">
            ← Previous
          </button>
          
          <button 
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-md
              ${selectedOption !== null 
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1' 
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
          >
            Submit & Next →
          </button>
        </div>
      </main>
    </div>
  );
}