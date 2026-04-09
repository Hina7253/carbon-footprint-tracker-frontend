import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useEffect, useState } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  icon: LucideIcon;
  color: 'emerald' | 'blue' | 'orange' | 'purple';
  delay?: number;
}

const colorClasses = {
  emerald: {
    bg: 'from-emerald-500/20 to-green-500/20',
    border: 'border-emerald-500/30',
    icon: 'from-emerald-400 to-green-500',
    text: 'text-emerald-400',
    shadow: 'shadow-emerald-500/20',
  },
  blue: {
    bg: 'from-blue-500/20 to-cyan-500/20',
    border: 'border-blue-500/30',
    icon: 'from-blue-400 to-cyan-500',
    text: 'text-blue-400',
    shadow: 'shadow-blue-500/20',
  },
  orange: {
    bg: 'from-orange-500/20 to-amber-500/20',
    border: 'border-orange-500/30',
    icon: 'from-orange-400 to-amber-500',
    text: 'text-orange-400',
    shadow: 'shadow-orange-500/20',
  },
  purple: {
    bg: 'from-purple-500/20 to-pink-500/20',
    border: 'border-purple-500/30',
    icon: 'from-purple-400 to-pink-500',
    text: 'text-purple-400',
    shadow: 'shadow-purple-500/20',
  },
};

export default function MetricCard({ title, value, unit, icon: Icon, color, delay = 0 }: MetricCardProps) {
  const { isDarkMode } = useAppStore();
  const colors = colorClasses[color];
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
        isDarkMode
          ? `bg-gradient-to-br ${colors.bg} ${colors.border}`
          : 'bg-white border-gray-200 shadow-lg'
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {title}
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-3xl font-bold ${colors.text}`}>
              {displayValue.toFixed(2)}
            </span>
            <span className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              {unit}
            </span>
          </div>
        </div>
        <motion.div
          whileHover={{ rotate: 15 }}
          className={`p-3 rounded-xl bg-gradient-to-br ${colors.icon} shadow-lg ${colors.shadow}`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
}
