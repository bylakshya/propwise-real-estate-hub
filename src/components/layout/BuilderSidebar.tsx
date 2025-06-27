
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
  Brain,
  Shield,
  Settings,
  HelpCircle,
  Zap,
  Globe,
  Database,
  CreditCard,
  Bell,
  Lock,
  Workflow
} from 'lucide-react';

const BuilderSidebar: React.FC = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['core']);
  
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
      name: 'Core Dashboard',
      key: 'core',
      expandable: true,
      icon: LayoutDashboard,
      items: [
        { name: 'Dashboard', path: '/builder', icon: LayoutDashboard },
        { name: 'Projects', path: '/builder/projects', icon: Package },
        { name: 'Customers', path: '/builder/customers', icon: Users },
        { name: 'Calendar', path: '/builder/calendar', icon: Calendar },
      ]
    },
    {
      name: 'Sales & Marketing',
      key: 'marketing',
      expandable: true,
      icon: Megaphone,
      items: [
        { name: 'Marketing Hub', path: '/builder/marketing', icon: Megaphone },
        { name: 'Lead Generation', path: '/builder/marketing/leads', icon: Target },
        { name: 'Email Campaigns', path: '/builder/marketing/email', icon: Mail },
        { name: 'CRM Integration', path: '/builder/crm', icon: Users, new: true },
        { name: 'Social Media', path: '/builder/social', icon: Globe, new: true },
      ]
    },
    {
      name: 'Construction & Supply',
      key: 'construction',
      expandable: true,
      icon: Hammer,
      items: [
        { name: 'Materials', path: '/builder/materials', icon: Hammer },
        { name: 'Suppliers', path: '/builder/materials/suppliers', icon: Truck },
        { name: 'Inventory', path: '/builder/materials/inventory', icon: Package2 },
        { name: 'Quality Control', path: '/builder/quality', icon: Shield, new: true },
        { name: 'Work Orders', path: '/builder/work-orders', icon: ClipboardList, new: true },
      ]
    },
    {
      name: 'Financial Management',
      key: 'finance',
      expandable: true,
      icon: DollarSign,
      items: [
        { name: 'Financials', path: '/builder/financials', icon: DollarSign },
        { name: 'Deal History', path: '/builder/deals', icon: FileSymlink },
        { name: 'Collections', path: '/builder/collections', icon: MessageCircle },
        { name: 'Tax Management', path: '/builder/tax', icon: FileText, new: true },
        { name: 'Loan Tracking', path: '/builder/loans', icon: CreditCard, new: true },
      ]
    },
    {
      name: 'Analytics & AI',
      key: 'analytics',
      expandable: true,
      icon: Brain,
      items: [
        { name: 'AI Features', path: '/builder/ai-features', icon: Brain },
        { name: 'Statistics', path: '/builder/stats', icon: BarChart3 },
        { name: 'Reports', path: '/builder/reports', icon: FileText },
        { name: 'Predictive Analytics', path: '/builder/predictions', icon: Zap, new: true },
        { name: 'Market Intelligence', path: '/builder/market-intel', icon: Database, new: true },
      ]
    },
    {
      name: 'Tools & Utilities',
      key: 'tools',
      expandable: true,
      icon: Settings,
      items: [
        { name: 'Calculator', path: '/builder/calculator', icon: CalcIcon },
        { name: 'Document Generator', path: '/builder/documents', icon: FileText, new: true },
        { name: 'Legal Compliance', path: '/builder/legal', icon: Lock, new: true },
        { name: 'Workflow Automation', path: '/builder/workflows', icon: Workflow, new: true },
        { name: 'Notifications', path: '/builder/notifications', icon: Bell, new: true },
      ]
    },
    {
      name: 'System & Support',
      key: 'system',
      expandable: false,
      icon: UserCog,
      items: [
        { name: 'Admin Panel', path: '/builder/admin', icon: UserCog },
        { name: 'Help Center', path: '/builder/help', icon: HelpCircle, new: true },
      ]
    }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-900 h-screen flex flex-col shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Builder Suite
        </h2>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
          Complete Property Management
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="px-3 space-y-4">
          {menuSections.map((section) => (
            <div key={section.name}>
              {section.expandable ? (
                <div>
                  <button
                    onClick={() => toggleSection(section.key!)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4" />
                      <span>{section.name}</span>
                    </div>
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
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                                active 
                                  ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500" 
                                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                              )}
                            >
                              <IconComponent className="h-4 w-4 flex-shrink-0" />
                              <span className="flex-1">{item.name}</span>
                              {item.new && (
                                <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                                  New
                                </span>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                <div>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <section.icon className="h-3 w-3" />
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
                              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative",
                              active 
                                ? "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-l-4 border-blue-500" 
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                            )}
                          >
                            <IconComponent className="h-5 w-5 flex-shrink-0" />
                            <span className="flex-1">{item.name}</span>
                            {item.new && (
                              <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                                New
                              </span>
                            )}
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
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800 dark:text-gray-200">Quick Support</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
            <HelpCircle className="h-4 w-4" />
            Get Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderSidebar;
