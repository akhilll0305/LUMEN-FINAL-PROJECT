import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import UltraPremiumBackground from '../components/UltraPremiumBackground';
import MouseGlow from '../components/MouseGlow';
import AuthenticatedNav from '../components/AuthenticatedNav';
import GlassCard from '../components/GlassCard';
import Button from '../components/Button';

export default function UploadPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      setTimeout(() => {
        setSelectedFile(null);
        setUploadSuccess(false);
      }, 2000);
    }, 1500);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <PageTransition className="min-h-screen pb-20 relative overflow-hidden">
      <UltraPremiumBackground />
      <MouseGlow />
      <AuthenticatedNav />

      <div className="max-w-7xl mx-auto px-6 pt-28 pb-12">
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl"
              >
                <GlassCard className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-heading font-bold gradient-text-premium">
                      Upload Document
                    </h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-text-secondary hover:text-white transition-colors"
                      aria-label="Close modal"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Upload Area */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-glass-border rounded-glass-lg p-12 mb-6 text-center bg-glass-bg/30 transition-all hover:border-luxe-gold/50"
                  >
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    
                    {!selectedFile ? (
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center mb-4 shadow-gold-glow">
                            <Upload className="w-10 h-10 text-bg-primary" />
                          </div>
                          <p className="text-xl font-semibold mb-2">Drop files here or click to upload</p>
                          <p className="text-sm text-text-secondary">
                            Supports: PDF, JPG, PNG, DOC, DOCX
                          </p>
                        </motion.div>
                      </label>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                      >
                        {uploadSuccess ? (
                          <div className="flex items-center gap-3 text-success">
                            <CheckCircle className="w-8 h-8" />
                            <span className="text-xl font-semibold">Upload Successful!</span>
                          </div>
                        ) : (
                          <>
                            <FileText className="w-16 h-16 text-luxe-gold mb-4" />
                            <p className="text-lg font-semibold mb-2">{selectedFile.name}</p>
                            <p className="text-sm text-text-secondary mb-4">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </p>
                            <button
                              onClick={() => setSelectedFile(null)}
                              className="text-sm text-text-secondary hover:text-white transition-colors"
                            >
                              Remove file
                            </button>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Upload Button */}
                  <div className="flex gap-4">
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      onClick={handleUpload}
                      disabled={!selectedFile || uploading || uploadSuccess}
                      glow
                    >
                      {uploading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-bg-primary border-t-transparent rounded-full"
                        />
                      ) : uploadSuccess ? (
                        'Uploaded!'
                      ) : (
                        'Upload Document'
                      )}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="relative z-10">
          <h1 className="text-4xl font-heading font-bold mb-8 gradient-text-premium">
            Document Upload
          </h1>
          
          <GlassCard className="p-8">
            <p className="text-text-secondary mb-6">
              Upload your financial documents, receipts, and invoices for AI-powered analysis.
            </p>
            
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              glow
            >
              <Upload className="w-5 h-5" />
              Open Upload Modal
            </Button>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
