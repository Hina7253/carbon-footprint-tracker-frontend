import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Clock, Globe } from 'lucide-react';
import carbonApi from '../lib/api';
import { useAppStore } from '../store/appStore';

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { isDarkMode, setCurrentAnalysis } = useAppStore();

  // ================= FETCH =================
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await carbonApi.getHistory();
      setHistory(res.data || []);
    } catch (err) {
      console.error("History fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= CLICK =================
  const handleClick = async (item: any) => {
    try {
      const res = await carbonApi.getAnalysisById(item.id);

      const mapped = mapBackendToFrontend(res.data);

      setCurrentAnalysis(mapped);

      navigate('/dashboard');
    } catch (err) {
      console.error("Error loading report:", err);
    }
  };

  // ================= MAPPING =================
  const mapBackendToFrontend = (data: any) => ({
    url: data.websiteUrl,
    pageSize: (data.resourceSummary?.totalTransferBytes || 0) / (1024 * 1024),
    co2Emission: data.carbonMetrics?.co2PerVisitGrams || 0,
    loadTime: 2,
    totalResources: data.resourceSummary?.totalResourceCount || 0,
    performanceScore: getScore(data.grade),
    resources: data.hotspots?.map((r: any, i: number) => ({
      id: i,
      url: r.url,
      type: r.type?.toLowerCase(),
      size: r.sizeBytes,
      carbon: r.co2Grams,
    })) || [],
  });

  const getScore = (grade: string) => {
    switch (grade) {
      case 'A': return 90;
      case 'B': return 75;
      case 'C': return 60;
      case 'D': return 40;
      default: return 50;
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="p-6">
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Loading history...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full px-2 sm:px-0">
      
      {/* Header */}
      <div>
        <h1 className={`text-2xl sm:text-3xl font-bold ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          History
        </h1>
        <p className={`mt-1 text-sm ${
          isDarkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Your previously analyzed websites
        </p>
      </div>

      {/* Cards */}
      {history.length === 0 ? (
        <div className={`p-6 rounded-xl border ${
          isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <p className="text-center text-gray-500">
            No history found
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleClick(item)}
              className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all ${
                isDarkMode
                  ? 'bg-gray-900/50 border-gray-800 hover:bg-gray-800'
                  : 'bg-white border-gray-200 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {/* Top Row */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Globe className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold truncate">
                    {item.websiteUrl}
                  </span>
                </div>

                <span className={`text-sm font-bold ${
                  item.grade === 'A' ? 'text-emerald-500' :
                  item.grade === 'B' ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {item.grade}
                </span>
              </div>

              {/* Middle */}
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  CO₂: {item.co2PerVisitGrams?.toFixed(3)} g/view
                </span>

                <span className="text-gray-500">
                  Pages: {item.crawlPages}
                </span>
              </div>

              {/* Bottom */}
              <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3 h-3" />
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}