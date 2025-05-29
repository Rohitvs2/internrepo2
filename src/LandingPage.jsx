import React, { useState } from 'react';
import Login from './Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from 'react-router-dom';


const Feature = ({ icon, title, text, gradient }) => {
  return (
    <div className="group p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 hover:scale-105">
      <div className="flex items-start space-x-4">
        <div className={`text-4xl p-3 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center shadow-lg`}>
          <span className="filter drop-shadow-sm">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>
          <p className="text-white/70 text-lg leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

function LandingPage({ onStartQuiz }) {
  const [modalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-300 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Main title with enhanced animation */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-pulse">
            🧠 Quiz Challenge
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">
            Test your knowledge in 60 seconds
          </p>
        </div>
                
        {/* Features card with glassmorphism */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What Awaits You</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Feature 
              icon="⏱️" 
              title="Lightning Fast" 
              text="60 seconds to prove yourself" 
              gradient="from-red-400 to-orange-400"
            />
            <Feature 
              icon="📝" 
              title="Diverse Questions" 
              text="10 challenging topics to master" 
              gradient="from-blue-400 to-cyan-400"
            />
            <Feature 
              icon="🔍" 
              title="Smart Review" 
              text="Learn from every mistake" 
              gradient="from-green-400 to-emerald-400"
            />
            <Feature 
              icon="📊" 
              title="Detailed Analytics" 
              text="Track your progress and growth" 
              gradient="from-purple-400 to-pink-400"
            />
          </div>
        </div>

        {/* CTA Button with enhanced effects */}
        <div className="flex justify-center">
          <button
            onClick={onStartQuiz}
            className="group relative px-12 py-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl font-bold rounded-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl focus:ring-4 ring-green-300 focus:outline-none overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              Start Challenge 🚀
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>

       

        {/* LOGIN Modal Trigger */}
        <div className="text-center">
          <span className="text-white text-2xl  font-bold cursor-pointer hover:scale-110" onClick={toggleModal}>
            LOGIN
          </span>
        </div>

        {/* LOGIN Modal */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white w-144 p-6 rounded shadow-lg relative">
              <button
                onClick={toggleModal}
                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4  text-orange-600 ">Welcome Back </h2>
              <div>
                <h2 className="text-lg font-bold mb-4  text-orange-600 ">Login</h2>
                <p className='text-blue-600 font-semibold'> Learn without limits - start, switch, or advance your career!</p>
                <GoogleOAuthProvider clientId="795032530307-o0oimpaienc639tmu0gl5v35aaks1es7.apps.googleusercontent.com">
                  <Login onClose={toggleModal} className="w-56"></Login>
                </GoogleOAuthProvider>
                {/* <p className='text-lg font-semibold text-black/80'>Email</p>
                <input type="email" className='border-2 border-black/20 mt-2 rounded-lg w-[100%] h-[40px] px-2' placeholder='Enter your email' />
                <p className='text-lg font-semibold text-black/80 mt-2'>Password</p>

                <input type="password" className='border-2 border-black/20 mt-2 rounded-lg w-[100%] h-[40px] px-2' placeholder='*******' />

                <input type="checkbox" name="" id="Checkbox" className='mt-2 ml-1 scale-125' />
                <label htmlFor="Checkbox" className='ml-2'>Remember Me</label>
                
                <button className='hover:bg-blue-400  bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg mt-4 w-[100%]'>LOGIN</button> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;