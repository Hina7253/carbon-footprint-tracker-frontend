import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Copy, Check, Download, Code, Eye, Leaf } from 'lucide-react';
import { useAppStore } from '../store/appStore';

export default function Badge() {
  const { isDarkMode, currentAnalysis } = useAppStore();
  const [copied, setCopied] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<'minimal' | 'detailed' | 'compact'>('minimal');

  const score = currentAnalysis?.performanceScore || 85;
  const grade = score >= 90 ? 'A+' : score >= 80 ? 'A' : score >= 70 ? 'B' : score >= 60 ? 'C' : 'D';
  const gradeColor = score >= 80 ? 'emerald' : score >= 60 ? 'yellow' : 'red';

  const embedCode = `<a href="https://carbonscope.io/badge/${currentAnalysis?.url || 'example.com'}" target="_blank">
  <img src="https://carbonscope.io/api/badge?url=${currentAnalysis?.url || 'example.com'}&style=${selectedStyle}" alt="Carbon Score" />
</a>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const styles = [
    { id: 'minimal', label: 'Minimal', desc: 'Clean and simple' },
    { id: 'detailed', label: 'Detailed', desc: 'Shows all metrics' },
    { id: 'compact', label: 'Compact', desc: 'Small inline badge' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Carbon Badge Generator
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Showcase your eco-friendly website with a carbon badge
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badge Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl border flex flex-col items-center justify-center ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <div className="flex items-center gap-2 mb-6">
            <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <span className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Badge Preview
            </span>
          </div>

          {/* Badge */}
          <motion.div
            key={selectedStyle}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${
              selectedStyle === 'compact'
                ? 'inline-flex items-center gap-2 px-4 py-2 rounded-full'
                : 'p-6 rounded-2xl min-w-[280px]'
            } ${
              isDarkMode
                ? `bg-gradient-to-br from-${gradeColor}-900/30 to-${gradeColor}-800/30 border border-${gradeColor}-500/30`
                : `bg-gradient-to-br from-${gradeColor}-50 to-${gradeColor}-100 border border-${gradeColor}-200`
            }`}
          >
            {selectedStyle === 'compact' ? (
              <>
                <Leaf className="w-4 h-4 text-emerald-500" />
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Carbon Score: {grade}
                </span>
              </>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    CarbonScope
                  </span>
                </div>
                <div className={`text-5xl font-bold mb-2 ${
                  gradeColor === 'emerald' ? 'text-emerald-500' :
                  gradeColor === 'yellow' ? 'text-yellow-500' : 'text-red-500'
                }`}>
                  {grade}
                </div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Carbon Score
                </p>
                {selectedStyle === 'detailed' && (
                  <div className="mt-4 pt-4 border-t border-gray-700/30 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>CO₂</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentAnalysis?.co2Emission.toFixed(2) || '0.45'}g
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Size</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currentAnalysis?.pageSize.toFixed(2) || '1.2'}MB
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Score</span>
                      <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {score}/100
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Style Selection */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Badge Style
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {styles.map((style) => (
                <motion.button
                  key={style.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedStyle(style.id as typeof selectedStyle)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedStyle === style.id
                      ? isDarkMode
                        ? 'bg-emerald-500/20 border-emerald-500/50'
                        : 'bg-emerald-50 border-emerald-300'
                      : isDarkMode
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {style.label}
                  </p>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {style.desc}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Embed Code */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Embed Code
                </h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyToClipboard}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  copied
                    ? 'bg-emerald-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>
            <pre className={`p-4 rounded-xl overflow-x-auto text-sm ${
              isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              <code>{embedCode}</code>
            </pre>
          </div>

          {/* Download Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30"
          >
            <Download className="w-5 h-5" />
            Download Badge Image
          </motion.button>
        </motion.div>
      </div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`p-6 rounded-2xl border ${
          isDarkMode
            ? 'bg-gradient-to-br from-emerald-900/20 to-green-900/20 border-emerald-500/30'
            : 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200'
        }`}
      >
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Why Display a Carbon Badge?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Build Trust', desc: 'Show visitors you care about the environment' },
            { title: 'Stand Out', desc: 'Differentiate your brand with eco-credentials' },
            { title: 'Inspire Others', desc: 'Encourage the web community to go green' },
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <Award className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {benefit.title}
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
