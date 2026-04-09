import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';

interface SkeletonLoaderProps {
  type: 'card' | 'chart' | 'table' | 'text';
  count?: number;
}

export default function SkeletonLoader({ type, count = 1 }: SkeletonLoaderProps) {
  const { isDarkMode } = useAppStore();
  const baseClass = `animate-pulse rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'}`;

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className={`${baseClass} p-6 h-32`}>
            <div className={`h-4 w-24 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            <div className={`h-8 w-32 rounded mt-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
          </div>
        );
      case 'chart':
        return <div className={`${baseClass} h-64`} />;
      case 'table':
        return (
          <div className={`${baseClass} p-4 space-y-3`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className={`h-10 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`} />
            ))}
          </div>
        );
      case 'text':
        return <div className={`${baseClass} h-4 w-full`} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </motion.div>
  );
}
