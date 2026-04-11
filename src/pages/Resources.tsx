import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Image, Code, Video, FileText, Type, Package, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { useAppStore } from '../store/appStore';

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
  const { isDarkMode, currentAnalysis } = useAppStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // ❌ अगर data नहीं है
  if (!currentAnalysis) {
    return (
      <div className="text-center mt-20">
        <p className="text-gray-500">No data found. Please analyze a website first.</p>
      </div>
    );
  }

  const filteredResources = useMemo(() => {
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
          isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            placeholder="Search resources..."
            className="flex-1 bg-transparent outline-none"
          />
        </div>

        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
          isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'
        }`}>
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
            className="bg-transparent outline-none cursor-pointer"
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
      <motion.div className={`rounded-2xl border overflow-hidden ${
        isDarkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200 shadow-lg'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}>
                <th className="px-6 py-4 text-left text-sm font-semibold">Resource URL</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Size</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedResources.map((resource, index) => {
                const Icon = typeIcons[resource.type];
                return (
                  <motion.tr key={resource.id}>
                    <td className="px-6 py-4">{resource.url}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded ${typeColors[resource.type]}`}>
                        <Icon className="w-4 h-4 inline mr-1" />
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">{resource.size.toFixed(2)} KB</td>
                    <td className="px-6 py-4">
                      <button onClick={() => copyToClipboard(resource.url, resource.id)}>
                        {copiedId === resource.id ? <Check /> : <Copy />}
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between p-4">
          <p>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredResources.length)}
          </p>

          <div className="flex gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
              <ChevronLeft />
            </button>

            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
              <ChevronRight />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}