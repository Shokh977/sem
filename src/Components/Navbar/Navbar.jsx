import React, { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, Settings, UserCircle2, BookOpen, Bookmark } from "lucide-react"; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from '../../config/axios';

const ProfilePicture = ({ user }) => (
  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700">
    {user.profilePicture ? (
      <img
        src={`${axiosInstance.defaults.baseURL}${user.profilePicture}`}
        alt={user.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-blue-500">
        <UserCircle2 size={20} className="text-white" />
      </div>
    )}
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef();
  const userMenuRef = useRef();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Close menus on route change and click outside
  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);

    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [location]);  const handleLogout = async () => {
    try {
      setShowUserMenu(false); // Close the menu immediately
      await logout();
      navigate('/', { replace: true }); // Use replace to prevent going back to protected routes
    } catch (error) {
      console.error('Failed to logout:', error);
      // The user will still be logged out locally even if server request fails
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 text-white px-6 py-4 shadow-lg z-50">
      <div className="relative z-50">
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
            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  <ProfilePicture user={user} />
                  <span className="font-semibold text-white">{user.name}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <User size={16} className="mr-2" />
                      Profil
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >                      <Settings size={16} className="mr-2" />
                      Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/saved-blogs"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  >
                    <Bookmark size={16} className="mr-2" />
                    Saqlangan bloglar
                  </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <LogOut size={16} className="mr-2" />
                      Chiqish
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/signin"
                  className="px-4 py-2 text-white text-opacity-80 hover:text-white transition-colors"
                >
                  Kirish
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                >
                  Ro'yxatdan o'tish
                </Link>
              </div>
            )}
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
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-gray-900 border-t border-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-6 space-y-4">
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
              </Link>              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left px-4 py-2 rounded-md font-semibold transition-colors ${
                  isActive('/about') ? 'bg-gray-800 text-blue-400' : 'text-white text-opacity-80 hover:text-white'
                }`}
              >
                Biz Haqimizda
              </Link>

              {/* Mobile User Menu */}
              {user ? (
                <>
                  <div className="border-t border-gray-800 mt-4 pt-4">
                    <div className="flex items-center px-4 py-2 gap-3">
                      <ProfilePicture user={user} />
                      <span className="font-semibold text-white">{user.name}</span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 mt-2"
                    >
                      Profil
                    </Link>
                    <Link
                      to="/saved-blogs"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Saqlangan bloglar
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                      Chiqish
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-800 mt-4 pt-4 space-y-2">
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 text-white text-opacity-80 hover:text-white transition-colors"
                  >
                    Kirish
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors text-center mx-4"
                  >
                    Ro'yxatdan o'tish
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
