import React, { useEffect, useState } from 'react';
import logoPath from '../assets/Logo.png';

const Loading = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState(1);
  
  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => prev === 3 ? 1 : prev + 1);
    }, 400);
    
    return () => {
      clearInterval(interval);
      clearInterval(dotsInterval);
    };
  }, []);
  
  // Dynamic dot display
  const loadingDots = '.'.repeat(dots);
  
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative">
      {/* Blurred Background with Jade Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00C49A] to-[#1E1E2F] overflow-hidden">
        {/* Blurred Shapes */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-[#00C49A] opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-[#B388EB] opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1E1E2F] opacity-40 blur-3xl"></div>
        
        {/* Subtle Grid lines */}
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
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${3 + Math.random() * 10}px`,
              height: `${3 + Math.random() * 10}px`,
              backgroundColor: i % 3 === 0 ? '#00C49A' : i % 3 === 1 ? 'white' : '#B388EB',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animationDuration: `${15 + Math.random() * 25}s`,
              animation: 'float infinite linear',
              animationDelay: `-${Math.random() * 20}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Main content container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Custom Logo animation */}
        <div className="flex justify-center mb-12">
          <div className="relative w-40 h-40">
            {/* Rotating outer ring */}
            <div className="absolute inset-0 border-4 border-dashed border-white opacity-50 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
            
            {/* Actual Logo */}
            <div className="absolute inset-4 bg-[#1E1E2F] rounded-full flex items-center justify-center overflow-hidden">
              <img 
                src={logoPath} 
                alt="Company Logo" 
                className="w-24 h-24 object-contain z-10"
              />
              
              {/* Animated Pulse */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 border-2 border-[#00C49A] rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
              </div>
            </div>
            
            {/* Orbiting dots */}
            {[...Array(4)].map((_, i) => (
              <div 
                key={`orbit-${i}`} 
                className="absolute w-full h-full animate-spin"
                style={{
                  animationDuration: `${3 + i * 0.5}s`, 
                  transform: `rotate(${i * 90}deg)`
                }}
              >
                <div className="absolute top-0 left-1/2 w-3 h-3 -ml-1.5 rounded-full bg-white"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loading bar with unique style */}
        <div className="w-full h-2 bg-[#1E1E2F] relative mb-3 overflow-hidden">
          {/* Progress fill */}
          <div 
            className="h-full bg-[#00C49A]"
            style={{ width: `${progress}%` }}
          ></div>
          
          {/* Animated light streak */}
          <div 
            className="absolute top-0 bottom-0 w-20 bg-white opacity-30 skew-x-30 animate-pulse"
            style={{ 
              left: `${progress - 10}%`,
              display: progress < 5 ? 'none' : 'block'
            }}
          ></div>
        </div>
        
        {/* Loading text row */}
        <div className="flex justify-between items-center text-white">
          <div className="flex items-center">
            <div className="mr-2 w-2 h-2 bg-[#00C49A] rounded-full animate-pulse"></div>
            <span className="font-mono">LOADING{loadingDots}</span>
          </div>
          <span className="font-mono">{progress}%</span>
        </div>
        
        {/* Futuristic data blocks */}
        <div className="mt-12 grid grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div 
              key={`block-${i}`}
              className="h-8 bg-[#1E1E2F] bg-opacity-50 rounded flex items-center justify-center overflow-hidden relative"
              style={{
                animationDelay: `${i * 0.1}s`,
                animation: 'fadeInUp 0.5s forwards'
              }}
            >
              {/* Animated loading effect */}
              <div className="absolute inset-0 bg-[#00C49A] opacity-20" 
                   style={{
                     width: `${Math.min(progress * 2, 100)}%`, 
                     display: i % 2 === 0 ? 'block' : 'none'
                   }}>
              </div>
              
              {/* Random data visualization */}
              <div className="flex space-x-1">
                {[...Array(i % 3 + 1)].map((_, j) => (
                  <div 
                    key={`data-${i}-${j}`} 
                    className={`w-1 h-${1 + j} bg-[#B388EB] opacity-70`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom text */}
        <div className="mt-12 text-center">
          <p className="text-white text-xs font-mono tracking-wider opacity-70">
            INITIALIZING SYSTEM COMPONENTS
          </p>
        </div>
      </div>
      
      {/* Global animation keyframes */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(10px, 10px) rotate(90deg); }
          50% { transform: translate(0, 20px) rotate(180deg); }
          75% { transform: translate(-10px, 10px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Loading;