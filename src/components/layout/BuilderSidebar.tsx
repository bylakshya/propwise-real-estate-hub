
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
  Whatsapp,
  FileSymlink,
} from 'lucide-react';

const BuilderSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/builder',
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: 'Manage Projects',
      path: '/builder/projects',
      icon: <Package className="h-5 w-5" />,
    },
    {
      name: 'Customer Manager',
      path: '/builder/customers',
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: 'Financials',
      path: '/builder/financials',
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      name: 'Calendar',
      path: '/builder/calendar',
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      name: 'Deals History',
      path: '/builder/deals',
      icon: <FileSymlink className="h-5 w-5" />,
    },
    {
      name: 'Reports & Legal Docs',
      path: '/builder/reports',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: 'Calculator',
      path: '/builder/calculator',
      icon: <CalcIcon className="h-5 w-5" />,
    },
    {
      name: 'Collection Tracker',
      path: '/builder/collections',
      icon: <Whatsapp className="h-5 w-5" />,
    },
    {
      name: 'Stats & Analysis',
      path: '/builder/stats',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: 'Admin',
      path: '/builder/admin',
      icon: <UserCog className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col shadow-sm">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-realestate-primary bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
          Builder Dashboard
        </h2>
        <div className="text-xs text-gray-500 mt-1">Property Management Suite</div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                  location.pathname === item.path || 
                  (item.path !== '/builder' && location.pathname.startsWith(item.path)) 
                    ? "bg-blue-50 text-blue-700 font-medium shadow-sm" 
                    : ""
                )}
              >
                <div className={cn(
                  "mr-3",
                  location.pathname === item.path || 
                  (item.path !== '/builder' && location.pathname.startsWith(item.path))
                    ? "text-blue-600" 
                    : "text-gray-500"
                )}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Need help?</p>
          <a href="#" className="text-blue-600 hover:underline text-sm flex items-center gap-1 mt-1">
            <span>Contact Support</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuilderSidebar;
