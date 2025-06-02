import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ onHome, onLogin, onLogout, user }) => {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <Link to="/">
              <h1 className="text-xl font-bold text-white">QuizMaster Pro</h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onHome}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300"
            >
              Home
            </button>
            {user ? (
              <>
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                  Welcome, {user.name}!
                </div>
                <button
                  onClick={onLogout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
