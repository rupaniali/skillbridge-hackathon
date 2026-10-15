"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// 🚀 REAL-WORLD QUESTION BANK BASED ON FIELDS
const questionBank: Record<string, any[]> = {
  "Frontend Development": [
    {
      question: "What is the primary purpose of the Virtual DOM in React?",
      options: [
        "To directly modify the browser's HTML for faster updates",
        "To keep a lightweight in-memory representation of the UI to optimize re-rendering",
        "To act as a backend database for React applications",
        "To handle routing between different pages automatically"
      ],
      answer: 1
    },
    {
      question: "Which Tailwind CSS class is used to hide an element on screens smaller than 768px?",
      options: ["md:hidden", "hidden md:block", "sm:invisible", "lg:hide"],
      answer: 1
    },
    {
      question: "What is the main advantage of Server-Side Rendering (SSR) in Next.js?",
      options: [
        "It eliminates the need for CSS",
        "It executes all JavaScript on the client side",
        "It improves SEO and initial page load speed",
        "It prevents users from taking screenshots of the app"
      ],
      answer: 2
    }
  ],
  "Backend Development": [
    {
      question: "Which of the following is a key characteristic of RESTful APIs?",
      options: [
        "They maintain user state on the server across multiple requests",
        "They rely on GraphQL queries for data fetching",
        "They are stateless and use standard HTTP methods (GET, POST, PUT, DELETE)",
        "They strictly require XML as the data exchange format"
      ],
      answer: 2
    },
    {
      question: "What is the primary role of a JWT (JSON Web Token)?",
      options: [
        "To securely transmit information between parties as a JSON object for authentication",
        "To compress large image files on the server",
        "To encrypt passwords in a database",
        "To replace SQL databases entirely"
      ],
      answer: 0
    },
    {
      question: "In PostgreSQL, what does a FOREIGN KEY constraint ensure?",
      options: [
        "That all values in a column are unique",
        "That the database can be accessed by external IP addresses",
        "Referential integrity by linking data in one table to another table",
        "That the column cannot contain NULL values"
      ],
      answer: 2
    }
  ],
  "Data Analytics": [
    {
      question: "In Python, which Pandas method is used to view the first 5 rows of a DataFrame?",
      options: [".top()", ".show()", ".start()", ".head()"],
      answer: 3
    },
    {
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Sequential Query Logic",
        "Standard Question Language",
        "Systematic Query Language"
      ],
      answer: 0
    },
    {
      question: "Which chart type is best suited for showing a trend over time?",
      options: ["Pie Chart", "Line Chart", "Scatter Plot", "Histogram"],
      answer: 1
    }
  ]
};

export default function MockTestPage() {
  // 🚀 New States for Start Screen and Domain Selection
  const [isStarted, setIsStarted] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState("Frontend Development");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Timer State (5 Minutes)
  const [timeLeft, setTimeLeft] = useState(300);

  const activeQuestions = questionBank[selectedDomain];

  // 🚀 Timer Logic: Sirf tab chalega jab test Start ho chuka ho
  useEffect(() => {
    if (!isStarted || isCompleted || timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerId);
          setIsCompleted(true); // Auto-Submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isStarted, isCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === activeQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < activeQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pt-6">
      <main className="max-w-3xl mx-auto p-6 md:p-12">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10">
          
          {/* ================= STEP 1: START SCREEN ================= */}
          {!isStarted ? (
            <div className="text-center py-6 animate-fade-in-up">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-teal-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#00d09c]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-extrabold text-[#0A192F] mb-3">Skill Assessment</h2>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">Select your domain of expertise to begin the verified mock test. The timer will start immediately after you click start.</p>
              
              <div className="max-w-xs mx-auto mb-8 text-left">
                <label className="block text-sm font-bold text-gray-700 mb-2">Choose Assessment Domain:</label>
                <select 
                  value={selectedDomain} 
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#00d09c] cursor-pointer shadow-sm"
                >
                  {Object.keys(questionBank).map(domain => (
                    <option key={domain} value={domain}>{domain}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/dashboard">
                  <button className="px-6 py-3 rounded-lg font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                    Cancel
                  </button>
                </Link>
                <button 
                  onClick={() => setIsStarted(true)}
                  className="bg-[#0A192F] text-white px-8 py-3 rounded-lg font-bold shadow-md hover:bg-gray-800 transition cursor-pointer flex items-center gap-2"
                >
                  Start Test ⏱
                </button>
              </div>
            </div>
          ) : 
          
          /* ================= STEP 2: TEST SCREEN ================= */
          !isCompleted ? (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#00d09c] bg-teal-50 px-3 py-1 rounded-full border border-teal-100 mb-2 inline-block">
                    {selectedDomain} Test
                  </span>
                  <div className="text-sm text-gray-500 font-medium">
                    Question {currentQuestion + 1} of {activeQuestions.length}
                  </div>
                </div>
                
                <div className={`text-lg font-extrabold px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${
                  timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-gray-100 text-gray-700 border-gray-200'
                }`}>
                  ⏱ {formatTime(timeLeft)}
                </div>
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-[#0A192F] mb-6">
                {activeQuestions[currentQuestion].question}
              </h2>

              <div className="space-y-3 mb-8">
                {activeQuestions[currentQuestion].options.map((option: string, index: number) => (
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
                {currentQuestion + 1 === activeQuestions.length ? "Submit Test" : "Next Question →"}
              </button>
            </div>
          ) : 
          
          /* ================= STEP 3: RESULT SCREEN ================= */
          (
            <div className="text-center py-8 animate-fade-in-up">
              <div className="text-6xl mb-4">{score === activeQuestions.length ? '🏆' : '🎉'}</div>
              <h2 className="text-3xl font-extrabold text-[#0A192F] mb-2">
                {timeLeft <= 0 ? 'Time Up!' : 'Assessment Completed!'}
              </h2>
              <p className="text-gray-500 mb-6">
                You scored <span className="font-bold text-[#00d09c] text-xl">{score}</span> out of <span className="font-bold">{activeQuestions.length}</span> in {selectedDomain}.
              </p>

              <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl mb-8 max-w-md mx-auto text-sm font-medium">
                ✅ Your technical competency badge has been updated on your profile!
              </div>

              <div className="flex justify-center gap-4">
                <Link href="/dashboard" className="bg-[#0A192F] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition shadow-sm cursor-pointer">
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