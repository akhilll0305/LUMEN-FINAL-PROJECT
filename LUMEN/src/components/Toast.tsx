import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  warning: AlertTriangle,
};

const styles = {
  success: 'bg-success/10 border-success text-success',
  error: 'bg-danger/10 border-danger text-danger',
  info: 'bg-info/10 border-info text-info',
  warning: 'bg-warning/10 border-warning text-warning',
};

export default function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  const Icon = icons[type];

  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`flex items-center gap-3 p-4 rounded-lg border ${styles[type]} backdrop-blur-sm min-w-[300px] shadow-lg`}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm font-medium text-white">{message}</p>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        title="Dismiss notification"
        className="p-1 hover:bg-white/10 rounded transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: Array<{ id: string; type: ToastType; message: string }>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => onClose(toast.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
