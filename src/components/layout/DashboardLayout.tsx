
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
    <div className="flex flex-col h-screen">
      <StatusBar />
      
      <div className="flex flex-1 overflow-hidden">
        {user?.role === 'broker' ? <BrokerSidebar /> : <BuilderSidebar />}
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
