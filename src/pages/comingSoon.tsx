import { motion } from 'framer-motion';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

export default function ComingSoon() {
  const navigate = useNavigate();
  const { isDarkMode } = useAppStore();

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center px-4 relative ${
        isDarkMode ? 'bg-gray-950' : 'bg-gray-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? 'bg-cyan-500' : 'bg-cyan-300'
          }`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-2xl w-full rounded-3xl p-8 md:p-16 text-center border shadow-2xl relative z-10 ${
          isDarkMode
            ? 'bg-gray-900/80 border-gray-700 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/30"
        >
          <Clock className="w-12 h-12 text-white" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent"
        >
          Coming Soon
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`text-lg md:text-xl mb-10 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          This page is still under development. We're working on something amazing!
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
