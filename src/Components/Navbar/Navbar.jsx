import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react"; 
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef();

  const isActive = (path) => location.pathname === path;

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-6 py-4 shadow-lg z-50">
      <div className="relative z-50"> {/* Added relative positioning */}
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-300 hover:text-white transition-colors"
          >
            Shoxrux 쌤
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Asosiy
            </Link>
            <Link
              to="/courses"
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/courses') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Kurslar
            </Link>            <Link
              to="/xizmatlar"
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/xizmatlar') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Xizmatlar
            </Link>
            <Link
              to="/blog"
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/blog') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/about') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Biz Haqimizda
            </Link>
          </div>

          {/* Right - Sign in / Sign up */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/signin"
              className="text-blue-500 text-opacity-80 border px-4 py-2 rounded-md border-blue-500 hover:text-white hover:bg-blue-500/10 font-semibold text-center transition-all"
            >
              Kirish
            </Link>
            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors"
            >
              Ro'yxatdan o'tish
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white hover:text-blue-400 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={menuRef}
          className={`md:hidden absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm shadow-lg transition-all duration-200 ease-in-out ${
            isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="max-w-7xl mx-auto py-4 px-6 space-y-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Asosiy
            </Link>            <Link
              to="/courses"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/courses') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Kurslar
            </Link>
            <Link
              to="/xizmatlar"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/xizmatlar') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Xizmatlar
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/blog') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors ${
                isActive('/about') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
              }`}
            >
              Biz Haqimizda
            </Link>
            <hr className="border-gray-700" />
            <div className="space-y-3">
              <Link
                to="/signin"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2 border border-blue-500 rounded-md text-blue-500 hover:bg-blue-500/10 font-semibold transition-all"
              >
                Kirish
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-2 bg-blue-500 rounded-md text-white hover:bg-blue-600 font-semibold transition-colors"
              >
                Ro'yxatdan o'tish
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
