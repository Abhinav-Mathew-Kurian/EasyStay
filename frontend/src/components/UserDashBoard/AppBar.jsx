import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Menu, X, User, Plus, MessageSquare, Settings, Heart } from "lucide-react";
import EasyStayLogo from "../../assets/Logo.png";

const AppBar = () => {
  const {id}= useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false); // State for logout dropdown
  const navigate = useNavigate(); // For navigation
  
  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const toggleLogoutMenu = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };

  const logoutRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target)
      ) {
        setIsLogoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full z-50 bg-[#1E1E2F] shadow-lg mb-5">
        {/* Desktop Navigation */}
        <div className="relative flex items-center justify-between px-4 md:px-8 py-3 md:max-w-7xl md:mx-auto">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src={EasyStayLogo}
                alt="EasyStay Logo"
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Small screen hamburger */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#FAFAFA] hover:text-[#00C49A] transition-colors duration-200 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Center elements */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate(`/${id}/dashboard/listrooms`)}
              className="text-[#FAFAFA] hover:text-[#00C49A] flex items-center px-3 py-2 rounded transition-colors duration-200"
              title="Add Room"
            >
              <Plus size={20} /> <span>List Rooms</span>
            </button>
            <button
              onClick={() => navigate(`/${id}/dashboard/listrooms`)}
              className="text-[#FAFAFA] hover:text-[#00C49A] px-4 py-2 rounded transition-colors duration-200"
            >
              Manage Listings
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="text-[#FAFAFA] hover:text-[#00C49A] px-3 py-2 rounded transition-colors duration-200"
              title="Messages"
            >
              <MessageSquare size={20} /> 
            </button>
            <button
              onClick={() => navigate('/saved-rooms')}
              className="text-[#FAFAFA] hover:text-[#00C49A] flex items-center px-3 py-2 rounded transition-colors duration-200"
              title="Saved Rooms"
            >
              <Heart size={20} />
            </button>
          </div>

          {/* Right side actions - Profile */}
          <div className="flex items-center relative">
            <button
              onClick={toggleLogoutMenu}
              className="text-[#FAFAFA] hover:text-[#00C49A] p-2 rounded-4xl border-2 border-white transition-colors duration-200 "
              ref={logoutRef}
            >
              <User size={20} />
            </button>
            
            {/* Dropdown menu */}
            {isLogoutOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-[#1E1E2F] border border-[#2D2D2D]/30 rounded shadow-lg py-1 z-50">
                <button
                  className="flex items-center w-full px-4 py-2 text-[#FAFAFA] hover:bg-[#2D2D2D]/50 cursor-pointer"
                  onClick={() => {
                    console.log("Profile clicked");
                    setIsLogoutOpen(false);
                    navigate('/profile');
                  }}
                >
                  <User size={16} className="mr-2" />
                  Profile
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-[#FAFAFA] hover:bg-[#2D2D2D]/50 cursor-pointer"
                  onClick={() => {
                    console.log("Settings clicked");
                    setIsLogoutOpen(false);
                    navigate('/settings');
                  }}
                >
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                <button
                  className="flex items-center w-full px-4 py-2 text-[#FAFAFA] hover:bg-[#2D2D2D]/50 cursor-pointer"
                  onClick={() => {
                    console.log("Logout clicked");
                    setIsLogoutOpen(false);
                    // Handle logout logic here
                    navigate('/login');
                  }}
                >
                  <User size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu - Only shown when menu is open */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:hidden bg-[#1E1E2F] border-t border-[#2D2D2D]/30 overflow-hidden transition-all duration-300 ease-in-out mb-5`}
        >
          <ul className="flex flex-col w-full px-6 py-2">
            <li className="py-2">
              <button 
                onClick={() => {
                  navigate(`/${id}/dashboard/listrooms`);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <Plus size={16} className="mr-2" />
                <span>Add Room</span>
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => {
                  navigate('/manage-listings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <span>Manage Listings</span>
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => {
                  navigate('/messages');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <MessageSquare size={16} className="mr-2" />
                <span>Messages</span>
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => {
                  navigate('/saved-rooms');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <Heart size={16} className="mr-2" />
                <span>Saved Rooms</span>
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => {
                  navigate('/profile');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <User size={16} className="mr-2" />
                <span>Profile</span>
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => {
                  navigate('/settings');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <Settings size={16} className="mr-2" />
                <span>Settings</span>
              </button>
            </li>
            <li className="py-2">
              <button 
                onClick={() => {
                  console.log("Logout clicked");
                  setIsMobileMenuOpen(false);
                  navigate('/');
                }}
                className="w-full text-left text-[#FAFAFA] font-medium py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded flex items-center transition duration-300"
              >
                <User size={16} className="mr-2" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AppBar;