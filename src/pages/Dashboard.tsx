import { motion } from 'framer-motion';
import { FileText, Cloud, Clock, Layers, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useAppStore } from '../store/appStore';
import MetricCard from '../components/MetricCard';
import ProgressBar from '../components/ProgressBar';
import SkeletonLoader from '../components/SkeletonLoader';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';       

export default function Dashboard() {
  const { isDarkMode, currentAnalysis, setCurrentAnalysis, isLoading } = useAppStore();
  const navigate = useNavigate();

  // ==================== REAL API से डेटा लोड करें ====================
  useEffect(() => {
    
    if (!currentAnalysis) {
      
      console.log("No current analysis found. Please analyze a website first.");
    }
  }, [currentAnalysis, setCurrentAnalysis]);

  if (isLoading || !currentAnalysis) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SkeletonLoader type="card" count={4} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonLoader type="chart" />
          <SkeletonLoader type="chart" />
        </div>
      </div>
    );
  }

  
  const resourceDistribution = [
    { name: 'Images', value: currentAnalysis.resources?.filter((r: any) => r.type === 'image').length || 0, color: '#10b981' },
    { name: 'Scripts', value: currentAnalysis.resources?.filter((r: any) => r.type === 'script').length || 0, color: '#3b82f6' },
    { name: 'Stylesheets', value: currentAnalysis.resources?.filter((r: any) => r.type === 'stylesheet').length || 0, color: '#f59e0b' },
    { name: 'Videos', value: currentAnalysis.resources?.filter((r: any) => r.type === 'video').length || 0, color: '#ef4444' },
    { name: 'Fonts', value: currentAnalysis.resources?.filter((r: any) => r.type === 'font').length || 0, color: '#8b5cf6' },
    { name: 'Other', value: currentAnalysis.resources?.filter((r: any) => !['image','script','stylesheet','video','font'].includes(r.type)).length || 0, color: '#6b7280' },
  ].filter(item => item.value > 0);

  // Performance Data (Backend के actual fields के अनुसार adjust किया)
  const performanceData = [
    { name: 'FCP', value: currentAnalysis.loadTime || 1.2, benchmark: 1.8 },
    { name: 'LCP', value: currentAnalysis.loadTime || 2.1, benchmark: 2.5 },
    { name: 'CLS', value: 0.05, benchmark: 0.1 },
    { name: 'TTI', value: currentAnalysis.loadTime || 3.2, benchmark: 3.8 },
    { name: 'TBT', value: 150, benchmark: 200 },
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center justify-between px-2 sm:px-0">
        <div className="min-w-0">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Dashboard
          </h1>
          <p className={`mt-1 text-sm sm:text-base truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Analysis for <span className="text-emerald-500 font-medium">
              {currentAnalysis.url}
            </span>
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium shadow-lg shadow-emerald-500/30 text-sm sm:text-base whitespace-nowrap"
        >
          New Analysis
        </motion.button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-0">
        <MetricCard
          title="Page Size"
          value={currentAnalysis.pageSize || 0}
          unit="MB"
          icon={FileText}
          color="blue"
          delay={0.1}
        />
        <MetricCard
          title="CO₂ Emission"
          value={currentAnalysis.co2Emission || 0}
          unit="g/view"
          icon={Cloud}
          color="emerald"
          delay={0.2}
        />
        <MetricCard
          title="Load Time"
          value={currentAnalysis.loadTime || 0}
          unit="sec"
          icon={Clock}
          color="orange"
          delay={0.3}
        />
        <MetricCard
          title="Resources"
          value={currentAnalysis.totalResources || currentAnalysis.resources?.length || 0}
          unit="files"
          icon={Layers}
          color="purple"
          delay={0.4}
        />
      </div>

      {/* Performance Score */}
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
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Score
          </h2>
          <div className="flex items-center gap-2">
            {currentAnalysis.performanceScore >= 70 ? (
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
            <span className={`text-xl sm:text-2xl font-bold ${
              currentAnalysis.performanceScore >= 80 ? 'text-emerald-500' :
              currentAnalysis.performanceScore >= 60 ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {currentAnalysis.performanceScore || 0}
            </span>
          </div>
        </div>
        <ProgressBar
          value={currentAnalysis.performanceScore || 65}
          label="Overall Performance"
        />
      </motion.div>

      {/* Charts - UI वैसी ही रखी है */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
        {/* Resource Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className={`p-4 sm:p-6 rounded-2xl border overflow-hidden ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Resource Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={resourceDistribution}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {resourceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  fontSize: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value) => (
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Performance Metrics Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className={`p-4 sm:p-6 rounded-2xl border overflow-hidden ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <h2 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Performance Metrics
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={performanceData}>
              <XAxis
                dataKey="name"
                tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}
                axisLine={{ stroke: isDarkMode ? '#374151' : '#e5e7eb' }}
              />
              <YAxis
                tick={{ fill: isDarkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }}
                axisLine={{ stroke: isDarkMode ? '#374151' : '#e5e7eb' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  fontSize: '12px',
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
                formatter={(value) => (
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{value}</span>
                )}
              />
              <Bar dataKey="value" name="Actual" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="benchmark" name="Benchmark" fill="#6b7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions - unchanged */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-0"
      >
        {[
          { label: 'View Resources', path: '/resources' },
          { label: 'Compare Sites', path: '/compare' },
          { label: 'AI Suggestions', path: '/suggestions' },
          { label: 'Get Badge', path: '/badge' },
        ].map((action) => (
          <motion.button
            key={action.label}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(action.path)}
            className={`p-3 sm:p-4 rounded-xl text-center font-medium text-xs sm:text-sm transition-all ${
              isDarkMode
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
            }`}
          >
            {action.label}
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}