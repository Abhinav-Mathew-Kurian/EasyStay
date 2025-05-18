import React from 'react';
import Homebg from "../../assets/HomePageBg.png";
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';

const Lander = () => {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#1E1E2F] to-[#00C49A] overflow-hidden">
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
            
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left side content */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0 space-y-6 md:ml-10">
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#00C49A]">
            Skip the Drama.
            <span className="block text-white md:text-[#1E1E2F]">Stay with Ease.</span>
          </h1>
          
          <p className="text-[#fafafa] text-lg md:text-xl max-w-lg">
            Connect with verified PGs, hostels, and affordable rooms for students, professionals and travelers.
          </p>
          
          {/* Search box */}
          <div className="bg-white rounded-xl shadow-lg p-2 mt-8 flex flex-col md:flex-row">
            <div className="flex items-center p-3 md:border-r border-gray-100 flex-1">
              <MapPin className="text-[#1E1E2F] mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Where are you going?" 
                className="w-full bg-transparent border-none outline-none text-[#2D2D2D] placeholder-[#6B7280]"
              />
            </div>
            
            <div className="flex items-center p-3 md:border-r border-gray-100 flex-1">
              <Calendar className="text-[#1E1E2F] mr-2" size={20} />
              <input 
                type="text" 
                placeholder="Move-in date" 
                className="w-full bg-transparent border-none outline-none text-[#2D2D2D] placeholder-[#6B7280]"
              />
            </div>
            
            <button className="bg-[#1E1E2F] hover:bg-[#181826] text-white rounded-lg px-6 py-3 mt-2 md:mt-0 flex items-center justify-center transition duration-300 transform hover:scale-105">
              <Search size={18} className="mr-2" />
              <span>Search</span>
            </button>
          </div>
          
          {/* Updated Quick links */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-4 py-2 bg-white border border-[#00C49A]/30 hover:border-[#00C49A] rounded-full text-sm text-[#2D2D2D] hover:text-[#00C49A] font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#00C49A] mr-2"></div>
              PG
            </button>
            <button className="px-4 py-2 bg-white border border-[#B388EB]/30 hover:border-[#B388EB] rounded-full text-sm text-[#2D2D2D] hover:text-[#B388EB] font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#B388EB] mr-2"></div>
              Hostels
            </button>
            <button className="px-4 py-2 bg-white border border-[#1E1E2F]/30 hover:border-[#1E1E2F] rounded-full text-sm text-[#2D2D2D] hover:text-[#1E1E2F] font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#1E1E2F] mr-2"></div>
              Student Housing
            </button>
            <button className="px-4 py-2 bg-white border border-[#00C49A]/30 hover:border-[#00C49A] rounded-full text-sm text-[#2D2D2D] hover:text-[#00C49A] font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#00C49A] mr-2"></div>
              Short-term Stay
            </button>
            <button className="px-4 py-2 bg-white border border-[#B388EB]/30 hover:border-[#B388EB] rounded-full text-sm text-[#2D2D2D] hover:text-[#B388EB] font-medium transition-all duration-300 shadow-sm hover:shadow flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#B388EB] mr-2"></div>
              Long-term Stay
            </button>
          </div>
        
        </div>
        
        {/* Right side image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-[#B388EB]/20 blur-xl"></div>
            <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#00C49A]/10 blur-xl"></div>
            
            {/* Main image */}
            <div className="relative z-10 overflow-hidden rounded-2xl shadow-xl border-4 border-[#fafafa]">
              <img 
                src={Homebg} 
                alt="EasyStay Accommodations" 
                className="w-full md:max-w-lg object-cover rounded-xl transform transition-transform hover:scale-105 duration-700" 
              />
              
              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2F]/70 via-transparent to-transparent rounded-xl"></div>
              
              {/* Feature badges */}
              <div className="absolute top-6 left-6 bg-white px-4 py-2 rounded-full shadow-lg flex items-center">
                <span className="text-[#00C49A] font-bold mr-1">100%</span>
                <span className="text-[#2D2D2D] text-sm">Verified listings</span>
              </div>
              
              <div className="absolute bottom-6 left-0 right-0 px-6">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[#6B7280] text-xs">Starting from</p>
                      <p className="text-[#1E1E2F] font-bold text-xl">₹2,500<span className="text-sm font-normal">/mo</span></p>
                    </div>
                    <button className="bg-[#B388EB] hover:bg-[#A676E5] text-white rounded-lg px-4 py-2 flex items-center transition duration-300">
                      <span>Explore</span>
                      <ArrowRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lander;