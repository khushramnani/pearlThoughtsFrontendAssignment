'use client'
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ArchiveBoxIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

import { AvailabilityTab } from './Analytics/AvailabilityTab';
import { UnavailabilityTab } from './Analytics/UnavailabilityTab';
import { StudentsTab } from './Analytics/StudentsTab';
import { ScheduleTab } from './Analytics/ScheduleTab';
import { CommentsTab } from './Analytics/CommentsTab';
import { HistoryTab } from './Analytics/HistoryTab';

const tabs = [
  { 
    id: 'availability', 
    name: 'Availability', 
    icon: CheckCircleIcon,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    borderColor: 'border-green-200'
  },
  { 
    id: 'unavailability', 
    name: 'Unavailability', 
    icon: XCircleIcon,
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    borderColor: 'border-red-200'
  },
  { 
    id: 'students', 
    name: 'Students', 
    icon: UserGroupIcon,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    borderColor: 'border-blue-200'
  },
  { 
    id: 'schedule', 
    name: 'Schedule', 
    icon: CalendarIcon,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    borderColor: 'border-purple-200'
  },
  { 
    id: 'comments', 
    name: 'Comments', 
    icon: ChatBubbleLeftRightIcon,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    borderColor: 'border-orange-200'
  },
  { 
    id: 'history', 
    name: 'History', 
    icon: ArchiveBoxIcon,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200'
  }
];

export const Analytics = () => {
  const [activeTab, setActiveTab] = useState('availability');
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, tabsRef.current, contentRef.current], {
      y: 30,
      opacity: 0
    });

    tl.to(containerRef.current, {
      duration: 0.6,
      scale: 1,
      ease: "back.out(1.7)"
    })
    .to(headerRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.4")
    .to(tabsRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3")
    .to(contentRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.2");

    const tabButtons = tabsRef.current?.querySelectorAll('button');
    tabButtons?.forEach((button: Element, index: number) => {
      gsap.set(button, { scale: 0.8, opacity: 0 });
      gsap.to(button, {
        duration: 0.4,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        delay: 0.8 + (index * 0.1)
      });

      const buttonElement = button as HTMLElement;
      buttonElement.addEventListener('mouseenter', () => {
        gsap.to(buttonElement, {
          duration: 0.3,
          scale: 1.05,
          y: -2,
          ease: "power2.out"
        });
      });
      
      buttonElement.addEventListener('mouseleave', () => {
        gsap.to(buttonElement, {
          duration: 0.3,
          scale: 1,
          y: 0,
          ease: "power2.out"
        });
      });
    });
  }, []);

  const handleTabChange = (newTab: string) => {
    gsap.to(contentRef.current, {
      duration: 0.3,
      opacity: 0,
      y: 10,
      ease: "power2.out",
      onComplete: () => {
        setActiveTab(newTab);
        gsap.to(contentRef.current, {
          duration: 0.4,
          opacity: 1,
          y: 0,
          ease: "back.out(1.7)"
        });
      }
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'availability':
        return <AvailabilityTab />;
      case 'unavailability':
        return <UnavailabilityTab />;
      case 'students':
        return <StudentsTab />;
      case 'schedule':
        return <ScheduleTab />;
      case 'comments':
        return <CommentsTab />;
      case 'history':
        return <HistoryTab />;
      default:
        return <AvailabilityTab />;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border-2 border-indigo-200 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300"
      style={{ transform: 'scale(0.95)' }}
    >
      <div ref={headerRef} className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <ChartBarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent truncate">📊 Analytics Dashboard</h2>
            <p className="text-xs sm:text-sm text-indigo-600 font-medium">Comprehensive teacher analytics</p>
          </div>
        </div>
      </div>

      <div ref={tabsRef} className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 min-w-full pb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 border-2 min-w-fit flex-shrink-0 ${
                  isActive
                    ? `${tab.bgColor} ${tab.color} ${tab.borderColor} shadow-md`
                    : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="whitespace-nowrap">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div ref={contentRef} className="min-h-[300px] sm:min-h-[400px]">
        {renderTabContent()}
      </div>
    </div>
  );
};
