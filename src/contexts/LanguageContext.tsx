
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Common
    'search': 'Search',
    'filter': 'Filter',
    'export': 'Export',
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'add': 'Add',
    'close': 'Close',
    'loading': 'Loading...',
    'name': 'Name',
    'email': 'Email',
    'phone': 'Phone',
    'address': 'Address',
    'status': 'Status',
    'actions': 'Actions',
    'active': 'Active',
    'inactive': 'Inactive',
    'date': 'Date',
    'time': 'Time',
    'description': 'Description',
    'title': 'Title',
    'create': 'Create',
    'update': 'Update',
    'view': 'View',
    'details': 'Details',
    
    // Navigation & Layout
    'dashboard': 'Dashboard',
    'projects': 'Projects',
    'customers': 'Customers',
    'calendar': 'Calendar',
    'marketing': 'Marketing',
    'reports': 'Reports',
    'settings': 'Settings',
    'profile': 'Profile',
    'logout': 'Logout',
    'help': 'Help',
    
    // Dashboard
    'welcomeBack': 'Welcome Back',
    'todaysOverview': "Today's Overview",
    'totalProjects': 'Total Projects',
    'totalCustomers': 'Total Customers',
    'monthlyRevenue': 'Monthly Revenue',
    'pendingTasks': 'Pending Tasks',
    'recentActivity': 'Recent Activity',
    'quickActions': 'Quick Actions',
    
    // Projects
    'projectManager': 'Project Manager',
    'createProject': 'Create Project',
    'allProjects': 'All Projects',
    'activeProjects': 'Active Projects',
    'completedProjects': 'Completed Projects',
    'projectName': 'Project Name',
    'location': 'Location',
    'totalArea': 'Total Area',
    'totalPlots': 'Total Plots',
    'availablePlots': 'Available Plots',
    'soldPlots': 'Sold Plots',
    'reservedPlots': 'Reserved Plots',
    'plotDetails': 'Plot Details',
    'plotNumber': 'Plot Number',
    'plotSize': 'Plot Size',
    'plotPrice': 'Plot Price',
    'plotStatus': 'Plot Status',
    
    // Project Management
    'manageRealEstateProjects': 'Manage your real estate projects and development status',
    'createNewProject': 'Create New Project',
    'basicInformation': 'Basic Information',
    'enterProjectName': 'Enter project name',
    'enterDescription': 'Enter project description',
    'selectProjectType': 'Select project type',
    'selectProjectStatus': 'Select project status',
    'locationMedia': 'Location & Media',
    'enterLocation': 'Enter location',
    'latitude': 'Latitude',
    'longitude': 'Longitude',
    'coverPhoto': 'Cover Photo',
    'imageUrl': 'Image URL',
    'pricingOptions': 'Pricing & Options',
    'sizeOptions': 'Size Options',
    'sqft': 'Sq.ft',
    'commaSeparated': 'Comma separated values',
    'minPrice': 'Min Price',
    'maxPrice': 'Max Price',
    'creating': 'Creating...',
    'projectCreated': 'Project created successfully',
    'errorCreatingProject': 'Error creating project',
    'pleaseAllRequired': 'Please fill all required fields',
    'mustLogin': 'You must be logged in to create projects',
    'colony': 'Colony (Plotted Layout)',
    'apartment': 'Apartment/Tower',
    'villa': 'Villa',
    'farmhouse': 'Farmhouse',
    'commercial': 'Commercial',
    'preLaunch': 'Pre-Launch',
    'bookingOpen': 'Booking Open',
    'underConstruction': 'Under Construction',
    'possession': 'Possession',
    'priceRange': 'Price Range',
    'priceOnRequest': 'Price on Request',
    'upTo': 'Up to',
    'sizes': 'Sizes',
    'updated': 'Updated',
    'searchByNameLocation': 'Search by name or location',
    'noProjectsFound': 'No Projects Found',
    'tryAdjustingSearch': 'Try adjusting your search criteria',
    'errorFetchingProjects': 'Error fetching projects',
    'featureComingSoon': 'Feature coming soon',
    'linkCopied': 'Link copied to clipboard',
    
    // Customers
    'customerManager': 'Customer Manager',
    'addCustomer': 'Add Customer',
    'customerName': 'Customer Name',
    'customerEmail': 'Customer Email',
    'customerPhone': 'Customer Phone',
    'customerAddress': 'Customer Address',
    'leadSource': 'Lead Source',
    'customerType': 'Customer Type',
    'buyer': 'Buyer',
    'investor': 'Investor',
    'tenant': 'Tenant',
    
    // Deal History Page
    'dealHistory': 'Deal History',
    'trackManageTransactions': 'Track and manage your property transactions',
    'exportReport': 'Export Report',
    'generateStatement': 'Generate Statement',
    'totalCommission': 'Total Commission',
    'fromCompletedDeals': 'From completed deals',
    'totalSalesValue': 'Total Sales Value',
    'averageDealValue': 'Average Deal Value',
    'acrossAllTransactions': 'Across all transactions',
    'searchByCustomer': 'Search by customer, plot, or project',
    'filterByStatus': 'Filter by status',
    'filterByProject': 'Filter by project',
    'allStatuses': 'All Statuses',
    'listView': 'List View',
    'monthlyView': 'Monthly View',
    'propertyTransactions': 'Property Transactions',
    'showingTransactions': 'Showing {count} transactions',
    'plot': 'Plot',
    'project': 'Project',
    'customer': 'Customer',
    'contact': 'Contact',
    'saleDate': 'Sale Date',
    'price': 'Price',
    'commission': 'Commission',
    'completed': 'Completed',
    'pending': 'Pending',
    'cancelled': 'Cancelled',
    'noTransactionsFound': 'No transactions found matching your filters',
    'resetFilters': 'Reset filters',
    
    // WhatsApp Setup
    'whatsappSetup': 'WhatsApp Setup',
    'connectWhatsApp': 'Connect WhatsApp',
    'businessDetails': 'Business Details',
    'phoneNumber': 'Phone Number',
    'businessName': 'Business Name',
    'welcomeMessage': 'Welcome Message',
    'messageTemplates': 'Message Templates',
    'sendTestMessage': 'Send Test Message',
    'connectionStatus': 'Connection Status',
    'connected': 'Connected',
    'disconnected': 'Disconnected',
    
    // Subscription
    'subscription': 'Subscription',
    'currentPlan': 'Current Plan',
    'choosePlan': 'Choose Your Plan',
    'manageSubscription': 'Manage Subscription',
    'subscribeNow': 'Subscribe Now',
    'mostPopular': 'Most Popular',
    'basicPlan': 'Basic',
    'premiumPlan': 'Premium',
    'enterprisePlan': 'Enterprise',
    
    // Marketing
    'marketingHub': 'Marketing Hub',
    'campaigns': 'Campaigns',
    'createCampaign': 'Create Campaign',
    'emailCampaign': 'Email Campaign',
    'leadGeneration': 'Lead Generation',
    'totalLeads': 'Total Leads',
    'conversionRate': 'Conversion Rate',
    'activeCampaigns': 'Active Campaigns',
    
    // Materials & Suppliers
    'materials': 'Materials',
    'suppliers': 'Suppliers',
    'inventory': 'Inventory',
    'scheduleOrder': 'Schedule Order',
    'orderQuantity': 'Order Quantity',
    'deliveryDate': 'Delivery Date',
    'supplierName': 'Supplier Name',
    'contactInfo': 'Contact Info',
    'rating': 'Rating',
    
    // Admin Panel
    'adminPanel': 'Admin Panel',
    'userManagement': 'User Management',
    'systemSettings': 'System Settings',
    'dataBackup': 'Data & Backup',
    'security': 'Security',
    'addUser': 'Add User',
    'totalUsers': 'Total Users',
    'activeUsers': 'Active Users',
    'adminUsers': 'Admin Users',
    'systemHealth': 'System Health',
    
    // Financial
    'financials': 'Financials',
    'revenue': 'Revenue',
    'expenses': 'Expenses',
    'profit': 'Profit',
    'collections': 'Collections',
    'payments': 'Payments',
    'invoices': 'Invoices',
    
    // Calendar
    'appointments': 'Appointments',
    'meetings': 'Meetings',
    'events': 'Events',
    'schedule': 'Schedule',
    'today': 'Today',
    'week': 'Week',
    'month': 'Month',
    
    // AI Features
    'aiFeatures': 'AI Features',
    'analytics': 'Analytics',
    'insights': 'Insights',
    'predictions': 'Predictions',
    'chat': 'Chat',
    'automation': 'Automation',
    
    // Messages
    'success': 'Success',
    'error': 'Error',
    'info': 'Info',
    'warning': 'Warning',
    'viewDetails': 'View Details'
  },
  hi: {
    // Common
    'search': 'खोजें',
    'filter': 'फ़िल्टर',
    'export': 'निर्यात',
    'save': 'सेव करें',
    'cancel': 'रद्द करें',
    'delete': 'हटाएं',
    'edit': 'संपादित करें',
    'add': 'जोड़ें',
    'close': 'बंद करें',
    'loading': 'लोड हो रहा है...',
    'name': 'नाम',
    'email': 'ईमेल',
    'phone': 'फोन',
    'address': 'पता',
    'status': 'स्थिति',
    'actions': 'कार्य',
    'active': 'सक्रिय',
    'inactive': 'निष्क्रिय',
    'date': 'तारीख',
    'time': 'समय',
    'description': 'विवरण',
    'title': 'शीर्षक',
    'create': 'बनाएं',
    'update': 'अपडेट करें',
    'view': 'देखें',
    'details': 'विवरण',
    
    // Navigation & Layout
    'dashboard': 'डैशबोर्ड',
    'projects': 'प्रोजेक्ट',
    'customers': 'ग्राहक',
    'calendar': 'कैलेंडर',
    'marketing': 'मार्केटिंग',
    'reports': 'रिपोर्ट्स',
    'settings': 'सेटिंग्स',
    'profile': 'प्रोफाइल',
    'logout': 'लॉग आउट',
    'help': 'सहायता',
    
    // Dashboard
    'welcomeBack': 'वापस स्वागत है',
    'todaysOverview': 'आज का अवलोकन',
    'totalProjects': 'कुल प्रोजेक्ट',
    'totalCustomers': 'कुल ग्राहक',
    'monthlyRevenue': 'मासिक आय',
    'pendingTasks': 'लंबित कार्य',
    'recentActivity': 'हाल की गतिविधि',
    'quickActions': 'त्वरित कार्य',
    
    // Projects
    'projectManager': 'प्रोजेक्ट प्रबंधक',
    'createProject': 'प्रोजेक्ट बनाएं',
    'allProjects': 'सभी प्रोजेक्ट',
    'activeProjects': 'सक्रिय प्रोजेक्ट',
    'completedProjects': 'पूर्ण प्रोजेक्ट',
    'projectName': 'प्रोजेक्ट नाम',
    'location': 'स्थान',
    'totalArea': 'कुल क्षेत्र',
    'totalPlots': 'कुल प्लॉट',
    'availablePlots': 'उपलब्ध प्लॉट',
    'soldPlots': 'बेचे गए प्लॉट',
    'reservedPlots': 'आरक्षित प्लॉट',
    'plotDetails': 'प्लॉट विवरण',
    'plotNumber': 'प्लॉट नंबर',
    'plotSize': 'प्लॉट आकार',
    'plotPrice': 'प्लॉट मूल्य',
    'plotStatus': 'प्लॉट स्थिति',
    
    // Customers
    'customerManager': 'ग्राहक प्रबंधक',
    'addCustomer': 'ग्राहक जोड़ें',
    'customerName': 'ग्राहक नाम',
    'customerEmail': 'ग्राहक ईमेल',
    'customerPhone': 'ग्राहक फोन',
    'customerAddress': 'ग्राहक पता',
    'leadSource': 'लीड स्रोत',
    'customerType': 'ग्राहक प्रकार',
    'buyer': 'खरीदार',
    'investor': 'निवेशक',
    'tenant': 'किरायेदार',
    
    // Deal History Page
    'dealHistory': 'डील इतिहास',
    'trackManageTransactions': 'अपने संपत्ति लेनदेन को ट्रैक और प्रबंधित करें',
    'exportReport': 'रिपोर्ट निर्यात करें',
    'generateStatement': 'स्टेटमेंट जनरेट करें',
    'totalCommission': 'कुल कमीशन',
    'fromCompletedDeals': 'पूर्ण डील से',
    'totalSalesValue': 'कुल बिक्री मूल्य',
    'averageDealValue': 'औसत डील मूल्य',
    'acrossAllTransactions': 'सभी लेनदेन में',
    'searchByCustomer': 'ग्राहक, प्लॉट या प्रोजेक्ट द्वारा खोजें',
    'filterByStatus': 'स्थिति द्वारा फ़िल्टर करें',
    'filterByProject': 'प्रोजेक्ट द्वारा फ़िल्टर करें',
    'allStatuses': 'सभी स्थितियां',
    'listView': 'सूची दृश्य',
    'monthlyView': 'मासिक दृश्य',
    'propertyTransactions': 'संपत्ति लेनदेन',
    'showingTransactions': '{count} लेनदेन दिखा रहे हैं',
    'plot': 'प्लॉट',
    'project': 'प्रोजेक्ट',
    'customer': 'ग्राहक',
    'contact': 'संपर्क',
    'saleDate': 'बिक्री तिथि',
    'price': 'मूल्य',
    'commission': 'कमीशन',
    'completed': 'पूर्ण',
    'pending': 'लंबित',
    'cancelled': 'रद्द',
    'noTransactionsFound': 'आपके फ़िल्टर से मेल खाने वाले कोई लेनदेन नहीं मिले',
    'resetFilters': 'फ़िल्टर रीसेट करें',
    
    // WhatsApp Setup
    'whatsappSetup': 'व्हाट्सऐप सेटअप',
    'connectWhatsApp': 'व्हाट्सऐप कनेक्ट करें',
    'businessDetails': 'व्यापार विवरण',
    'phoneNumber': 'फोन नंबर',
    'businessName': 'व्यापार का नाम',
    'welcomeMessage': 'स्वागत संदेश',
    'messageTemplates': 'संदेश टेम्प्लेट',
    'sendTestMessage': 'टेस्ट मैसेज भेजें',
    'connectionStatus': 'कनेक्शन स्थिति',
    'connected': 'जुड़ा हुआ',
    'disconnected': 'डिस्कनेक्टेड',
    
    // Subscription
    'subscription': 'सब्सक्रिप्शन',
    'currentPlan': 'वर्तमान प्लान',
    'choosePlan': 'अपना प्लान चुनें',
    'manageSubscription': 'सब्सक्रिप्शन प्रबंधित करें',
    'subscribeNow': 'अभी सब्सक्राइब करें',
    'mostPopular': 'सबसे लोकप्रिय',
    'basicPlan': 'बेसिक',
    'premiumPlan': 'प्रीमियम',
    'enterprisePlan': 'एंटरप्राइज़',
    
    // Marketing
    'marketingHub': 'मार्केटिंग हब',
    'campaigns': 'कैंपेन',
    'createCampaign': 'कैंपेन बनाएं',
    'emailCampaign': 'ईमेल कैंपेन',
    'leadGeneration': 'लीड जेनरेशन',
    'totalLeads': 'कुल लीड्स',
    'conversionRate': 'रूपांतरण दर',
    'activeCampaigns': 'सक्रिय कैंपेन',
    
    // Materials & Suppliers
    'materials': 'सामग्री',
    'suppliers': 'आपूर्तिकर्ता',
    'inventory': 'इन्वेंटरी',
    'scheduleOrder': 'ऑर्डर शेड्यूल करें',
    'orderQuantity': 'ऑर्डर मात्रा',
    'deliveryDate': 'डिलीवरी तारीख',
    'supplierName': 'आपूर्तिकर्ता नाम',
    'contactInfo': 'संपर्क जानकारी',
    'rating': 'रेटिंग',
    
    // Admin Panel
    'adminPanel': 'एडमिन पैनल',
    'userManagement': 'उपयोगकर्ता प्रबंधन',
    'systemSettings': 'सिस्टम सेटिंग्स',
    'dataBackup': 'डेटा और बैकअप',
    'security': 'सुरक्षा',
    'addUser': 'उपयोगकर्ता जोड़ें',
    'totalUsers': 'कुल उपयोगकर्ता',
    'activeUsers': 'सक्रिय उपयोगकर्ता',
    'adminUsers': 'एडमिन उपयोगकर्ता',
    'systemHealth': 'सिस्टम स्वास्थ्य',
    
    // Financial
    'financials': 'वित्तीय',
    'revenue': 'राजस्व',
    'expenses': 'खर्च',
    'profit': 'लाभ',
    'collections': 'संग्रह',
    'payments': 'भुगतान',
    'invoices': 'चालान',
    
    // Calendar
    'appointments': 'नियुक्तियां',
    'meetings': 'बैठकें',
    'events': 'घटनाएं',
    'schedule': 'अनुसूची',
    'today': 'आज',
    'week': 'सप्ताह',
    'month': 'महीना',
    
    // AI Features
    'aiFeatures': 'AI फीचर्स',
    'analytics': 'एनालिटिक्स',
    'insights': 'अंतर्दृष्टि',
    'predictions': 'भविष्यवाणियां',
    'chat': 'चैट',
    'automation': 'स्वचालन'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
