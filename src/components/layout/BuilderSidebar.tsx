
import React, { useState } from 'react';
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
  ChevronDown,
  Megaphone,
  Mail,
  Target,
  Hammer,
  Truck,
  Package2,
  Brain
} from 'lucide-react';

const BuilderSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['marketing', 'materials']);
  
  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;
  
  const menuSections = [
    {
      name: 'Core Features',
      items: [
        { name: 'Dashboard', path: '/builder', icon: LayoutDashboard },
        { name: 'Manage Projects', path: '/builder/projects', icon: Package },
        { name: 'Customer Manager', path: '/builder/customers', icon: Users },
        { name: 'Calendar', path: '/builder/calendar', icon: Calendar },
        { name: 'Calculator', path: '/builder/calculator', icon: CalcIcon },
      ]
    },
    {
      name: 'Marketing',
      key: 'marketing',
      expandable: true,
      items: [
        { name: 'Marketing Hub', path: '/builder/marketing', icon: Megaphone },
        { name: 'Email Campaigns', path: '/builder/marketing/email', icon: Mail },
        { name: 'Lead Generation', path: '/builder/marketing/leads', icon: Target },
      ]
    },
    {
      name: 'Construction & Materials',
      key: 'materials',
      expandable: true,
      items: [
        { name: 'Construction Materials', path: '/builder/materials', icon: Hammer },
        { name: 'Material Suppliers', path: '/builder/materials/suppliers', icon: Truck },
        { name: 'Inventory Management', path: '/builder/materials/inventory', icon: Package2 },
      ]
    },
    {
      name: 'Business Intelligence',
      items: [
        { name: 'AI Features', path: '/builder/ai-features', icon: Brain },
        { name: 'Stats & Analysis', path: '/builder/stats', icon: BarChart3 },
        { name: 'Reports & Legal Docs', path: '/builder/reports', icon: FileText },
      ]
    },
    {
      name: 'Operations',
      items: [
        { name: 'Financials', path: '/builder/financials', icon: DollarSign },
        { name: 'Collection Tracker', path: '/builder/collections', icon: MessageCircle },
        { name: 'Deals History', path: '/builder/deals', icon: FileSymlink },
      ]
    },
    {
      name: 'System',
      items: [
        { name: 'Admin', path: '/builder/admin', icon: UserCog },
      ]
    }
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
        <div className="px-3 space-y-6">
          {menuSections.map((section) => (
            <div key={section.name}>
              {section.expandable ? (
                <div>
                  <button
                    onClick={() => toggleSection(section.key!)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <span>{section.name}</span>
                    {expandedSections.includes(section.key!) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.includes(section.key!) && (
                    <ul className="space-y-1 mt-2 ml-3">
                      {section.items.map((item) => {
                        const IconComponent = item.icon;
                        const active = isActive(item.path);
                        
                        return (
                          <li key={item.path}>
                            <Link
                              to={item.path}
                              className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                active 
                                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500" 
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                              )}
                            >
                              <IconComponent className="h-4 w-4 flex-shrink-0" />
                              <span className="flex-1">{item.name}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {section.name}
                  </div>
                  <ul className="space-y-1">
                    {section.items.map((item) => {
                      const IconComponent = item.icon;
                      const active = isActive(item.path);
                      
                      return (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                              active 
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500" 
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                            )}
                          >
                            <IconComponent className="h-5 w-5 flex-shrink-0" />
                            <span className="flex-1">{item.name}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
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
