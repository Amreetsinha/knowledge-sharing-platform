import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-white/5 md:text-white/10 select-none">403</h1>
        <div className="relative -mt-10 md:-mt-20 px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Access Denied</h2>
          <p className="text-zinc-400 text-sm md:text-base mb-8 max-w-md mx-auto">
            Oops! It looks like you don't have permission to view this page. 
            Please check your credentials or contact an administrator.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors text-sm md:text-base"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Unauthorized;
