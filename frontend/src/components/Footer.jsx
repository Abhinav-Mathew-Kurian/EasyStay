import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function MinimalFooter() {
  return (
    <footer className="w-full bg-gradient-to-r from-gray-900 to-teal-700 text-white py-8 h-48">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-teal-400">EasyStay</h2>
            <p className="text-xs text-gray-300">Premium accommodations across India</p>
          </div>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-x-6 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <MapPin className="text-teal-400" size={14} />
              <span className="text-xs">Trivandrum, Kerala</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-teal-400" size={14} />
              <span className="text-xs">+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-teal-400" size={14} />
              <span className="text-xs">easy@stay.com</span>
            </div>
          </div>
          
          {/* Social Icons */}
          <div className="flex space-x-3">
            <a href="#" className="bg-gray-800 p-1 rounded-full hover:bg-teal-600 transition-colors">
              <Facebook size={14} />
            </a>
            <a href="#" className="bg-gray-800 p-1 rounded-full hover:bg-teal-600 transition-colors">
              <Twitter size={14} />
            </a>
            <a href="#" className="bg-gray-800 p-1 rounded-full hover:bg-teal-600 transition-colors">
              <Instagram size={14} />
            </a>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} EasyStay. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-x-4 text-xs mt-2 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">Home</a>
            <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">About</a>
            <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">Services</a>
            <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">Contact</a>
            <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}