import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';
import { useThemeStore } from './ThemeToggle';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className = '' }: TiltCardProps) {
  const isDark = useThemeStore((state) => state.isDark);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['17.5deg', '-17.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-17.5deg', '17.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: 'preserve-3d',
      }}
      className={`relative ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className={`rounded-2xl p-6 backdrop-blur-sm ${
          isDark
            ? 'bg-white/5 border border-white/10'
            : 'bg-white/80 border border-gray-200 shadow-xl'
        }`}
      >
        {children}
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(0,217,255,0.2), rgba(139,92,246,0.2))'
            : 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3), rgba(147,51,234,0.3))',
        }}
      />
    </motion.div>
  );
}
