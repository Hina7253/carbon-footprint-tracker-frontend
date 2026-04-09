import { motion } from 'framer-motion';
import { Leaf, Mail, MapPin, Phone, Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useState } from 'react';

interface FooterProps {
  isSidebarOpen?: boolean;
}

export default function Footer({ isSidebarOpen = false }: FooterProps) {
  const { isDarkMode } = useAppStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Roadmap', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Support', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Press', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Cookies', href: '#' },
        { label: 'License', href: '#' },
      ],
    },
  ];

  const stats = [
    { label: 'Websites Analyzed', value: '50K+' },
    { label: 'CO₂ Saved', value: '125K kg' },
    { label: 'Users Active', value: '12K+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <footer
      className={`relative w-full border-t transition-all duration-300 ${
        isDarkMode ? 'bg-gray-950/50 border-gray-800' : 'bg-gray-50 border-gray-200'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? 'bg-emerald-500' : 'bg-emerald-300'
          }`}
        />
        <div
          className={`absolute -bottom-32 -right-40 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? 'bg-cyan-500' : 'bg-cyan-300'
          }`}
        />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        

        {/* Main Footer Content */}
        <div className="mx-6 px-6 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12"
          >
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
                  CarbonScope
                </span>
              </div>
              <p className={`text-sm mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Measure, analyze, and reduce your website's carbon footprint with AI-powered insights.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: '#' },
                  { icon: Linkedin, href: '#' },
                  { icon: Twitter, href: '#' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2.5 rounded-lg transition-colors ${
                      isDarkMode
                        ? 'bg-gray-800 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400'
                        : 'bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600'
                    }`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Links Grid */}
            {footerLinks.map((column, colIndex) => (
              <motion.div key={colIndex} variants={itemVariants}>
                <h4
                  className={`font-semibold mb-4 text-sm uppercase tracking-wide ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links.map((link, linkIndex) => (
                    <motion.li
                      key={linkIndex}
                      whileHover={{ x: 4 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <a
                        href={link.href}
                        className={`text-sm transition-colors ${
                          isDarkMode
                            ? 'text-gray-400 hover:text-emerald-400'
                            : 'text-gray-600 hover:text-emerald-600'
                        }`}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Info */}
         
          {/* Divider */}
          <div className={`h-px mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`} />

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              © 2026 CarbonScope. All rights reserved. Helping the web stay green. 🌱
            </p>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2.5 rounded-full transition-all ${
                isDarkMode
                  ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 text-emerald-400'
                  : 'bg-gradient-to-br from-emerald-100 to-cyan-100 hover:from-emerald-200 hover:to-cyan-200 text-emerald-600'
              }`}
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
