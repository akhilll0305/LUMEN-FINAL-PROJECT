import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-3xl z-40 pointer-events-auto"
          />

          {/* Centered with equal margins */}
          <div
            onClick={onClose}
            style={{margin: "17rem"}}
            className="fixed inset-0 z-50 flex items-center justify-center p-12"
          >
            <motion.div
                className="relative glass-card modal-card-bg w-full max-w-[1100px] max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl shadow-2xl ring-1 ring-black/20"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ type: 'spring', bounce: 0.25, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* close button only */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
