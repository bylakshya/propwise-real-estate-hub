
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/ui/dark-mode-toggle';
import { useToast } from '@/hooks/use-toast';

const StatusBar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleDarkMode } = useDarkMode();
  const { toast } = useToast();
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : 'en';
    setLanguage(newLanguage);
    toast({
      title: newLanguage === 'en' ? 'Language Changed' : 'भाषा बदल गई',
      description: newLanguage === 'en' ? 'English language selected' : 'हिंदी भाषा चुनी गई',
    });
  };

  return (
    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="text-lg font-semibold text-realestate-primary dark:text-blue-400">
        RealEstate Pro
      </div>
      
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <DarkModeToggle isDark={isDark} onToggle={toggleDarkMode} />
        
        {/* Language Toggle */}
        <Button variant="outline" size="sm" onClick={toggleLanguage}>
          {language === 'en' ? 'English' : 'हिंदी'}
        </Button>
        
        {/* Subscription Button */}
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Subscription
        </Button>
        
        {/* Settings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-400">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>
                {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start">
              <span className="font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground">{user?.email}</span>
              <span className="text-xs capitalize mt-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                {user?.role}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default StatusBar;
