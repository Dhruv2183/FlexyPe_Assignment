import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BarChart3, Lightbulb, Award, ArrowRight } from 'lucide-react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import './index.css';
import './App.css';

// Protected Route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Public Route wrapper (redirect to profile if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

// Landing page component
function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-background">
        <div className="landing-orb landing-orb-1"></div>
        <div className="landing-orb landing-orb-2"></div>
        <div className="landing-orb landing-orb-3"></div>
      </div>

      <div className="landing-content">
        <div className="landing-hero">
          <span className="landing-badge">🚀 Presenting FlexyPe</span>
          <h1 className="landing-title">
            Simple <span className="text-gradient">1 Click</span><br />
            Checkout That Converts
          </h1>
          <p className="landing-subtitle">
            Skyrocket your sales with the innovative checkout suite that provides a faster,
            smoother, and wiser checkout experience.
          </p>

          <div className="landing-cta">
            <a href="/signup" className="btn btn-primary btn-lg">
              Get Started <ArrowRight size={18} />
            </a>
            <a href="/login" className="btn btn-secondary btn-lg">
              Login
            </a>
          </div>

          <div className="landing-features">
            <div className="landing-feature">
              <div className="feature-icon-wrapper">
                <BarChart3 size={24} />
              </div>
              <span>Shopping Analytics</span>
            </div>
            <div className="landing-feature">
              <div className="feature-icon-wrapper">
                <Lightbulb size={24} />
              </div>
              <span>Smart Insights</span>
            </div>
            <div className="landing-feature">
              <div className="feature-icon-wrapper">
                <Award size={24} />
              </div>
              <span>Achievements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
