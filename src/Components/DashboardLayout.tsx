'use client';

import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab = 'dashboard', 
  onTabChange = () => {} 
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const layoutRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([layoutRef.current], {
      opacity: 0,
      scale: 0.95
    });

    tl.to(layoutRef.current, {
      duration: 0.6,
      opacity: 1,
      scale: 1,
      ease: "power2.out"
    })
    .to(mainRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "back.out(1.7)"
    }, "-=0.3");
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && !sidebarCollapsed) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarCollapsed]);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleTabChange = (tab: string) => {
    gsap.to(mainRef.current, {
      duration: 0.3,
      opacity: 0,
      y: 10,
      ease: "power2.out",
      onComplete: () => {
        onTabChange(tab);
        gsap.to(mainRef.current, {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "back.out(1.7)"
        });
      }
    });
  };

  return (
    <div 
      ref={layoutRef}
      className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden"
    >
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />
        
        <main 
          ref={mainRef}
          className="flex-1 overflow-x-hidden overflow-y-auto"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
