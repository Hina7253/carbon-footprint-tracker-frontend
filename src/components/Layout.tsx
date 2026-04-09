import { type ReactNode, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isDarkMode, isSidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const prevPathnameRef = useRef(location.pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Auto-close sidebar only when navigating TO home page from another page
  useEffect(() => {
    const didPathChange = prevPathnameRef.current !== location.pathname;

    // Only close sidebar if:
    // 1. The pathname changed (user navigated)
    // 2. We're now on home page
    // 3. Sidebar is currently open
    if (didPathChange && isHomePage && isSidebarOpen) {
      toggleSidebar();
    }

    prevPathnameRef.current = location.pathname;
  }, [location.pathname, isHomePage, isSidebarOpen, toggleSidebar]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar />

      <div className="flex flex-1 pt-16 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-64 flex-shrink-0 h-full"
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-y-auto flex flex-col">
          <div className="p-6 md:p-8 flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </div>

          {/* Footer - Only on Home Page */}
          {isHomePage && <Footer isSidebarOpen={isSidebarOpen} />}
        </main>
      </div>
    </div>
  );
}
