import { motion } from 'framer-motion';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Trends() {
  const { isDarkMode, weeklyTrends } = useAppStore();

  

  const stats = [
    { label: 'Average CO₂', value: '1.13g', change: -12, trend: 'down' },
    { label: 'Peak Day', value: 'Thursday', change: null, trend: null },
    { label: 'Best Day', value: 'Saturday', change: null, trend: null },
    { label: 'Weekly Change', value: '-8.3%', change: -8.3, trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Weekly Trends
          </h1>
          <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your website's carbon emissions over time
          </p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
        }`}>
          <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
          <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Last 7 Days
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl border ${
              isDarkMode
                ? 'bg-gray-900/50 border-gray-800'
                : 'bg-white border-gray-200 shadow-lg'
            }`}
          >
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </span>
              {stat.change !== null && (
                <div className={`flex items-center gap-1 ${
                  stat.trend === 'down' ? 'text-emerald-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'down' ? (
                    <ArrowDownRight className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{Math.abs(stat.change)}%</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-2xl border ${
          isDarkMode
            ? 'bg-gray-900/50 border-gray-800'
            : 'bg-white border-gray-200 shadow-lg'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            CO₂ Emissions Over Time
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>CO₂ (g)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Page Size (MB)</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={weeklyTrends}>
            <defs>
              <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorSize" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
              axisLine={{ stroke: isDarkMode ? '#374151' : '#e5e7eb' }}
            />
            <YAxis
              tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
              axisLine={{ stroke: isDarkMode ? '#374151' : '#e5e7eb' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              }}
              labelStyle={{ color: isDarkMode ? '#fff' : '#000' }}
            />
            <Area
              type="monotone"
              dataKey="co2"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCo2)"
              name="CO₂ (g)"
            />
            <Area
              type="monotone"
              dataKey="pageSize"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSize)"
              name="Page Size (MB)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Trend Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30'
              : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Positive Trends
            </h3>
          </div>
          <ul className="space-y-3">
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              CO₂ emissions decreased by 12% this week
            </li>
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Weekend traffic shows lower carbon footprint
            </li>
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Image optimization showing results
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gradient-to-br from-orange-900/20 to-amber-900/20 border-orange-500/30'
              : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-orange-500">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Areas for Improvement
            </h3>
          </div>
          <ul className="space-y-3">
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Thursday shows peak emissions - investigate
            </li>
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Page size still above recommended 1.5MB
            </li>
            <li className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Consider implementing CDN for better efficiency
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
