import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Home,
  Users,
  TrendingUp,
  Calendar,
  FileSymlink,
  FileText,
  Calculator as CalcIcon,
  ChevronRight,
  Megaphone,
  Mail,
  Target,
  Brain
} from 'lucide-react';

const BrokerSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/broker',
      icon: LayoutDashboard,
    },
    {
      name: 'Property Manager',
      path: '/broker/properties',
      icon: Home,
    },
    {
      name: 'Customer Manager',
      path: '/broker/customers',
      icon: Users,
    },
    {
      name: 'Marketing Hub',
      path: '/broker/marketing',
      icon: Megaphone,
    },
    {
      name: 'Email Campaigns',
      path: '/broker/marketing/email',
      icon: Mail,
    },
    {
      name: 'Lead Generation',
      path: '/broker/marketing/leads',
      icon: Target,
    },
    {
      name: 'AI Features',
      path: '/broker/ai-features',
      icon: Brain,
    },
    {
      name: 'Brokerage Analysis',
      path: '/broker/brokerage',
      icon: TrendingUp,
    },
    {
      name: 'Calendar',
      path: '/broker/calendar',
      icon: Calendar,
    },
    {
      name: 'Deals History',
      path: '/broker/deals',
      icon: FileSymlink,
    },
    {
      name: 'Reports & Stats',
      path: '/broker/reports',
      icon: FileText,
    },
    {
      name: 'Calculator',
      path: '/broker/calculator',
      icon: CalcIcon,
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Broker Dashboard
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
          Premium Real Estate Suite
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/broker' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                  )}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  <ChevronRight className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isActive ? "text-blue-500" : "text-gray-400"
                  )} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Need assistance?</p>
          <button className="w-full inline-flex items-center justify-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrokerSidebar;
