import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  LayoutDashboard,
  FolderOpen,
  GitCompare,
  Trophy,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Mail,
  Award,
  Home,
  Info,
  Phone,
  Clock
} from 'lucide-react';

import { useAppStore } from '../store/appStore';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/resources', icon: FolderOpen, label: 'Resources' },
  { path: '/compare', icon: GitCompare, label: 'Compare' },
  { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { path: '/suggestions', icon: Sparkles, label: 'AI Suggestions' },
  { path: '/chat', icon: MessageCircle, label: 'AI Chat' },
  { path: '/trends', icon: TrendingUp, label: 'Weekly Trends' },
  { path: '/badge', icon: Award, label: 'Carbon Badge' },
  { path: '/report', icon: Mail, label: 'Email Report' },

  // ✅ keep all needed pages
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/about', icon: Info, label: 'About' },
  { path: '/contact', icon: Phone, label: 'Contact' },
];

export default function Sidebar() {
  const { isDarkMode } = useAppStore();
  const location = useLocation();

  return (
    <aside
      className={`w-full h-full flex flex-col overflow-y-auto border-r transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gray-950/50 border-gray-800 backdrop-blur-xl'
          : 'bg-white/50 border-gray-200 backdrop-blur-xl'
      }`}
    >
      <nav className="flex-1 p-4 md:p-6 space-y-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <NavLink key={item.path} to={item.path}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-400 border border-emerald-500/30'
                    : isDarkMode
                    ? 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive ? 'text-emerald-400' : ''
                  }`}
                />

                <span className="font-medium text-sm">{item.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                )}
              </motion.div>
            </NavLink>
          );
        })}
      </nav>

      {/* Stats Box */}
      <div
        className={`flex-shrink-0 p-4 md:p-6 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`p-4 rounded-xl ${
            isDarkMode
              ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border border-emerald-500/20'
              : 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className={`text-xs font-semibold uppercase tracking-wide ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Total CO₂ Saved
              </p>

              <p className="text-3xl font-bold text-emerald-400 mt-2">
                12.5 kg
              </p>

              <p className="text-xs mt-2 text-gray-500">
                This month
              </p>
            </div>

            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-400/20 to-green-500/20 flex items-center justify-center">
              <span className="text-lg">🌱</span>
            </div>
          </div>
        </motion.div>
      </div>
    </aside>
  );
}