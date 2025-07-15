import React, { useEffect, useState } from 'react';
import logoPath from '../assets/Logo.png';

const Loading = () => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev === 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, []);

  const loadingDots = '.'.repeat(dots);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#00C49A]/80 to-[#1E1E2F]/90">

      {/* Blurred Jade + Lavender circles */}
      <div className="absolute w-96 h-96 bg-[#00C49A] opacity-20 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-96 h-96 bg-[#B388EB] opacity-20 rounded-full blur-3xl bottom-10 right-10"></div>

      {/* Center Logo with soft pulse */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-32 h-32 mb-6">
          {/* Rotating dashed ring */}
          <div className="absolute inset-0 border-4 border-dashed border-white opacity-30 rounded-full animate-spin-slow"></div>

          {/* Inner logo with pulse ring */}
          <div className="absolute inset-4 bg-[#1E1E2F] rounded-full flex items-center justify-center">
            <img
              src={logoPath}
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
            <div className="absolute inset-0 border-2 border-[#00C49A] rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-white font-mono tracking-wider text-lg">
          Loading{loadingDots}
        </p>
      </div>

      {/* Animation keyframes */}
      <style jsx="true">{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
