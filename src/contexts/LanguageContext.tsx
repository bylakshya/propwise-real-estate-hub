
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
    'allProjects': 'All Projects',
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
    'status': 'Status',
    'completed': 'Completed',
    'pending': 'Pending',
    'cancelled': 'Cancelled',
    'noTransactionsFound': 'No transactions found matching your filters',
    'resetFilters': 'Reset filters'
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
    'allProjects': 'सभी प्रोजेक्ट',
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
    'status': 'स्थिति',
    'completed': 'पूर्ण',
    'pending': 'लंबित',
    'cancelled': 'रद्द',
    'noTransactionsFound': 'आपके फ़िल्टर से मेल खाने वाले कोई लेनदेन नहीं मिले',
    'resetFilters': 'फ़िल्टर रीसेट करें'
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
