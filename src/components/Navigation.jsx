import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

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
            {user ? (
              <>
                <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                  Welcome, {user.name}!
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
