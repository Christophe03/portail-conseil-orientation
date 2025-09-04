'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <SunIcon className="h-5 w-5" />;
      case 'dark':
        return <MoonIcon className="h-5 w-5" />;
      case 'system':
        return <ComputerDesktopIcon className="h-5 w-5" />;
      default:
        return <ComputerDesktopIcon className="h-5 w-5" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Passer au mode sombre';
      case 'dark':
        return 'Passer au mode système';
      case 'system':
        return 'Passer au mode clair';
      default:
        return 'Changer le thème';
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={getLabel()}
      className="p-2 text-neutral-700 hover:text-primary-600 dark:text-neutral-300 dark:hover:text-primary-400"
    >
      {getIcon()}
    </Button>
  );
}
