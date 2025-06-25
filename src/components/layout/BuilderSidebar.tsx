
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
  ChevronRight,
  Megaphone,
  Mail,
  Target,
  Hammer,
  Truck,
  Package2
} from 'lucide-react';

const BuilderSidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      path: '/builder',
      icon: LayoutDashboard,
    },
    {
      name: 'Manage Projects',
      path: '/builder/projects',
      icon: Package,
    },
    {
      name: 'Customer Manager',
      path: '/builder/customers',
      icon: Users,
    },
    {
      name: 'Marketing Hub',
      path: '/builder/marketing',
      icon: Megaphone,
    },
    {
      name: 'Email Campaigns',
      path: '/builder/marketing/email',
      icon: Mail,
    },
    {
      name: 'Lead Generation',
      path: '/builder/marketing/leads',
      icon: Target,
    },
    {
      name: 'Construction Materials',
      path: '/builder/materials',
      icon: Hammer,
    },
    {
      name: 'Material Suppliers',
      path: '/builder/materials/suppliers',
      icon: Truck,
    },
    {
      name: 'Inventory Management',
      path: '/builder/materials/inventory',
      icon: Package2,
    },
    {
      name: 'Financials',
      path: '/builder/financials',
      icon: DollarSign,
    },
    {
      name: 'Calendar',
      path: '/builder/calendar',
      icon: Calendar,
    },
    {
      name: 'Deals History',
      path: '/builder/deals',
      icon: FileSymlink,
    },
    {
      name: 'Reports & Legal Docs',
      path: '/builder/reports',
      icon: FileText,
    },
    {
      name: 'Calculator',
      path: '/builder/calculator',
      icon: CalcIcon,
    },
    {
      name: 'Collection Tracker',
      path: '/builder/collections',
      icon: MessageCircle,
    },
    {
      name: 'Stats & Analysis',
      path: '/builder/stats',
      icon: BarChart3,
    },
    {
      name: 'Admin',
      path: '/builder/admin',
      icon: UserCog,
    },
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Builder Dashboard
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
          Property Management Suite
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path || 
              (item.path !== '/builder' && location.pathname.startsWith(item.path));
            
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
                    isActive ? "text-blue-500" : "text-gray-400 opacity-0 group-hover:opacity-100"
                  )} />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
          <p className="font-semibold text-gray-800 dark:text-gray-200">Need help?</p>
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

export default BuilderSidebar;
