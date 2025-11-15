import React from 'react';
import { motion } from 'framer-motion';

interface TransactionCardProps {
  id: string;
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'flagged';
  category?: string;
  source?: string;
  onClick?: () => void;
  className?: string;
  index?: number;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  id,
  amount,
  description,
  date,
  status,
  category,
  source,
  onClick,
  className = '',
  index = 0,
}) => {
  const statusColors = {
    completed: 'border-l-success',
    pending: 'border-l-warning',
    flagged: 'border-l-error',
  };

  const statusBg = {
    completed: 'bg-success/10 text-success',
    pending: 'bg-warning/10 text-warning',
    flagged: 'bg-error/10 text-error',
  };

  return (
    <motion.div
      className={`
        glass-card p-4 border-l-4 ${statusColors[status]}
        cursor-pointer hover:shadow-glass-hover
        ${className}
      `}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100,
      }}
      whileHover={{ x: 4, scale: 1.01 }}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="text-text-primary font-semibold truncate">{description}</h4>
            {category && (
              <span className="px-2 py-1 text-xs rounded-full bg-glass-bg text-text-secondary">
                {category}
              </span>
            )}
            {source === 'gmail' && (
              <span className="px-2 py-1 text-xs rounded-full bg-luxe-gold/20 text-luxe-gold font-medium">
                📧 Gmail
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm text-text-secondary">
            <span className="font-mono">{id}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 ml-4">
          <div className="text-right">
            <p className={`text-2xl font-bold ${amount >= 0 ? 'text-success' : 'text-error'}`}>
              {amount >= 0 ? '+' : ''}${Math.abs(amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${statusBg[status]}`}>
            {status}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TransactionCard;
