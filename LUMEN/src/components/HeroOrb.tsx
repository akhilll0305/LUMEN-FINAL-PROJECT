import { motion } from 'framer-motion';

export default function HeroOrb() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {/* Main orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,217,255,0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Secondary orb */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Accent rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-cyan/20"
          style={{
            width: `${400 + i * 100}px`,
            height: `${400 + i * 100}px`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
