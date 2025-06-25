
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Calculator as CalcIcon, 
  DollarSign, 
  Calendar, 
  ClipboardList, 
  BarChart3, 
  FileText, 
  UserCog,
  MessageCircle,
  FileSymlink,
  ChevronRight
} from 'lucide-react';

const BuilderSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/builder',
      icon: <LayoutDashboard className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Manage Projects',
      path: '/builder/projects',
      icon: <Package className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Customer Manager',
      path: '/builder/customers',
      icon: <Users className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Financials',
      path: '/builder/financials',
      icon: <DollarSign className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Calendar',
      path: '/builder/calendar',
      icon: <Calendar className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Deals History',
      path: '/builder/deals',
      icon: <FileSymlink className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Reports & Legal Docs',
      path: '/builder/reports',
      icon: <FileText className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Calculator',
      path: '/builder/calculator',
      icon: <CalcIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Collection Tracker',
      path: '/builder/collections',
      icon: <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Stats & Analysis',
      path: '/builder/stats',
      icon: <BarChart3 className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
    {
      name: 'Admin',
      path: '/builder/admin',
      icon: <UserCog className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />,
    },
  ];

  return (
    <div className="w-64 sidebar-premium h-screen flex flex-col shadow-premium">
      <div className="p-6 border-b border-white/20">
        <div className="floating-element">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Builder Dashboard
          </h2>
          <div className="text-xs text-gray-500 mt-1 font-medium">Property Management Suite</div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6">
        <ul className="space-y-2 px-4 stagger-animation">
          {menuItems.map((item, index) => (
            <li key={item.path} style={{animationDelay: `${index * 0.1}s`}}>
              <Link
                to={item.path}
                className={cn(
                  "nav-link group",
                  location.pathname === item.path || 
                  (item.path !== '/builder' && location.pathname.startsWith(item.path)) 
                    ? "active" 
                    : ""
                )}
              >
                <div className="transition-colors duration-300">
                  {item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-white/20 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
        <div className="text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-gray-800">Need help?</p>
          <button className="premium-button w-full inline-flex items-center justify-center gap-2 text-sm">
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

export default BuilderSidebar;
