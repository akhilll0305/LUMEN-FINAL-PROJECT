import { motion } from 'framer-motion';

export default function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-bg-tertiary rounded ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
      />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-start justify-between mb-4">
        <SkeletonLoader className="w-12 h-12 rounded-lg" />
        <SkeletonLoader className="w-16 h-6 rounded" />
      </div>
      <SkeletonLoader className="w-24 h-4 rounded mb-2" />
      <SkeletonLoader className="w-32 h-8 rounded" />
    </div>
  );
}
