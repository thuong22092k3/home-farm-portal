'use client';

import { AppIconButton } from '@/components/app-icon-button';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useSyncExternalStore } from 'react';

type AppThemeToggleProps = {
  showSystem?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
};

// Custom hook to check if component is mounted (SSR-safe)
function useMounted(): boolean {
  return useSyncExternalStore(
    useCallback(() => () => {}, []),
    () => true,
    () => false,
  );
}

function AppThemeToggle({ showSystem = false, size = 'md', variant = 'ghost' }: AppThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const cycleTheme = () => {
    if (showSystem) {
      // Cycle: light -> dark -> system -> light
      if (theme === 'light') setTheme('dark');
      else if (theme === 'dark') setTheme('system');
      else setTheme('light');
    } else {
      // Toggle: light <-> dark
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    }
  };

  const getIcon = () => {
    if (!mounted) {
      return <Sun className='h-4 w-4' />;
    }

    if (showSystem && theme === 'system') {
      return <Monitor className='h-4 w-4' />;
    }

    return resolvedTheme === 'dark' ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />;
  };

  const getTooltip = () => {
    if (!mounted) return 'Toggle theme';

    if (showSystem) {
      if (theme === 'light') return 'Light (click for dark)';
      if (theme === 'dark') return 'Dark (click for system)';
      return 'System (click for light)';
    }

    return resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  };

  return <AppIconButton icon={getIcon()} tooltip={getTooltip()} size={size} variant={variant} onClick={cycleTheme} />;
}

export { AppThemeToggle, type AppThemeToggleProps };
