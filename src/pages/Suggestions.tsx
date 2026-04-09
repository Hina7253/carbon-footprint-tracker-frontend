import { motion } from 'framer-motion';
import { Image, Code, Zap, Leaf, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { aiSuggestions } from '../lib/mockData';

const iconMap = {
  image: Image,
  code: Code,
  zap: Zap,
  leaf: Leaf,
};

const colorMap = {
  Images: { bg: 'from-emerald-500/20 to-green-500/20', border: 'border-emerald-500/30', icon: 'from-emerald-500 to-green-600' },
  Scripts: { bg: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30', icon: 'from-blue-500 to-cyan-600' },
  Performance: { bg: 'from-orange-500/20 to-amber-500/20', border: 'border-orange-500/30', icon: 'from-orange-500 to-amber-600' },
  'Green Hosting': { bg: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', icon: 'from-purple-500 to-pink-600' },
};

const defaultColors = { bg: 'from-gray-500/20 to-gray-600/20', border: 'border-gray-500/30', icon: 'from-gray-500 to-gray-600' };

export default function Suggestions() {
  const { isDarkMode, currentAnalysis } = useAppStore();

  const prioritySuggestions = [
    { text: 'Compress images to WebP format', priority: 'high', impact: '30% size reduction' },
    { text: 'Enable GZIP compression', priority: 'high', impact: '70% transfer reduction' },
    { text: 'Defer non-critical JavaScript', priority: 'medium', impact: 'Faster initial load' },
    { text: 'Use a green hosting provider', priority: 'low', impact: 'Carbon neutral hosting' },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="px-2 sm:px-0">
        <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          AI Suggestions
        </h1>
        <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Smart optimization recommendations for {currentAnalysis?.url || 'your website'}
        </p>
      </div>

      {/* Priority Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 sm:p-6 rounded-2xl border mx-2 sm:mx-0 ${
          isDarkMode
            ? 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30'
            : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex-shrink-0">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Priority Actions
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {prioritySuggestions.map((suggestion, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-start gap-3 p-3 sm:p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-900/50' : 'bg-white/80'
              }`}
            >
              <div className={`p-1 rounded-full flex-shrink-0 ${
                suggestion.priority === 'high' ? 'bg-red-500/20' :
                suggestion.priority === 'medium' ? 'bg-yellow-500/20' : 'bg-green-500/20'
              }`}>
                {suggestion.priority === 'high' ? (
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                ) : (
                  <CheckCircle className={`w-4 h-4 ${
                    suggestion.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                  }`} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {suggestion.text}
                </p>
                <p className={`text-xs sm:text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Impact: {suggestion.impact}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mx-2 sm:mx-0">
        {aiSuggestions.map((category, categoryIndex) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap] || Image;
          const colors = colorMap[category.category as keyof typeof colorMap] || defaultColors;

          return (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              whileHover={{ y: -4 }}
              className={`p-4 sm:p-6 rounded-2xl border transition-all ${
                isDarkMode
                  ? `bg-gradient-to-br ${colors.bg} ${colors.border}`
                  : 'bg-white border-gray-200 shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="flex items-start gap-3 mb-5">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.icon} shadow-lg flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} break-words`}>
                  {category.category}
                </h3>
              </div>

              <ul className="space-y-3">
                {category.suggestions.map((suggestion, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.1 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {suggestion}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Estimated Savings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`p-4 sm:p-6 rounded-2xl border mx-2 sm:mx-0 ${
          isDarkMode
            ? 'bg-gray-900/50 border-gray-800'
            : 'bg-white border-gray-200 shadow-lg'
        }`}
      >
        <h3 className={`text-lg sm:text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Estimated Savings After Optimization
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[
            { label: 'Page Size', before: '3.2 MB', after: '1.1 MB', savings: '65%' },
            { label: 'CO₂ Emission', before: '1.8g', after: '0.4g', savings: '78%' },
            { label: 'Load Time', before: '4.2s', after: '1.5s', savings: '64%' },
            { label: 'Performance', before: '62', after: '94', savings: '+52%' },
          ].map((metric) => (
            <div key={metric.label} className="text-center">
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {metric.label}
              </p>
              <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 flex-wrap">
                <span className={`text-xs sm:text-sm line-through ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                  {metric.before}
                </span>
                <span className="text-base sm:text-lg font-bold text-emerald-500">
                  {metric.after}
                </span>
              </div>
              <span className="text-xs text-emerald-500 font-medium">
                {metric.savings}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
