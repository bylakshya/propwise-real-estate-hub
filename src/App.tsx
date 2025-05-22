
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Auth Pages
import AuthPage from "./pages/AuthPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";

// Broker Pages
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import PropertyManager from "./pages/broker/PropertyManager";

// Builder Pages
import BuilderDashboard from "./pages/builder/BuilderDashboard";
import ProjectManager from "./pages/builder/ProjectManager";

// 404 Page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

// Role Selection Check
const RoleCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (isAuthenticated && !user?.role) {
    return <Navigate to="/role-selection" replace />;
  }
  
  return <>{children}</>;
};

// Broker Route
const BrokerRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (user?.role !== 'broker') {
    return <Navigate to="/builder" replace />;
  }
  
  return <>{children}</>;
};

// Builder Route
const BuilderRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  
  if (user?.role !== 'builder') {
    return <Navigate to="/broker" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/role-selection" 
              element={
                <ProtectedRoute>
                  <RoleSelectionPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Broker routes */}
            <Route 
              path="/broker" 
              element={
                <ProtectedRoute>
                  <RoleCheck>
                    <BrokerRoute>
                      <BrokerDashboard />
                    </BrokerRoute>
                  </RoleCheck>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/broker/properties" 
              element={
                <ProtectedRoute>
                  <RoleCheck>
                    <BrokerRoute>
                      <PropertyManager />
                    </BrokerRoute>
                  </RoleCheck>
                </ProtectedRoute>
              } 
            />
            
            {/* Builder routes */}
            <Route 
              path="/builder" 
              element={
                <ProtectedRoute>
                  <RoleCheck>
                    <BuilderRoute>
                      <BuilderDashboard />
                    </BuilderRoute>
                  </RoleCheck>
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/builder/projects" 
              element={
                <ProtectedRoute>
                  <RoleCheck>
                    <BuilderRoute>
                      <ProjectManager />
                    </BuilderRoute>
                  </RoleCheck>
                </ProtectedRoute>
              } 
            />
            
            {/* Redirect from home to proper route */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <RoleCheck>
                    {(() => {
                      const { user } = useAuth();
                      if (user?.role === 'broker') {
                        return <Navigate to="/broker" replace />;
                      } else if (user?.role === 'builder') {
                        return <Navigate to="/builder" replace />;
                      }
                      return <Navigate to="/role-selection" replace />;
                    })()}
                  </RoleCheck>
                </ProtectedRoute>
              } 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
