import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Leaf, Flame } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import carbonApi from '../lib/api';        // ← Real API Import
import { useEffect, useState } from 'react';

interface LeaderboardSite {
  url?: string;
  websiteUrl?: string;
  co2PerVisitGrams?: number;
  co2Emission?: number;
  totalTransferBytes?: number;
  pageSize?: number;
  performanceScore?: string | number;
  grade?: string;
}

export default function Leaderboard() {
  const { isDarkMode } = useAppStore();
  const [leaderboard, setLeaderboard] = useState<{ eco: LeaderboardSite[]; carbon: LeaderboardSite[] }>({ eco: [], carbon: [] });
  const [loading, setLoading] = useState(true);

  // ==================== REAL API CALL ====================
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const data = await carbonApi.getLeaderboard();   // Real API
        
        // Backend से जो data आए, उसे store में set कर दो
        setLeaderboard({
          eco: data.cleanest || data.eco || [],
          carbon: data.dirtiest || data.carbon || []
        });
      } catch (error) {
        console.error("Leaderboard API Error:", error);
        // अगर API fail हो तो fallback empty array रख सकते हैं
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return isDarkMode ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200';
      case 2:
        return isDarkMode ? 'bg-gray-500/10 border-gray-500/30' : 'bg-gray-50 border-gray-200';
      case 3:
        return isDarkMode ? 'bg-amber-500/10 border-amber-500/30' : 'bg-amber-50 border-amber-200';
      default:
        return isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading Leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="px-2 sm:px-0">
        <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Leaderboard
        </h1>
        <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Top eco-friendly and high carbon websites
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
        {/* Eco-Friendly Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 sm:p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 flex-shrink-0">
              <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Most Eco-Friendly
              </h2>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Lowest carbon footprint
              </p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {leaderboard.eco.map((site, index) => (
              <motion.div
                key={site.url || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl border transition-all ${
                  getRankBg(index + 1)
                }`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                  {getRankIcon(index + 1)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm sm:text-base truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {site.websiteUrl || site.url}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-4 mt-1 flex-wrap">
                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {(site.co2PerVisitGrams || site.co2Emission || 0).toFixed(2)}g CO₂
                    </span>
                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {((site.totalTransferBytes || site.pageSize || 0) / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-emerald-500 flex-shrink-0">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    {site.performanceScore || site.grade || 'N/A'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* High Carbon Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`p-4 sm:p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <div className="flex items-start sm:items-center gap-3 mb-4 sm:mb-6">
            <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-500/30 flex-shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Highest Carbon
              </h2>
              <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Needs optimization
              </p>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {leaderboard.carbon.map((site, index) => (
              <motion.div
                key={site.url || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`flex items-center gap-2 sm:gap-4 p-2 sm:p-4 rounded-xl border transition-all ${
                  isDarkMode
                    ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40'
                    : 'bg-red-50 border-red-100 hover:border-red-200'
                }`}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                  <span className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-sm sm:text-base truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {site.websiteUrl || site.url}
                  </p>
                  <div className="flex items-center gap-2 sm:gap-4 mt-1 flex-wrap">
                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {(site.co2PerVisitGrams || site.co2Emission || 0).toFixed(2)}g CO₂
                    </span>
                    <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {((site.totalTransferBytes || site.pageSize || 0) / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-red-500 flex-shrink-0">
                  <TrendingDown className="w-4 h-4" />
                  <span className="text-xs sm:text-sm font-medium">
                    {site.performanceScore || site.grade || 'N/A'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Summary - unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-2 sm:px-0"
      >
        {[
          { label: 'Average Eco CO₂', value: '0.15g', color: 'emerald' },
          { label: 'Average Carbon CO₂', value: '3.36g', color: 'red' },
          { label: 'Potential Savings', value: '95.5%', color: 'blue' },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`p-4 rounded-xl border text-center ${
              isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200 shadow'
            }`}
          >
            <p className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
            <p className={`text-2xl font-bold mt-2 ${
              stat.color === 'emerald' ? 'text-emerald-500' :
              stat.color === 'red' ? 'text-red-500' : 'text-blue-500'
            }`}>
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}