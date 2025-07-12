import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CalendarIcon, ClockIcon, UserIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

type ScheduleItem = {
  id: string;
  time: string;
  subject: string;
  student: string;
  type: 'online' | 'offline';
  status: 'upcoming' | 'completed' | 'cancelled';
};

const scheduleData: ScheduleItem[] = [
  {
    id: '1',
    time: '09:00 AM',
    subject: 'Vocal Contemporary',
    student: 'Sarah Johnson',
    type: 'online',
    status: 'upcoming'
  },
  {
    id: '2',
    time: '10:30 AM',
    subject: 'Vocal Core',
    student: 'Mike Chen',
    type: 'offline',
    status: 'upcoming'
  },
  {
    id: '3',
    time: '02:00 PM',
    subject: 'Instrument',
    student: 'Emma Davis',
    type: 'online',
    status: 'completed'
  },
  {
    id: '4',
    time: '03:30 PM',
    subject: 'Vocal Mix',
    student: 'James Wilson',
    type: 'offline',
    status: 'upcoming'
  },
  {
    id: '5',
    time: '05:00 PM',
    subject: 'Vocal Plus',
    student: 'Lisa Brown',
    type: 'online',
    status: 'cancelled'
  }
];

export const ScheduleTable = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, scheduleRef.current, statsRef.current], {
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
    .to(scheduleRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3")
    .to(statsRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.2");

    const scheduleItems = scheduleRef.current?.querySelectorAll('.schedule-item');
    scheduleItems?.forEach((item: Element, index: number) => {
      gsap.set(item, { x: -30, opacity: 0 });
      gsap.to(item, {
        duration: 0.4,
        x: 0,
        opacity: 1,
        ease: "power2.out",
        delay: 0.8 + (index * 0.1)
      });

      const itemElement = item as HTMLElement;
      itemElement.addEventListener('mouseenter', () => {
        gsap.to(itemElement, {
          duration: 0.3,
          scale: 1.02,
          y: -2,
          ease: "power2.out"
        });
      });
      
      itemElement.addEventListener('mouseleave', () => {
        gsap.to(itemElement, {
          duration: 0.3,
          scale: 1,
          y: 0,
          ease: "power2.out"
        });
      });
    });

    const statCards = statsRef.current?.querySelectorAll('.stat-card');
    statCards?.forEach((card: Element, index: number) => {
      gsap.set(card, { scale: 0.8, opacity: 0 });
      gsap.to(card, {
        duration: 0.4,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        delay: 1.2 + (index * 0.1)
      });
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-white to-blue-50 mb-6 sm:mb-8 lg:mb-16 rounded-2xl shadow-lg border-2 border-blue-200 p-4 sm:p-6 hover:shadow-xl transition-all duration-300"
      style={{ transform: 'scale(0.95)' }}
    >
      <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <CalendarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Today&apos;s Schedule</h2>
            <p className="text-sm text-gray-500">{scheduleData.length} lessons scheduled</p>
          </div>
        </div>
        <button className="px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-300 w-full sm:w-auto">
          ➕ Add Lesson
        </button>
      </div>

      <div ref={scheduleRef} className="overflow-hidden">
        <div className="space-y-3">
          {scheduleData.map((item) => (
            <div
              key={item.id}
              className="schedule-item flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-white to-gray-50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border-2 border-gray-200 hover:border-indigo-300 shadow-sm space-y-3 sm:space-y-0"
            >
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-sm text-purple-600 bg-purple-100 px-3 py-2 rounded-lg border border-purple-200 w-fit flex-shrink-0">
                  <ClockIcon className="w-4 h-4" />
                  <span className="font-semibold">{item.time}</span>
                </div>
                
                <div className="hidden sm:block h-8 w-px bg-gradient-to-b from-pink-300 to-purple-300 flex-shrink-0"></div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-base sm:text-lg truncate">{item.subject}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <UserIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm text-gray-600 truncate">{item.student}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-between sm:justify-end flex-shrink-0">
                <div className="flex items-center space-x-2">
                  {item.type === 'online' ? (
                    <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-lg border border-blue-200">
                      <VideoCameraIcon className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-700 font-medium capitalize">{item.type}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-lg border border-green-200">
                      <UserIcon className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700 font-medium capitalize">{item.type}</span>
                    </div>
                  )}
                </div>
                
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                >
                  {item.status}
                </span>
                
                {item.status === 'upcoming' && (
                  <button className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-500 hover:to-cyan-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-emerald-300">
                    🚀 Start
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={statsRef} className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 border-t-2 border-gradient-to-r from-pink-200 to-purple-200">
        <div className="stat-card text-center bg-gradient-to-br from-blue-100 to-cyan-100 p-4 rounded-xl border-2 border-blue-200 shadow-md">
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">3</p>
          <p className="text-sm text-blue-700 font-medium">📅 Upcoming</p>
        </div>
        <div className="stat-card text-center bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-xl border-2 border-green-200 shadow-md">
          <p className="text-2xl sm:text-3xl font-bold text-green-600">1</p>
          <p className="text-sm text-green-700 font-medium">✅ Completed</p>
        </div>
        <div className="stat-card text-center bg-gradient-to-br from-red-100 to-pink-100 p-4 rounded-xl border-2 border-red-200 shadow-md">
          <p className="text-2xl sm:text-3xl font-bold text-red-600">1</p>
          <p className="text-sm text-red-700 font-medium">❌ Cancelled</p>
        </div>
      </div>
    </div>
  );
};