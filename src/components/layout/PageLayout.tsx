
import React, { ReactNode } from 'react';
import Navbar from '../Navbar';
import { useIsMobile } from '@/hooks/use-mobile';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background">
      <Navbar />
      <div className="flex-1 overflow-y-auto pb-16 md:pb-0 pt-16 md:pt-0">
        <main className={`container mx-auto px-3 py-6 md:px-6 md:py-8 animate-fade-in ${isMobile ? 'max-w-full' : 'max-w-7xl'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PageLayout;
