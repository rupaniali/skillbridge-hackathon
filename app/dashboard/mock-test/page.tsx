"use client";

import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What does ATS stand for in recruitment software?",
    options: [
      "Application Tracking System",
      "Automated Testing Script",
      "Advanced Tech Security",
      "Async Transfer Service"
    ],
    answer: 0
  },
  {
    id: 2,
    question: "Which of the following is a core feature of Next.js App Router?",
    options: [
      "Server Components by default",
      "Client-only rendering",
      "No routing support",
      "Strictly CSS modules required"
    ],
    answer: 0
  },
  {
    id: 3,
    question: "Why is Git/GitHub integration crucial for modern developers?",
    options: [
      "To store heavy movie files",
      "To verify real coding activity and collaboration",
      "To design UI components faster",
      "To host databases"
    ],
    answer: 1
  }
];

export default function MockTestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="bg-[#0A192F] text-white p-4 flex justify-between items-center shadow-md">
        <Link href="/dashboard" className="text-2xl font-extrabold flex items-center gap-2 tracking-tight cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#00d09c]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span className="text-white">Skill</span><span className="text-[#00d09c]">Bridge</span>
        </Link>
        <Link href="/dashboard" className="text-sm font-semibold text-gray-300 hover:text-white transition">
          ← Back to Dashboard
        </Link>
      </nav>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto p-6 md:p-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
          
          {!isCompleted ? (
            <div>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00d09c] bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                  Skill Verification Test
                </span>
                <span className="text-sm text-gray-500 font-medium">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#0A192F] mb-6">
                {questions[currentQuestion].question}
              </h2>

              <div className="space-y-3 mb-8">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={`w-full text-left p-4 rounded-xl border transition font-medium text-sm md:text-base ${
                      selectedOption === index 
                        ? 'border-[#00d09c] bg-teal-50/50 text-[#0A192F]' 
                        : 'border-gray-200 bg-white hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-gray-400">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={`w-full py-3.5 rounded-xl font-bold text-white transition shadow-sm ${
                  selectedOption === null 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-[#00d09c] hover:bg-teal-600 text-[#0A192F]'
                }`}
              >
                {currentQuestion + 1 === questions.length ? "Submit Test" : "Next Question →"}
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-extrabold text-[#0A192F] mb-2">Test Completed!</h2>
              <p className="text-gray-500 mb-6">
                You scored <span className="font-bold text-[#00d09c] text-xl">{score}</span> out of <span className="font-bold">{questions.length}</span>
              </p>

              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-8 max-w-md mx-auto text-sm font-medium">
                ✅ Your technical competency badge has been updated on your profile!
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/dashboard" className="bg-[#0A192F] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition">
                  Return to Dashboard
                </Link>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}