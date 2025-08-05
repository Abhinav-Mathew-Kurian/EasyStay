import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Menu, X, User, Plus, MessageSquare, Heart } from "lucide-react";
import EasyStayLogo from "../../assets/Logo.png";

const AppBar = () => {
  const { id } = useParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const logoutRef = useRef(null);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleLogoutMenu = () => setIsLogoutOpen(!isLogoutOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setIsLogoutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full z-50 bg-[#1E1E2F] shadow-lg mb-5">
      {/* Desktop Navigation */}
      <div className="relative flex items-center justify-between px-4 md:px-8 py-3 md:max-w-7xl md:mx-auto">
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img src={EasyStayLogo} alt="EasyStay Logo" className="h-8 md:h-10 w-auto" />
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-[#FAFAFA] hover:text-[#00C49A]">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => navigate(`/${id}/dashboard/listrooms`)} className="text-[#FAFAFA] hover:text-[#00C49A] flex items-center gap-2 px-3 py-2 rounded transition">
            <Plus size={20} /> List Rooms
          </button>
          <button onClick={() => navigate(`/${id}/dashboard/manage-listings`)} className="text-[#FAFAFA] hover:text-[#00C49A] px-4 py-2 rounded transition">
            Manage Listings
          </button>
          <button onClick={() => navigate('/messages')} className="text-[#FAFAFA] hover:text-[#00C49A] px-3 py-2 rounded transition" title="Messages">
            <MessageSquare size={20} />
          </button>
          <button onClick={() => navigate('/saved-rooms')} className="text-[#FAFAFA] hover:text-[#00C49A] flex items-center px-3 py-2 rounded transition" title="Saved Rooms">
            <Heart size={20} />
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center relative">
          <button onClick={toggleLogoutMenu} className="text-[#FAFAFA] hover:text-[#00C49A] p-2 border-2 border-white rounded-full" ref={logoutRef}>
            <User size={20} />
          </button>

          {isLogoutOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1E1E2F] border border-[#2D2D2D]/30 rounded shadow-lg py-1 z-50">
              <button
                className="flex items-center w-full px-4 py-2 text-[#FAFAFA] hover:bg-[#2D2D2D]/50"
                onClick={() => {
                  setIsLogoutOpen(false);
                  navigate(`/${id}/dashboard/profile`);
                }}
              >
                <User size={16} className="mr-2" /> Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-[#FAFAFA] hover:bg-[#2D2D2D]/50"
                onClick={() => {
                  setIsLogoutOpen(false);
                  navigate("/login");
                }}
              >
                <User size={16} className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } md:hidden bg-[#1E1E2F] border-t border-[#2D2D2D]/30 overflow-hidden transition-all duration-300 ease-in-out mb-5`}
      >
        <ul className="flex flex-col w-full px-6 py-2">
          <li className="py-2">
            <button
              onClick={() => {
                navigate(`/${id}/dashboard/listrooms`);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center text-[#FAFAFA] py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded transition"
            >
              <Plus size={16} className="mr-2" /> Add Room
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => {
                navigate(`/${id}/dashboard/manage-listings`);
                setIsMobileMenuOpen(false);
              }}
              className="w-full text-left text-[#FAFAFA] py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded"
            >
              Manage Listings
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => {
                navigate('/messages');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center text-[#FAFAFA] py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded"
            >
              <MessageSquare size={16} className="mr-2" /> Messages
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => {
                navigate('/saved-rooms');
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center text-[#FAFAFA] py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded"
            >
              <Heart size={16} className="mr-2" /> Saved Rooms
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => {
                navigate(`/${id}/dashboard/profile`);
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center text-[#FAFAFA] py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded"
            >
              <User size={16} className="mr-2" /> Profile
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/login");
              }}
              className="w-full flex items-center text-[#FAFAFA] py-2 px-3 hover:bg-[#2D2D2D]/30 hover:text-[#00C49A] rounded"
            >
              <User size={16} className="mr-2" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AppBar;
