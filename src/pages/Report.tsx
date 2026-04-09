import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, FileText, CheckCircle, Download, Calendar, Clock } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import Toast from '../components/Toast';

export default function Report() {
  const { isDarkMode, currentAnalysis } = useAppStore();
  const [email, setEmail] = useState('');
  const [frequency, setFrequency] = useState<'once' | 'weekly' | 'monthly'>('once');
  const [isSending, setIsSending] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleSendReport = async () => {
    if (!email || !email.includes('@')) {
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSending(false);
    setToastType('success');
    setShowToast(true);
    setEmail('');
  };

  const reportFeatures = [
    { icon: FileText, title: 'Detailed Analysis', desc: 'Complete breakdown of your carbon footprint' },
    { icon: Calendar, title: 'Historical Data', desc: 'Track changes over time' },
    { icon: CheckCircle, title: 'Actionable Tips', desc: 'Personalized optimization suggestions' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Email Report
        </h1>
        <p className={`mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Get a detailed carbon analysis report delivered to your inbox
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Send Report
              </h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {currentAnalysis?.url || 'example.com'}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <Mail className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={`flex-1 bg-transparent outline-none ${
                    isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
                  }`}
                />
              </div>
            </div>

            {/* Frequency Selection */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Report Frequency
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'once', label: 'One-time', icon: Send },
                  { id: 'weekly', label: 'Weekly', icon: Calendar },
                  { id: 'monthly', label: 'Monthly', icon: Clock },
                ].map((option) => (
                  <motion.button
                    key={option.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFrequency(option.id as typeof frequency)}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                      frequency === option.id
                        ? isDarkMode
                          ? 'bg-emerald-500/20 border-emerald-500/50'
                          : 'bg-emerald-50 border-emerald-300'
                        : isDarkMode
                        ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                        : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <option.icon className={`w-5 h-5 ${
                      frequency === option.id ? 'text-emerald-500' : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      frequency === option.id
                        ? 'text-emerald-500'
                        : isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Send Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSendReport}
              disabled={isSending}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 disabled:opacity-70"
            >
              {isSending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Report
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Report Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-2xl border ${
            isDarkMode
              ? 'bg-gray-900/50 border-gray-800'
              : 'bg-white border-gray-200 shadow-lg'
          }`}
        >
          <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            What's Included
          </h3>
          <div className="space-y-4">
            {reportFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                }`}
              >
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <feature.icon className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sample Report Download */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full mt-6 py-3 rounded-xl border flex items-center justify-center gap-2 transition-colors ${
              isDarkMode
                ? 'border-gray-700 hover:bg-gray-800 text-white'
                : 'border-gray-200 hover:bg-gray-50 text-gray-900'
            }`}
          >
            <Download className="w-5 h-5" />
            Download Sample Report
          </motion.button>
        </motion.div>
      </div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`p-6 rounded-2xl border ${
          isDarkMode
            ? 'bg-gray-900/50 border-gray-800'
            : 'bg-white border-gray-200 shadow-lg'
        }`}
      >
        <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Recent Reports
        </h3>
        <div className="space-y-3">
          {[
            { url: 'example.com', date: '2024-01-15', status: 'sent' },
            { url: 'mysite.io', date: '2024-01-12', status: 'sent' },
            { url: 'portfolio.dev', date: '2024-01-10', status: 'sent' },
          ].map((report, i) => (
            <div
              key={i}
              className={`flex items-center justify-between p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <FileText className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {report.url}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {report.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-emerald-500">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">{report.status}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Toast */}
      <Toast
        message={toastType === 'success' ? 'Report sent successfully!' : 'Please enter a valid email'}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
