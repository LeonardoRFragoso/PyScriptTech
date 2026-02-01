// src/App.js
import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import LoadingSpinner from './components/common/LoadingSpinner';
import BackToTop from './components/common/BackToTop';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Navbar from './components/Navbar/navbar';
import Footer from './components/Footer/footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';

import { logPageView } from './services/analytics';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Lazy load public pages
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ServicesPage = lazy(() => import('./pages/Services/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage/BlogPage'));

// Lazy load auth pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Lazy load dashboard
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const ClientsList = lazy(() => import('./pages/dashboard/Clients/ClientsList'));

// Analytics tracker component
const AnalyticsTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);
  
  return null;
};

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <div className="app-container">
    <Navbar />
    <main>{children}</main>
    <Footer />
    <WhatsAppButton />
    <BackToTop />
  </div>
);

const App = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider>
            <Router>
            <AnalyticsTracker />
            <ScrollToTop />
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f1e 100%)',
                  color: '#fff',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '8px',
                },
              }}
            />
            
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
                <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
                <Route path="/projects" element={<PublicLayout><ProjectsPage /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
                <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
                
                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Dashboard Routes (Protected) */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="clients" element={<ClientsList />} />
                  <Route path="projects" element={<DashboardHome />} />
                  <Route path="tasks" element={<DashboardHome />} />
                  <Route path="finance" element={<DashboardHome />} />
                  <Route path="reports" element={<DashboardHome />} />
                  <Route path="settings" element={<DashboardHome />} />
                </Route>
              </Routes>
            </Suspense>
            </Router>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;
