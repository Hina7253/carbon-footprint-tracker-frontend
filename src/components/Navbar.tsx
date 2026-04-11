import { motion } from 'framer-motion';
import { Leaf, Sun, Moon, Menu, Bell, User } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { isDarkMode, toggleDarkMode, toggleSidebar } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const handleMenuClick = () => {
    if (isHomePage) {
      navigate('/dashboard');
    } else {
      toggleSidebar();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between border-b backdrop-blur-xl transition-colors duration-300 ${
      isDarkMode
        ? 'bg-gray-950/80 border-gray-800'
        : 'bg-white/80 border-gray-200'
    }`}>

      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">

        {/* Menu Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleMenuClick}
          className={`p-2 rounded-xl ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center"
          >
            <Leaf className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </motion.div>

          <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            CarbonScope
          </span>
        </Link>

        {/* Navigation Links */}
        {/* <div className="hidden md:flex items-center gap-6 font-medium">

          <Link
            to="/"
            className="hover:text-emerald-500 transition"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="hover:text-emerald-500 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-emerald-500 transition"
          >
            Contact
          </Link>

        </div> */}

      </div>

    

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 md:gap-3">

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 md:p-2.5 rounded-xl ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <Bell className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className={`p-2 md:p-2.5 rounded-xl ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          {isDarkMode
            ? <Sun className="w-5 h-5 text-yellow-400" />
            : <Moon className="w-5 h-5 text-indigo-600" />}
        </motion.button>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-xl cursor-pointer ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs md:text-sm font-medium hidden lg:block">
            Guest
          </span>
        </motion.div>

      </div>

    </nav>
  );
}