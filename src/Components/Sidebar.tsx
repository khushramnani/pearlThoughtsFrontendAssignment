import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  CogIcon,
  BookOpenIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { icon: HomeIcon, label: 'Dashboard', id: 'dashboard' },
  { icon: UserGroupIcon, label: 'Teachers', id: 'teachers' },
  { icon: AcademicCapIcon, label: 'Students', id: 'students' },
  { icon: BookOpenIcon, label: 'Subjects', id: 'subjects' },
  { icon: CalendarDaysIcon, label: 'Schedule', id: 'schedule' },
  { icon: DocumentTextIcon, label: 'Assignments', id: 'assignments' },
  { icon: ChartBarIcon, label: 'Analytics', id: 'analytics' },
  { icon: CreditCardIcon, label: 'Payment', id: 'payment' },
  { icon: ChatBubbleLeftRightIcon, label: 'Messages', id: 'messages' },
  { icon: CogIcon, label: 'Settings', id: 'settings' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, activeTab, onTabChange }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([logoRef.current, menuRef.current], {
      x: -30,
      opacity: 0
    });

    tl.to(sidebarRef.current, {
      duration: 0.5,
      x: 0,
      ease: "power2.out"
    })
    .to(logoRef.current, {
      duration: 0.6,
      x: 0,
      opacity: 1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(menuRef.current, {
      duration: 0.5,
      x: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3");

    const menuItems = menuRef.current?.querySelectorAll('li');
    menuItems?.forEach((item: Element, index: number) => {
      gsap.set(item, { x: -20, opacity: 0 });
      gsap.to(item, {
        duration: 0.4,
        x: 0,
        opacity: 1,
        ease: "power2.out",
        delay: 0.1 * index
      });
    });
  }, []);

  useEffect(() => {
    gsap.to(sidebarRef.current, {
      duration: 0.4,
      width: collapsed ? 64 : 256,
      ease: "power2.inOut"
    });

    const textElements = sidebarRef.current?.querySelectorAll('.sidebar-text');
    if (textElements) {
      if (collapsed) {
        gsap.to(textElements, {
          duration: 0.2,
          opacity: 0,
          x: -10,
          ease: "power2.out"
        });
      } else {
        gsap.to(textElements, {
          duration: 0.4,
          opacity: 1,
          x: 0,
          ease: "power2.out",
          delay: 0.2
        });
      }
    }
  }, [collapsed]);

  return (
    <div 
      ref={sidebarRef}
      className="bg-gradient-to-b from-white to-indigo-50 border-r-2 border-indigo-200 shadow-xl h-full overflow-hidden"
      style={{ width: collapsed ? '64px' : '256px' }}
    >
      <div ref={logoRef} className="flex items-center justify-between p-4 border-b-2 border-indigo-200">
        {!collapsed && (
          <div className="flex items-center space-x-3 sidebar-text">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent pr-2 truncate">EduManage</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-xl hover:bg-indigo-100 transition-all duration-300 shadow-md hover:shadow-lg border-2 border-indigo-200 transform hover:scale-105 flex-shrink-0"
        >
          {collapsed ? (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      <nav ref={menuRef} className="mt-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg border-2 border-indigo-300'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 border-2 border-transparent hover:border-indigo-200 shadow-sm hover:shadow-md'
                }`}
              >
                <item.icon className={`flex-shrink-0 w-5 h-5 ${
                  activeTab === item.id ? 'text-white' : 'text-gray-400'
                }`} />
                {!collapsed && (
                  <span className="ml-3 truncate sidebar-text">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
