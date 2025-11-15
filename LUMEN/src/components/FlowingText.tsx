import { motion } from 'framer-motion';

export default function FlowingText({ children, className = '' }: { children: string; className?: string }) {
  const words = children.split(' ');

  return (
    <div className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.05,
            duration: 0.5,
          }}
          whileHover={{
            scale: 1.2,
            color: '#00D9FF',
            transition: { duration: 0.2 },
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}
