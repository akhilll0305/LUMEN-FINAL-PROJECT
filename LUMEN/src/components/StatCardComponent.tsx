import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { LucideIcon, Edit2, Check, X } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  animated?: boolean;
  decimals?: number;
  editable?: boolean;
  onSave?: (value: number) => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  prefix = '',
  suffix = '',
  icon: Icon,
  trend,
  trendValue,
  className = '',
  animated = true,
  decimals = 0,
  editable = false,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(String(value));

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-text-secondary',
  };

  const handleSave = () => {
    const numValue = parseFloat(tempValue);
    if (!isNaN(numValue) && numValue >= 0 && onSave) {
      onSave(numValue);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setTempValue(String(value));
    setIsEditing(false);
  };

  return (
    <motion.div
      className={`glass-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="text-text-secondary text-sm font-medium">{title}</p>
            {editable && !isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 hover:bg-glass-bg rounded transition-colors"
                title="Edit value"
              >
                <Edit2 className="w-3 h-3 text-text-secondary" />
              </button>
            )}
          </div>
          <div className="flex items-baseline gap-2">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <span className="text-text-primary text-3xl font-bold">{prefix}</span>
                <input
                  type="number"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="w-32 px-2 py-1 bg-glass-bg border border-glass-border rounded text-text-primary text-xl font-bold focus:outline-none focus:ring-2 focus:ring-cyan"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') handleCancel();
                  }}
                />
                <button
                  onClick={handleSave}
                  className="p-1 bg-cyan/20 hover:bg-cyan/30 rounded transition-colors"
                  title="Save"
                >
                  <Check className="w-4 h-4 text-cyan" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1 bg-error/20 hover:bg-error/30 rounded transition-colors"
                  title="Cancel"
                >
                  <X className="w-4 h-4 text-error" />
                </button>
              </div>
            ) : (
              <span className="text-text-primary text-3xl font-bold">
                {prefix}
                {animated && typeof value === 'number' ? (
                  <CountUp end={value} duration={2} decimals={decimals} separator="," />
                ) : (
                  value
                )}
                {suffix}
              </span>
            )}
          </div>
          {trend && trendValue && !isEditing && (
            <div className={`flex items-center gap-1 mt-2 ${trendColors[trend]}`}>
              <span className="text-sm font-medium">{trendValue}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="bg-gradient-card p-3 rounded-lg">
            <Icon className="w-6 h-6 text-luxe-gold" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;
