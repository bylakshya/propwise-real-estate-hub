
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DarkModeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="dark-mode-toggle"
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-gray-600" />
      )}
    </Button>
  );
};
