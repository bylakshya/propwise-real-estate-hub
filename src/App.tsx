import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import NotFound from "./pages/NotFound";

// Builder Pages
import BuilderDashboard from "./pages/builder/BuilderDashboard";
import ProjectManager from "./pages/builder/ProjectManager";
import ProjectDetail from "./pages/builder/ProjectDetail";
import CustomerManager from "./pages/builder/CustomerManager";
import CalendarPage from "./pages/builder/CalendarPage";
import Financials from "./pages/builder/Financials";
import DealHistory from "./pages/builder/DealHistory";
import CollectionTracker from "./pages/builder/CollectionTracker";
import ReportsLegalDocs from "./pages/builder/ReportsLegalDocs";
import StatsAnalysis from "./pages/builder/StatsAnalysis";
import AIFeatures from "./pages/builder/AIFeatures";
import Calculator from "./pages/builder/Calculator";
import ConstructionMaterials from "./pages/builder/ConstructionMaterials";
import MaterialSuppliers from "./pages/builder/MaterialSuppliers";
import InventoryManagement from "./pages/builder/InventoryManagement";
import MarketingHub from "./pages/builder/MarketingHub";
import EmailCampaigns from "./pages/builder/EmailCampaigns";
import LeadGeneration from "./pages/builder/LeadGeneration";
import SubscriptionPage from "./pages/builder/SubscriptionPage";
import WhatsAppSetup from "./pages/builder/WhatsAppSetup";
import AdminPanel from "./pages/builder/AdminPanel";

// Broker Pages
import BrokerDashboard from "./pages/broker/BrokerDashboard";
import PropertyManager from "./pages/broker/PropertyManager";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <DarkModeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Common Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/role-selection" element={<RoleSelectionPage />} />
                
                {/* Builder Routes */}
                <Route path="/builder" element={<BuilderDashboard />} />
                <Route path="/builder/projects" element={<ProjectManager />} />
                <Route path="/builder/projects/:id" element={<ProjectDetail />} />
                <Route path="/builder/customers" element={<CustomerManager />} />
                <Route path="/builder/calendar" element={<CalendarPage />} />
                <Route path="/builder/financials" element={<Financials />} />
                <Route path="/builder/deals" element={<DealHistory />} />
                <Route path="/builder/collections" element={<CollectionTracker />} />
                <Route path="/builder/reports" element={<ReportsLegalDocs />} />
                <Route path="/builder/stats" element={<StatsAnalysis />} />
                <Route path="/builder/ai-features" element={<AIFeatures />} />
                <Route path="/builder/calculator" element={<Calculator />} />
                <Route path="/builder/materials" element={<ConstructionMaterials />} />
                <Route path="/builder/materials/suppliers" element={<MaterialSuppliers />} />
                <Route path="/builder/materials/inventory" element={<InventoryManagement />} />
                <Route path="/builder/marketing" element={<MarketingHub />} />
                <Route path="/builder/marketing/email" element={<EmailCampaigns />} />
                <Route path="/builder/marketing/leads" element={<LeadGeneration />} />
                <Route path="/builder/subscription" element={<SubscriptionPage />} />
                <Route path="/builder/whatsapp-setup" element={<WhatsAppSetup />} />
                <Route path="/builder/admin" element={<AdminPanel />} />
                
                {/* Placeholder routes for new sidebar items */}
                <Route path="/builder/crm" element={<div className="p-8"><h1 className="text-2xl font-bold">CRM Integration - Coming Soon</h1></div>} />
                <Route path="/builder/social" element={<div className="p-8"><h1 className="text-2xl font-bold">Social Media Management - Coming Soon</h1></div>} />
                <Route path="/builder/quality" element={<div className="p-8"><h1 className="text-2xl font-bold">Quality Control - Coming Soon</h1></div>} />
                <Route path="/builder/work-orders" element={<div className="p-8"><h1 className="text-2xl font-bold">Work Orders - Coming Soon</h1></div>} />
                <Route path="/builder/tax" element={<div className="p-8"><h1 className="text-2xl font-bold">Tax Management - Coming Soon</h1></div>} />
                <Route path="/builder/loans" element={<div className="p-8"><h1 className="text-2xl font-bold">Loan Tracking - Coming Soon</h1></div>} />
                <Route path="/builder/predictions" element={<div className="p-8"><h1 className="text-2xl font-bold">Predictive Analytics - Coming Soon</h1></div>} />
                <Route path="/builder/market-intel" element={<div className="p-8"><h1 className="text-2xl font-bold">Market Intelligence - Coming Soon</h1></div>} />
                <Route path="/builder/documents" element={<div className="p-8"><h1 className="text-2xl font-bold">Document Generator - Coming Soon</h1></div>} />
                <Route path="/builder/legal" element={<div className="p-8"><h1 className="text-2xl font-bold">Legal Compliance - Coming Soon</h1></div>} />
                <Route path="/builder/workflows" element={<div className="p-8"><h1 className="text-2xl font-bold">Workflow Automation - Coming Soon</h1></div>} />
                <Route path="/builder/notifications" element={<div className="p-8"><h1 className="text-2xl font-bold">Notifications Center - Coming Soon</h1></div>} />
                <Route path="/builder/help" element={<div className="p-8"><h1 className="text-2xl font-bold">Help Center - Coming Soon</h1></div>} />
                
                {/* Broker Routes */}
                <Route path="/broker" element={<BrokerDashboard />} />
                <Route path="/broker/properties" element={<PropertyManager />} />
                <Route path="/broker/customers" element={<CustomerManager />} />
                <Route path="/broker/marketing" element={<MarketingHub />} />
                <Route path="/broker/marketing/email" element={<EmailCampaigns />} />
                <Route path="/broker/marketing/leads" element={<LeadGeneration />} />
                <Route path="/broker/ai-features" element={<AIFeatures />} />
                <Route path="/broker/brokerage" element={<div className="p-8"><h1 className="text-2xl font-bold">Brokerage Analysis - Coming Soon</h1></div>} />
                <Route path="/broker/calendar" element={<CalendarPage />} />
                <Route path="/broker/deals" element={<DealHistory />} />
                <Route path="/broker/reports" element={<ReportsLegalDocs />} />
                <Route path="/broker/calculator" element={<Calculator />} />
                
                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </DarkModeProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
