import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Leaf, Globe, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';
import { generateMockAnalysis } from '../lib/mockData';

export default function Home() {
  const { isDarkMode, setCurrentAnalysis, setIsLoading } = useAppStore();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleAnalyze = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    setIsLoading(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const analysis = generateMockAnalysis(url);
    setCurrentAnalysis(analysis);
    setIsAnalyzing(false);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const features = [
    { icon: Globe, title: 'Website Analysis', desc: 'Deep scan of any website' },
    { icon: Zap, title: 'Performance Metrics', desc: 'Load time & resource usage' },
    { icon: Leaf, title: 'Carbon Footprint', desc: 'CO₂ emission calculations' },
    { icon: Sparkles, title: 'AI Suggestions', desc: 'Smart optimization tips' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-emerald-500' : 'bg-emerald-300'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20 ${
          isDarkMode ? 'bg-cyan-500' : 'bg-cyan-300'
        }`} />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30"
        >
          <Leaf className="w-10 h-10 text-white" />
        </motion.div>

        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Measure Your Website's
          <span className="block bg-gradient-to-r from-emerald-400 via-green-500 to-cyan-500 bg-clip-text text-transparent">
            Carbon Footprint
          </span>
        </h1>

        <p className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Analyze, compare, and optimize your website's environmental impact with AI-powered insights
        </p>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`relative max-w-2xl mx-auto rounded-2xl p-2 ${
            isDarkMode
              ? 'bg-gray-900/80 border border-gray-800'
              : 'bg-white border border-gray-200 shadow-xl'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g., example.com)"
              className={`flex-1 bg-transparent outline-none text-lg ${
                isDarkMode
                  ? 'text-white placeholder-gray-500'
                  : 'text-gray-900 placeholder-gray-400'
              }`}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-emerald-500/30 disabled:opacity-70"
            >
              {isAnalyzing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Analyze
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Loading Animation */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8"
            >
              <div className="flex items-center justify-center gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                    className="w-3 h-3 rounded-full bg-emerald-500"
                  />
                ))}
              </div>
              <p className={`mt-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Analyzing website...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-20 px-6"
      >
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            whileHover={{ y: -4 }}
            className={`p-5 rounded-2xl text-center transition-all ${
              isDarkMode
                ? 'bg-gray-900/50 border border-gray-800 hover:border-emerald-500/50'
                : 'bg-white/80 border border-gray-200 hover:border-emerald-500/50 shadow-lg'
            }`}
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {feature.title}
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
