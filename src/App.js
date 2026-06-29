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

// Lazy load case study pages
const OraculoCase = lazy(() => import('./pages/CasesPage/OraculoCase'));
const LogiFlowCase = lazy(() => import('./pages/CasesPage/LogiFlowCase'));
const ProFlowCase = lazy(() => import('./pages/CasesPage/ProFlowCase'));

// Lazy load keyword landing pages
const SoftwareSobMedida = lazy(() => import('./pages/LandingPages/SoftwareSobMedida'));
const DesenvolvimentoPython = lazy(() => import('./pages/LandingPages/DesenvolvimentoPython'));
const AutomacaoEmpresarial = lazy(() => import('./pages/LandingPages/AutomacaoEmpresarial'));
const InteligenciaArtificialEmpresas = lazy(() => import('./pages/LandingPages/InteligenciaArtificialEmpresas'));
const IntegracaoDeSistemas = lazy(() => import('./pages/LandingPages/IntegracaoDeSistemas'));
const SoftwareCorporativo = lazy(() => import('./pages/LandingPages/SoftwareCorporativo'));
const DesenvolvimentoDjango = lazy(() => import('./pages/LandingPages/DesenvolvimentoDjango'));
const DesenvolvimentoFastAPI = lazy(() => import('./pages/LandingPages/DesenvolvimentoFastAPI'));
const AutomacaoComPython = lazy(() => import('./pages/LandingPages/AutomacaoComPython'));
const ChatbotEmpresarial = lazy(() => import('./pages/LandingPages/ChatbotEmpresarial'));
const IntegracaoSistemasLegados = lazy(() => import('./pages/LandingPages/IntegracaoSistemasLegados'));
const InteligenciaArtificialLogistica = lazy(() => import('./pages/LandingPages/InteligenciaArtificialLogistica'));
const CrmSobMedida = lazy(() => import('./pages/LandingPages/CrmSobMedida'));
const DashboardCorporativo = lazy(() => import('./pages/LandingPages/DashboardCorporativo'));

// Lazy load lead capture pages
const DiagnosticoGratuito = lazy(() => import('./pages/DiagnosticoGratuito/DiagnosticoGratuito'));
const CalculadoraROI = lazy(() => import('./pages/CalculadoraROI/CalculadoraROI'));
const GuiaAutomacao = lazy(() => import('./pages/LeadMagnet/GuiaAutomacao'));
const ComoFuncionaExecucao = lazy(() => import('./pages/ComoFuncionaExecucao/ComoFuncionaExecucao'));

// Lazy load public proposal page
const PublicProposalPage = lazy(() => import('./pages/PublicProposal/PublicProposalPage'));

// Lazy load auth pages
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Lazy load dashboard
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const ClientsList = lazy(() => import('./pages/dashboard/Clients/ClientsList'));
const LeadsList = lazy(() => import('./pages/dashboard/Leads/LeadsList'));
const LeadForm = lazy(() => import('./pages/dashboard/Leads/LeadForm'));
const ProposalsList = lazy(() => import('./pages/dashboard/Proposals/ProposalsList'));
const ProposalForm = lazy(() => import('./pages/dashboard/Proposals/ProposalForm'));
const ProspectsList = lazy(() => import('./pages/dashboard/Prospects/ProspectsList'));
const ProspectForm = lazy(() => import('./pages/dashboard/Prospects/ProspectForm'));
const MetricsDashboard = lazy(() => import('./pages/dashboard/Metrics/MetricsDashboard'));
const Settings = lazy(() => import('./pages/dashboard/Settings/Settings'));

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
                <Route path="/diagnostico-gratuito" element={<PublicLayout><DiagnosticoGratuito /></PublicLayout>} />
                <Route path="/calculadora-roi" element={<PublicLayout><CalculadoraROI /></PublicLayout>} />
                <Route path="/guia-automacao-2026" element={<PublicLayout><GuiaAutomacao /></PublicLayout>} />
                <Route path="/como-funciona-a-execucao" element={<PublicLayout><ComoFuncionaExecucao /></PublicLayout>} />
                <Route path="/proposta/:token" element={<PublicProposalPage />} />

                {/* Case Study Routes */}
                <Route path="/cases/oraculo-ia" element={<PublicLayout><OraculoCase /></PublicLayout>} />
                <Route path="/cases/logiflow" element={<PublicLayout><LogiFlowCase /></PublicLayout>} />
                <Route path="/cases/proflow" element={<PublicLayout><ProFlowCase /></PublicLayout>} />

                {/* Keyword Landing Pages */}
                <Route path="/software-sob-medida" element={<PublicLayout><SoftwareSobMedida /></PublicLayout>} />
                <Route path="/desenvolvimento-python" element={<PublicLayout><DesenvolvimentoPython /></PublicLayout>} />
                <Route path="/automacao-empresarial" element={<PublicLayout><AutomacaoEmpresarial /></PublicLayout>} />
                <Route path="/inteligencia-artificial-empresas" element={<PublicLayout><InteligenciaArtificialEmpresas /></PublicLayout>} />
                <Route path="/integracao-de-sistemas" element={<PublicLayout><IntegracaoDeSistemas /></PublicLayout>} />
                <Route path="/software-corporativo" element={<PublicLayout><SoftwareCorporativo /></PublicLayout>} />
                <Route path="/desenvolvimento-django" element={<PublicLayout><DesenvolvimentoDjango /></PublicLayout>} />
                <Route path="/desenvolvimento-fastapi" element={<PublicLayout><DesenvolvimentoFastAPI /></PublicLayout>} />
                <Route path="/automacao-com-python" element={<PublicLayout><AutomacaoComPython /></PublicLayout>} />
                <Route path="/chatbot-empresarial" element={<PublicLayout><ChatbotEmpresarial /></PublicLayout>} />
                <Route path="/integracao-sistemas-legados" element={<PublicLayout><IntegracaoSistemasLegados /></PublicLayout>} />
                <Route path="/inteligencia-artificial-logistica" element={<PublicLayout><InteligenciaArtificialLogistica /></PublicLayout>} />
                <Route path="/crm-sob-medida" element={<PublicLayout><CrmSobMedida /></PublicLayout>} />
                <Route path="/dashboard-corporativo" element={<PublicLayout><DashboardCorporativo /></PublicLayout>} />

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
                  <Route path="leads" element={<LeadsList />} />
                  <Route path="leads/new" element={<LeadForm />} />
                  <Route path="leads/edit/:id" element={<LeadForm />} />
                  <Route path="proposals" element={<ProposalsList />} />
                  <Route path="proposals/new" element={<ProposalForm />} />
                  <Route path="proposals/edit/:id" element={<ProposalForm />} />
                  <Route path="prospects" element={<ProspectsList />} />
                  <Route path="prospects/new" element={<ProspectForm />} />
                  <Route path="prospects/edit/:id" element={<ProspectForm />} />
                  <Route path="metrics" element={<MetricsDashboard />} />
                  <Route path="settings" element={<Settings />} />
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
