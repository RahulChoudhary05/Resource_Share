import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BookOpen } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-bold text-xl">StudyShare</span>
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-800"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-indigo-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-800"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;