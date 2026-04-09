import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Trash2 } from 'lucide-react';
import { useAppStore, type ChatMessage } from '../store/appStore';

const aiResponses = [
  "Based on my analysis, your website could reduce CO₂ emissions by 40% by implementing image compression and lazy loading.",
  "I recommend switching to a green hosting provider. This alone could make your site carbon neutral.",
  "Your JavaScript bundles are quite large. Consider code splitting to improve load times and reduce energy consumption.",
  "Implementing browser caching would significantly reduce repeat visitor impact on your carbon footprint.",
  "The videos on your site account for 60% of the page weight. Consider using optimized video formats or thumbnails with click-to-play.",
  "Your CSS could be optimized by removing unused styles. Tools like PurgeCSS can help with this.",
  "Consider using system fonts instead of web fonts to reduce HTTP requests and file sizes.",
  "A Content Delivery Network (CDN) would reduce the distance data travels, lowering energy consumption.",
];

export default function Chat() {
  const { isDarkMode, chatMessages, addChatMessage, clearChatMessages } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };
    addChatMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500));

    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
      timestamp: new Date(),
    };
    addChatMessage(aiMessage);
    setIsTyping(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2 sm:px-0 flex-wrap gap-2">
        <div className="min-w-0">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AI Chat
          </h1>
          <p className={`mt-1 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Get personalized optimization advice
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={clearChatMessages}
          className={`p-2 rounded-xl transition-colors flex-shrink-0 ${
            isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          <Trash2 className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Chat Container */}
      <div className={`flex-1 rounded-2xl border overflow-hidden flex flex-col ${
        isDarkMode
          ? 'bg-gray-900/50 border-gray-800'
          : 'bg-white border-gray-200 shadow-lg'
      }`}>
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4">
          {chatMessages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 sm:py-12"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className={`text-lg sm:text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                CarbonScope AI Assistant
              </h3>
              <p className={`max-w-md mx-auto text-sm sm:text-base px-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Ask me anything about reducing your website's carbon footprint, improving performance, or implementing eco-friendly practices.
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {chatMessages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className={`flex gap-2 sm:gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                    : 'bg-gradient-to-br from-emerald-500 to-green-600'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </div>
                <div className={`max-w-[70%] sm:max-w-[60%] p-3 sm:p-4 rounded-2xl ${
                  message.role === 'user'
                    ? isDarkMode
                      ? 'bg-blue-500/20 border border-blue-500/30'
                      : 'bg-blue-50 border border-blue-100'
                    : isDarkMode
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-gray-100 border border-gray-200'
                }`}>
                  <p className={`text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {message.content}
                  </p>
                  <p className={`text-xs mt-1 sm:mt-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-2 sm:gap-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className={`p-3 sm:p-4 rounded-2xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-2 h-2 rounded-full bg-emerald-500"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className={`p-3 sm:p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className={`flex items-center gap-2 p-2 rounded-xl ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about carbon optimization..."
              className={`flex-1 bg-transparent outline-none px-2 sm:px-3 py-2 text-sm sm:text-base ${
                isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
              }`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 sm:p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/30 disabled:opacity-50 flex-shrink-0"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
