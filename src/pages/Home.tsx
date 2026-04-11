import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Leaf, Globe, Zap, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/appStore';

import carbonApi from '../lib/api';        

export default function Home() {
  const { isDarkMode, setCurrentAnalysis, setIsLoading } = useAppStore();
  
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  // ==================== REAL API CALL ====================
  const handleAnalyze = async () => {
    if (!url.trim()) return;

    setIsAnalyzing(true);
    setIsLoading(true);

    try {
      // Real Backend API Call
      const analysis = await carbonApi.startAnalysis(url);
      console.log("API RESPONSE:", analysis);

      
      setCurrentAnalysis(analysis);

      
      navigate('/dashboard');

    } catch (error: any) {
      console.error("Analysis Error:", error);
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || "Failed to analyze website. Please check URL and try again.";
      
      alert(`❌ ${errorMessage}`);
    } finally {
      setIsAnalyzing(false);
      setIsLoading(false);
    }
  };

  const features = [
    { icon: Globe, title: 'Website Analysis', desc: 'Deep scan of any website' },
    { icon: Zap, title: 'Performance Metrics', desc: 'Load time & resource usage' },
    { icon: Leaf, title: 'Carbon Footprint', desc: 'CO₂ emission calculations' },
    { icon: Sparkles, title: 'AI Suggestions', desc: 'Smart optimization tips' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-950 dark:to-emerald-950">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Measure Your Website's <span className="text-emerald-600">Carbon Footprint</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
          Analyze, compare, and optimize your website's environmental impact with AI-powered insights
        </p>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto">
          <div className={`flex items-center gap-3 p-2 rounded-2xl border ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <Search className={`w-6 h-6 ml-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="Enter website URL (e.g., example.com)"
              className={`flex-1 bg-transparent outline-none text-lg ${
                isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !url.trim()}
              className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                isAnalyzing 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isAnalyzing ? (
                <>Analyzing...</>
              ) : (
                <>
                  Analyze <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      <AnimatePresence>
        {isAnalyzing && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="text-center">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-4 h-4 bg-emerald-500 rounded-full inline-block mx-1"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
              <p className="mt-6 text-white text-lg">Analyzing website...</p>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Features Grid */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl ${
                isDarkMode ? 'bg-gray-900' : 'bg-white shadow'
              }`}
            >
              <feature.icon className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}