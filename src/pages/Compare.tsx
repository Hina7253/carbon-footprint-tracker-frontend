import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, TrendingUp, TrendingDown, Minus, FileText, Cloud, Clock, Layers, Zap } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import carbonApi from '../lib/api';

export default function Compare() {
  const { isDarkMode, comparisonData, setComparisonData } = useAppStore();
  
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [isComparing, setIsComparing] = useState(false);

  const handleCompare = async () => {
    if (!url1.trim() || !url2.trim()) {
      alert("Please enter both website URLs");
      return;
    }

    setIsComparing(true);

    try {
      const result = await carbonApi.compareWebsites(url1, url2);

      // Backend response को safely store में save करें
      setComparisonData('site1', result.site1 || result);
      setComparisonData('site2', result.site2 || result);

      console.log("✅ Comparison Result:", result);

    } catch (error: any) {
      console.error("Comparison Error:", error);
      alert("Failed to compare websites. Please check URLs and try again.");
    } finally {
      setIsComparing(false);
    }
  };

  const getComparisonIndicator = (value1: number, value2: number, lowerIsBetter = true) => {
    if (Math.abs(value1 - value2) < 0.01) 
      return { icon: Minus, color: 'text-gray-500', label: 'Equal' };

    const isBetter = lowerIsBetter ? value1 < value2 : value1 > value2;
    return isBetter
      ? { icon: TrendingUp, color: 'text-emerald-500', label: 'Better' }
      : { icon: TrendingDown, color: 'text-red-500', label: 'Worse' };
  };

  // Safe value extractor function
  const getValue = (site: any, key: string, defaultValue = 0) => {
    if (!site) return defaultValue;
    return site[key] ?? site[`co2PerVisitGrams`] ?? site[`totalTransferBytes`] ?? defaultValue;
  };

  const metrics = [
    { key: 'pageSize', label: 'Page Size', unit: 'MB', icon: FileText, lowerIsBetter: true },
    { key: 'co2Emission', label: 'CO₂ Emission', unit: 'g/view', icon: Cloud, lowerIsBetter: true },
    { key: 'loadTime', label: 'Load Time', unit: 'sec', icon: Clock, lowerIsBetter: true },
    { key: 'totalResources', label: 'Resources', unit: 'files', icon: Layers, lowerIsBetter: true },
    { key: 'performanceScore', label: 'Performance', unit: 'pts', icon: Zap, lowerIsBetter: false },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="px-2 sm:px-0">
        <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Compare Websites
        </h1>
        <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Compare carbon footprint and performance of two websites
        </p>
      </div>

      {/* Input Section - unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 sm:p-6 rounded-2xl border mx-2 sm:mx-0 ${
          isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200 shadow-lg'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          {/* ... आपका input section वैसा ही रखा है ... */}
          <div className={`flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border w-full sm:w-auto ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <Search className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="url"
              value={url1}
              onChange={(e) => setUrl1(e.target.value)}
              placeholder="First website URL"
              className={`flex-1 bg-transparent outline-none text-sm sm:text-base ${
                isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          <div className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 hidden sm:block">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>

          <div className={`flex-1 flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border w-full sm:w-auto ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <Search className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            <input
              type="url"
              value={url2}
              onChange={(e) => setUrl2(e.target.value)}
              placeholder="Second website URL"
              className={`flex-1 bg-transparent outline-none text-sm sm:text-base ${
                isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCompare}
            disabled={isComparing || !url1 || !url2}
            className="px-4 sm:px-8 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-lg shadow-emerald-500/30 disabled:opacity-50 text-sm sm:text-base w-full sm:w-auto"
          >
            {isComparing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full inline-block"
              />
            ) : (
              'Compare'
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Comparison Results */}
      {comparisonData.site1 && comparisonData.site2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 px-2 sm:px-0"
        >
          {/* Site Headers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className={`p-3 sm:p-4 rounded-xl text-center overflow-hidden ${
              isDarkMode ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
            }`}>
              <p className="text-blue-500 font-semibold truncate text-sm sm:text-base">
                {comparisonData.site1.url || 'Site 1'}
              </p>
            </div>
            <div className={`p-3 sm:p-4 rounded-xl text-center hidden sm:block ${
              isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <p className={`font-semibold text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Metric</p>
            </div>
            <div className={`p-3 sm:p-4 rounded-xl text-center overflow-hidden ${
              isDarkMode ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-purple-50 border border-purple-200'
            }`}>
              <p className="text-purple-500 font-semibold truncate text-sm sm:text-base">
                {comparisonData.site2.url || 'Site 2'}
              </p>
            </div>
          </div>

          {/* Metrics Comparison */}
          {metrics.map((metric, index) => {
            const value1 = getValue(comparisonData.site1, metric.key);
            const value2 = getValue(comparisonData.site2, metric.key);

            const indicator1 = getComparisonIndicator(value1, value2, metric.lowerIsBetter);
            const indicator2 = getComparisonIndicator(value2, value1, metric.lowerIsBetter);

            return (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
              >
                {/* Site 1 */}
                <div className={`p-3 sm:p-4 rounded-xl flex items-center justify-between ${
                  isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200 shadow'
                }`}>
                  <div className="min-w-0">
                    <p className={`text-lg sm:text-2xl font-bold ${indicator1.color}`}>
                      {value1.toFixed(2)}
                    </p>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{metric.unit}</p>
                  </div>
                  <indicator1.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${indicator1.color} flex-shrink-0`} />
                </div>

                {/* Metric Label */}
                <div className={`p-3 sm:p-4 rounded-xl flex items-center justify-center gap-2 hidden sm:flex ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <metric.icon className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} flex-shrink-0`} />
                  <span className={`font-medium text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {metric.label}
                  </span>
                </div>

                {/* Site 2 */}
                <div className={`p-3 sm:p-4 rounded-xl flex items-center justify-between ${
                  isDarkMode ? 'bg-gray-900/50 border border-gray-800' : 'bg-white border border-gray-200 shadow'
                }`}>
                  <div className="min-w-0">
                    <p className={`text-lg sm:text-2xl font-bold ${indicator2.color}`}>
                      {value2.toFixed(2)}
                    </p>
                    <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{metric.unit}</p>
                  </div>
                  <indicator2.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${indicator2.color} flex-shrink-0`} />
                </div>
              </motion.div>
            );
          })}

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-4 sm:p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-gradient-to-br from-emerald-900/30 to-green-900/30 border-emerald-500/30'
                : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
            }`}
          >
            <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Summary
            </h3>
            <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Site 1 and Site 2 comparison completed. Check metrics above for detailed analysis.
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}