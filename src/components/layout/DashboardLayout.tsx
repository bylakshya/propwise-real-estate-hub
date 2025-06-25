
import React from 'react';
import StatusBar from './StatusBar';
import BrokerSidebar from './BrokerSidebar';
import BuilderSidebar from './BuilderSidebar';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <StatusBar />
      
      <div className="flex flex-1 overflow-hidden">
        <div className="animate-slide-in-left">
          {user?.role === 'broker' ? <BrokerSidebar /> : <BuilderSidebar />}
        </div>
        
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50/50 to-blue-50/30 p-6 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
