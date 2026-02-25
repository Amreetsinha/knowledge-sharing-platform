import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import JwtUtils from '../utils/security/JwtUtils';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = JwtUtils.isAuthenticated();

  const handleLogout = () => {
    JwtUtils.removeToken();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center backdrop-blur-md bg-zinc-950/50 border-b border-white/5 z-50">
      <Link to="/" className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent truncate pr-4">
        KnowledgePlatform
      </Link>
      
      <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
        <Link to="/articles" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-zinc-400 hover:text-white transition-colors">Feed</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/manage-articles" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-zinc-400 hover:text-white transition-colors">Manage</Link>
            <Link to="/create-article" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-zinc-400 hover:text-white transition-colors">Write</Link>

            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base rounded-lg bg-zinc-900 border border-white/10 hover:bg-zinc-800 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base text-zinc-300 hover:text-white transition-colors">Login</Link>
            <Link to="/signup" className="px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base rounded-full bg-white text-zinc-950 font-semibold hover:bg-zinc-200 transition-colors">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
