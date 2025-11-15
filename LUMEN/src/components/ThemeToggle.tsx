import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`relative p-2 rounded-lg backdrop-blur-sm transition-all duration-300 ${
        isDark 
          ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
          : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="w-5 h-5 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="w-5 h-5 text-blue-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
