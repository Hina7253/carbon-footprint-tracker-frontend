import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Image, Code, Video, FileText, Type, Package, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { generateMockAnalysis } from '../lib/mockData';
import { useEffect } from 'react';

const typeIcons = {
  image: Image,
  script: Code,
  video: Video,
  stylesheet: FileText,
  font: Type,
  other: Package,
};

const typeColors = {
  image: 'text-emerald-500 bg-emerald-500/20',
  script: 'text-blue-500 bg-blue-500/20',
  video: 'text-red-500 bg-red-500/20',
  stylesheet: 'text-yellow-500 bg-yellow-500/20',
  font: 'text-purple-500 bg-purple-500/20',
  other: 'text-gray-500 bg-gray-500/20',
};

export default function Resources() {
  const { isDarkMode, currentAnalysis, setCurrentAnalysis } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!currentAnalysis) {
      setCurrentAnalysis(generateMockAnalysis('example.com'));
    }
  }, [currentAnalysis, setCurrentAnalysis]);

  const filteredResources = useMemo(() => {
    if (!currentAnalysis) return [];
    return currentAnalysis.resources.filter(resource => {
      const matchesSearch = resource.url.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || resource.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [currentAnalysis, searchTerm, filterType]);

  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!currentAnalysis) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Resource Details
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {filteredResources.length} resources found
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl border ${
          isDarkMode
            ? 'bg-gray-900/50 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <Search className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search resources..."
            className={`flex-1 bg-transparent outline-none ${
              isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>

        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
          isDarkMode
            ? 'bg-gray-900/50 border-gray-800'
            : 'bg-white border-gray-200'
        }`}>
          <Filter className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
            className={`bg-transparent outline-none cursor-pointer ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <option value="all">All Types</option>
            <option value="image">Images</option>
            <option value="script">Scripts</option>
            <option value="stylesheet">Stylesheets</option>
            <option value="video">Videos</option>
            <option value="font">Fonts</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border overflow-hidden ${
          isDarkMode
            ? 'bg-gray-900/50 border-gray-800'
            : 'bg-white border-gray-200 shadow-lg'
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Resource URL</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Type</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Size</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResources.map((resource, index) => {
                const Icon = typeIcons[resource.type];
                return (
                  <motion.tr
                    key={resource.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border-t transition-colors ${
                      isDarkMode
                        ? 'border-gray-800 hover:bg-gray-800/50'
                        : 'border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className={`text-sm truncate max-w-md ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {resource.url}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${typeColors[resource.type]}`}>
                        <Icon className="w-4 h-4" />
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {resource.size.toFixed(2)} KB
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(resource.url, resource.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                        }`}
                      >
                        {copiedId === resource.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className={`w-4 h-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        )}
                      </motion.button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={`flex items-center justify-between px-6 py-4 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-100'
        }`}>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredResources.length)} of {filteredResources.length}
          </p>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-emerald-500 text-white'
                    : isDarkMode
                    ? 'hover:bg-gray-800 text-gray-400'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {page}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg transition-colors disabled:opacity-50 ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
