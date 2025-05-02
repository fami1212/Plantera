
import React, { ReactNode, useEffect } from 'react';
import Navbar from '../Navbar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppSettings } from '@/contexts/AppSettingsContext';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const isMobile = useIsMobile();
  const { settings } = useAppSettings();
  
  // Apply dark mode to both html and body to ensure full coverage
  useEffect(() => {
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
      document.body.className = 'dark bg-background text-foreground';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-background text-foreground';
    }
  }, [settings.darkMode]);
  
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0 pt-16 md:pt-0 bg-background">
        <main className={`container mx-auto px-3 py-6 md:px-6 md:py-8 animate-fade-in ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
