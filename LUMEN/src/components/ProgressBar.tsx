import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  color?: 'cyan' | 'success' | 'warning' | 'danger';
  showPercentage?: boolean;
}

const colorStyles = {
  cyan: 'bg-cyan',
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
};

export default function ProgressBar({
  current,
  max,
  label,
  color = 'cyan',
  showPercentage = true,
}: ProgressBarProps) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPercentage((current / max) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [current, max]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-text-secondary">{label}</span>
          {showPercentage && (
            <span className="text-sm font-medium">{percentage.toFixed(0)}%</span>
          )}
        </div>
      )}
      <div className="w-full bg-bg-tertiary rounded-full h-2 overflow-hidden">
        <motion.div
          className={`h-full ${colorStyles[color]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
