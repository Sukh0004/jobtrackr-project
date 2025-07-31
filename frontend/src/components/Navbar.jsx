import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b shadow-md py-3 px-6 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        JobTrackr
      </Link>
      <div className="flex items-center gap-4">
        {user && <span className="text-gray-700 text-sm hidden sm:block">{user.email}</span>}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          >
            Login
          </Link>
          
        )
        }
        
          <Link
            to="/register"
            className="bg-green-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
          >
            Register
          </Link>
          
        
      </div>
    </nav>
  );
}

export default Navbar;
