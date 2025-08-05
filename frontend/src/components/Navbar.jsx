import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import EasyStayLogo from "../assets/Logo.png";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className="w-full z-50 bg-[#1E1E2F] shadow-lg"
      >
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

          {/* Navigation menu - Center on desktop */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex flex-row gap-8">
              <li>
                <HashLink
                  smooth
                  to="#services"
                  className="py-2 block text-[#FAFAFA] tracking-wide text-sm transition duration-200 hover:text-[#00C49A] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#00C49A] after:transition-all hover:after:w-full"
                >
                  SERVICES
                </HashLink>
              </li>
              <li>
                <HashLink
                  to="#contactus"
                  className="py-2 block text-[#FAFAFA] tracking-wide text-sm transition duration-200 hover:text-[#00C49A] relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#00C49A] after:transition-all hover:after:w-full"
                >
                  CONTACT US
                </HashLink>
              </li>

            </ul>
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center">
            {/* Login button */}
            <Link
              to="/login"
              className="bg-[#00C49A] text-[#1E1E2F] font-medium py-2.5 px-6 rounded-full hover:bg-[#B388EB] hover:text-[#FAFAFA] transition duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <User size={16} />
              <span className="font-semibold tracking-wide">LOGIN</span>
            </Link>
          </div>
        </div>

        {/* Mobile menu - Only shown when menu is open */}
        <div
          className={`${isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            } md:hidden bg-[#1E1E2F] border-t border-[#2D2D2D]/30 overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <ul className="flex flex-col w-full px-6 py-2">
            <li className="border-b border-[#2D2D2D]/30">
              <HashLink
                smooth
                to="#services"
                className="block py-4 text-[#FAFAFA] hover:text-[#00C49A] transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SERVICES
              </HashLink>
            </li>

            <li className="border-b border-[#2D2D2D]/30">
              <HashLink
                to="#contactus"
                className="block py-4 text-[#FAFAFA] hover:text-[#00C49A] transition duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT US
              </HashLink>
            </li>

            <li className="py-5">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full bg-[#00C49A] text-[#1E1E2F] font-medium py-3 px-4 rounded-full hover:bg-[#B388EB] hover:text-[#FAFAFA] transition duration-300 flex items-center justify-center gap-2"
              > <User size={16} />
                <span>LOGIN</span></Link>

            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;