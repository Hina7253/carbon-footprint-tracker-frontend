import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';

interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ value, max = 100, label, showPercentage = true }: ProgressBarProps) {
  const { isDarkMode } = useAppStore();
  const percentage = (value / max) * 100;
  
  const getColor = () => {
    if (percentage >= 80) return 'from-emerald-400 to-green-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {label}
        </span>
        {showPercentage && (
          <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {percentage.toFixed(0)}%
          </span>
        )}
      </div>
      <div className={`h-3 rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${getColor()}`}
        />
      </div>
    </div>
  );
}
