import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, TrendingUp, AlertCircle, User, Sparkles, Upload } from 'lucide-react';
import { useState, useCallback } from 'react';
import Modal from './Modal';
import ErrorBoundary from './ErrorBoundary';
import { useDropzone } from 'react-dropzone';
import { useToastStore } from '../store/toastStore';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { useThemeStore } from './ThemeToggle';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  // { path: '/pending-review', label: 'Pending Review', icon: AlertCircle },
  { path: '/analytics', label: 'Analytics', icon: TrendingUp },
];

export default function Navigation() {
  const location = useLocation();
  const isDark = useThemeStore((state) => state.isDark);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const addToast = useToastStore((s) => s.addToast);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    try {
      if (!acceptedFiles || acceptedFiles.length === 0) return;
      setUploadError(null);
      setUploading(true);
      // simulate upload
      setTimeout(() => {
        setUploading(false);
        addToast('success', `Receipt uploaded! Processing ${acceptedFiles.length} file(s)...`);
        setIsUploadOpen(false);
      }, 1500);
    } catch (err) {
      console.error('Upload error:', err);
      setUploading(false);
      setUploadError(err instanceof Error ? err.message : String(err));
    }
  }, [addToast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf'],
    },
  });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${
      isDark 
        ? 'bg-dark/80 border-white/10' 
        : 'bg-white/90 border-gray-200/50 shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className={`w-6 h-6 ${isDark ? 'text-cyan' : 'text-blue-600'}`} />
          </motion.div>
          <span className={`text-xl font-bold ${
            isDark ? 'gradient-text' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
          }`}>LUMEN</span>
        </Link>

        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  isActive
                    ? isDark 
                      ? 'bg-cyan/10 text-cyan' 
                      : 'bg-blue-50 text-blue-600'
                    : isDark
                      ? 'text-text-secondary hover:text-white hover:bg-white/5'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className={`absolute inset-0 rounded-lg -z-10 ${
                      isDark ? 'bg-cyan/10' : 'bg-blue-50'
                    }`}
                  />
                )}
              </Link>
            );
          })}
          {/* Upload opens modal */}
          <div className="flex items-center">
            <button
              onClick={() => setIsUploadOpen(true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isDark 
                  ? 'text-text-secondary hover:text-white hover:bg-white/5'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span className="font-medium text-sm">Upload</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            aria-label="User menu"
            onClick={() => setIsProfileOpen(true)}
            className={`p-2 rounded-lg transition-all ${
              isDark 
                ? 'glass-card hover:bg-white/10' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* Profile Modal */}
      <Modal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)}>
        <ErrorBoundary>
          <div className="flex flex-col items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/10 shadow-xl bg-gradient-to-tr from-cyan/20 to-violet/10 flex items-center justify-center">
              <img src="/src/assets/react.svg" alt="User avatar" className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold">Akhil</h3>
              <p className="text-sm text-text-secondary">akhil@example.com</p>
            </div>

            <div className="w-full mt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  addToast('info', 'Viewing profile (demo)');
                }}
                className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10"
              >
                View Profile
              </button>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  addToast('success', 'Logged out (demo)');
                }}
                className="px-4 py-2 bg-danger/10 text-danger rounded-lg hover:bg-danger/20"
              >
                Logout
              </button>
            </div>
          </div>
        </ErrorBoundary>
      </Modal>
      {/* Upload Modal */}
  <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)}>
        <ErrorBoundary>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
            isDragActive ? 'border-cyan bg-cyan/5 glow-cyan' : 'border-white/20 hover:border-cyan/50 hover:bg-white/5'
          } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-4">
            {uploading ? (
              <>
                <motion.div
                  className="w-16 h-16 border-4 border-cyan/30 border-t-cyan rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                <p className="text-lg font-medium">Processing your receipt...</p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-cyan" />
                <div>
                  <p className="text-lg font-medium mb-2">Drag & drop or click to upload</p>
                  <p className="text-text-secondary text-sm">Supports: JPG, PNG, PDF</p>
                </div>
              </>
            )}
            {uploadError && (
              <div className="mt-4 text-sm text-red-400">Error: {uploadError}</div>
            )}
          </div>
        </div>
        </ErrorBoundary>
      </Modal>
    </nav>
  );
}
