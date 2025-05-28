import React from 'react';

function LandingPage({ onStartQuiz }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8 animate-fadeIn">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-8 animate-bounce">
          🧠  Quiz Challenge
        </h1>
        
        <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-white mb-6">Quiz Features:</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature icon="⏱️" text="1 Minute Time Limit" />
            <Feature icon="📝" text="10 Diverse Questions" />
            <Feature icon="🔍" text="Review Options" />
            <Feature icon="📊" text="Detailed Summary" />
          </div>
        </div>

        <button 
          onClick={onStartQuiz}
          className="w-full md:w-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-lg transform transition-all hover:scale-105 focus:ring-4 ring-green-300 flex items-center justify-center gap-2 mx-auto"
        >
          Start Challenge 🚀
        </button>
      </div>
    </div>
  );
}

const Feature = ({ icon, text }) => (
  <div className="flex items-center space-x-3 text-white">
    <span className="text-2xl">{icon}</span>
    <span className="text-lg">{text}</span>
  </div>
);

export default LandingPage;
