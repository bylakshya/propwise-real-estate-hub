
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
  Calculator as CalcIcon
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
    <div className="w-64 sidebar-premium h-screen flex flex-col shadow-premium">
      <div className="p-6 border-b border-white/20">
        <div className="floating-element">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Broker Dashboard
          </h2>
          <div className="text-xs text-gray-500 mt-1 font-medium">Premium Real Estate Suite</div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-4 stagger-animation">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/broker' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.path} style={{animationDelay: `${index * 0.1}s`}}>
                <Link
                  to={item.path}
                  className={cn(
                    "nav-link",
                    isActive ? "active" : ""
                  )}
                >
                  <IconComponent className="nav-icon h-5 w-5" />
                  <span className="nav-text">{item.name}</span>
                  <svg className="nav-chevron h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-white/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="text-sm text-gray-600 space-y-2">
          <p className="font-semibold text-gray-800">Need assistance?</p>
          <a href="#" className="premium-button inline-flex items-center gap-2 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default BrokerSidebar;
