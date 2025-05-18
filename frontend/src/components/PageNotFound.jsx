import React from 'react';
import { Home } from 'lucide-react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-[#1E1E2F] to-[#00C49A] flex justify-center items-center">
      {/* Grid background */}
      <div className="absolute inset-0 grid grid-cols-12 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={`col-${i}`} className="h-full w-px bg-white opacity-5"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 z-0">
        {[...Array(12)].map((_, i) => (
          <div key={`row-${i}`} className="w-full h-px bg-white opacity-5"></div>
        ))}
      </div>

      {/* 404 Card */}
      <div className="relative z-10 w-96 rounded-lg shadow-2xl overflow-hidden">
        {/* Card header */}
        <div className="w-full bg-[#00C49A] p-4 text-center">
          <h1 className="text-3xl font-extrabold text-white">404</h1>
          <p className="text-white font-medium mt-1">PAGE NOT FOUND</p>
        </div>

        {/* Card body */}
        <div className="grid grid-cols-2 bg-[#FAFAFA] p-6">
          <div className="text-6xl flex items-center justify-center text-red-500">!</div>
          <div className="flex items-center justify-center text-[#6B7280]">
            Sorry, the page you are looking for does not exist.
          </div>

          {/* Button section */}
          <div className="col-span-2 flex justify-center items-center mt-6">
            <button
              className="flex items-center gap-2 px-6 py-3 bg-[#00C49A] hover:bg-opacity-90 text-white rounded-full shadow-md transition-all"
              onClick={goHome}
            >
              <Home size={18} />
              <span>Go To Home Page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PageNotFound;
