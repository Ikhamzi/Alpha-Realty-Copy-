import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Landing from './pages/Landing.jsx';
import OperationsDashboard from './pages/OperationsDashboard.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ReferralLogin from './pages/ReferralLogin.jsx';
import PartnerLogin from './pages/PartnerLogin.jsx';
import ReferralDashboard from './pages/ReferralDashboard.jsx';
import PartnerDashboard from './pages/PartnerDashboard.jsx';
import RewardsPage from './pages/RewardsPage.jsx';
import SubmitReferralPage from './pages/SubmitReferralPage.jsx';
import TrackReferralsPage from './pages/TrackReferralsPage.jsx';

const queryClient = new QueryClient();

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-[100vh] bg-gray-50">Loading...</div>;
  if (!user) return <Navigate to="/choose-login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

function AppContent() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/operations" element={<OperationsDashboard />} />
        <Route path="/referral-login" element={<ReferralLogin />} />
        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route path="/choose-login" element={<Login />} />
        <Route path="/login" element={<Navigate to="/choose-login" replace />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            user ? (
              user.role === 'referral' ? <Navigate to="/referral-dashboard" replace /> : <Navigate to="/partner-dashboard" replace />
            ) : (
              <Navigate to="/choose-login" replace />
            )
          }
        />
        <Route path="/referral-dashboard" element={
          <ProtectedRoute roles={['referral']}>
            <ReferralDashboard />
          </ProtectedRoute>
        } />
        <Route path="/referral-dashboard/rewards" element={
          <ProtectedRoute roles={['referral']}>
            <RewardsPage />
          </ProtectedRoute>
        } />
        <Route path="/referral-dashboard/submit" element={
          <ProtectedRoute roles={['referral']}>
            <SubmitReferralPage />
          </ProtectedRoute>
        } />
        <Route path="/referral-dashboard/track" element={
          <ProtectedRoute roles={['referral']}>
            <TrackReferralsPage />
          </ProtectedRoute>
        } />
        <Route path="/partner-dashboard/*" element={
          <ProtectedRoute roles={['partner']}>
            <PartnerDashboard />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

