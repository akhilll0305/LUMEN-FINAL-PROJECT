import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from './components/Toast';
import { useToastStore } from './store/toastStore';
import { useAuthStore } from './store/authStore';
import LandingPagePremium from './pages/LandingPagePremium';
import AuthPage from './pages/AuthPage';
import DashboardPremium from './pages/DashboardPremium';
import PendingReviewPagePremium from './pages/PendingReviewPagePremium';
import ChatPagePremium from './pages/ChatPagePremium';
import AnalyticsPage from './pages/AnalyticsPage';
import ViewProfile from './pages/ViewProfile';
import UpdateProfile from './pages/UpdateProfile';
import AddTransaction from './pages/AddTransaction';
import UploadModal from './components/UploadModal';
import AIChatAssistant from './components/AIChatAssistant';

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasToken = localStorage.getItem('AUTH_TOKEN');
  return (isAuthenticated || hasToken) ? (
    <>
      {children}
      <AIChatAssistant />
    </>
  ) : (
    <Navigate to="/auth" replace />
  );
}

function App() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen text-text-primary relative overflow-hidden">
        <Routes>
          <Route path="/" element={<LandingPagePremium />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPremium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending-reviews"
            element={
              <ProtectedRoute>
                <PendingReviewPagePremium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatPagePremium />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-transaction"
            element={
              <ProtectedRoute>
                <AddTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-profile"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-profile"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ViewProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <ToastContainer toasts={toasts} onClose={removeToast} />
        <UploadModal />
      </div>
    </Router>
  );
}

export default App;

