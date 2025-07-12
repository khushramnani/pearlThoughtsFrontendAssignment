import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { AcademicCapIcon, UserGroupIcon, CurrencyDollarIcon, TrophyIcon } from '@heroicons/react/24/outline';

type Qualification = {
  name: string;
  rate: string;
  level: string;
  students: number;
};

const privateQualifications: Qualification[] = [
  { name: 'Vocal Contemporary', rate: '$28.00', level: 'Advanced', students: 15 },
  { name: 'Vocal Core', rate: '$28.00', level: 'Intermediate', students: 22 },
  { name: 'Vocal Mix', rate: '$28.00', level: 'Advanced', students: 18 },
  { name: 'Vocal Plus', rate: '$28.00', level: 'Expert', students: 12 },
  { name: 'Instrument', rate: '$28.00', level: 'Beginner', students: 25 },
];

const groupQualifications = [
  { name: 'Choir Direction', rate: '$45.00', level: 'Expert', students: 35 },
  { name: 'Music Theory Group', rate: '$35.00', level: 'Advanced', students: 20 },
];

export const Qualifications = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const privateRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([privateRef.current, groupRef.current], {
      y: 50,
      opacity: 0,
      scale: 0.9
    });

    tl.to(privateRef.current, {
      duration: 0.6,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "back.out(1.7)"
    })
    .to(groupRef.current, {
      duration: 0.6,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "back.out(1.7)"
    }, "-=0.3");

    const qualificationItems = containerRef.current?.querySelectorAll('.qualification-item');
    qualificationItems?.forEach((item: Element, index: number) => {
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
          y: -3,
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

    const revenueCards = containerRef.current?.querySelectorAll('.revenue-card');
    revenueCards?.forEach((card: Element, index: number) => {
      gsap.set(card, { scale: 0.8, opacity: 0 });
      gsap.to(card, {
        duration: 0.5,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        delay: 1.2 + (index * 0.2)
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4 sm:gap-6">
      {/* Private Qualifications */}
      <div ref={privateRef} className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border-2 border-indigo-200 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <AcademicCapIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Private Qualifications</h2>
              <p className="text-xs sm:text-sm text-indigo-600 font-medium">{privateQualifications.length} active subjects</p>
            </div>
          </div>
          <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-300 w-full sm:w-auto">
            ➕ Add New
          </button>
        </div>
        
        <div className="space-y-3">
          {privateQualifications.map((q, i) => (
            <div key={i} className="qualification-item flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition-all duration-300 border-2 border-indigo-200 shadow-sm">
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{q.name}</h3>
                  <span className="text-lg sm:text-xl font-bold text-emerald-600 bg-emerald-100 px-2 sm:px-3 py-1 rounded-lg border border-emerald-200 self-start">{q.rate}/hr</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${
                    q.level === 'Expert' ? 'bg-purple-100 text-purple-800' :
                    q.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                    q.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {q.level}
                  </span>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <UserGroupIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                    {q.students} students
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="revenue-card mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-emerald-100 to-cyan-100 rounded-xl border-2 border-emerald-200 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <CurrencyDollarIcon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600 flex-shrink-0" />
              <span className="font-bold text-emerald-900 text-base sm:text-lg">💰 Total Monthly Revenue</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-emerald-600">$2,856</span>
          </div>
        </div>
      </div>

      <div ref={groupRef} className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl shadow-xl border-2 border-emerald-200 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <UserGroupIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Group Qualifications</h2>
              <p className="text-xs sm:text-sm text-emerald-600 font-medium">{groupQualifications.length} group classes</p>
            </div>
          </div>
          <button className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-teal-300 w-full sm:w-auto">
            ➕ Add Group
          </button>
        </div>

        {groupQualifications.length > 0 ? (
          <div className="space-y-4">
            {groupQualifications.map((q, i) => (
              <div key={i} className="qualification-item flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 border-2 border-emerald-200 shadow-sm">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">{q.name}</h3>
                    <span className="text-lg sm:text-xl font-bold text-emerald-600 bg-emerald-100 px-2 sm:px-3 py-1 rounded-lg border border-emerald-200 self-start">{q.rate}/session</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3">
                    <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 w-fit">
                      🏆 {q.level}
                    </span>
                    <div className="flex items-center text-xs sm:text-sm text-emerald-600 bg-emerald-100 px-2 sm:px-3 py-1 rounded-lg border border-emerald-200 w-fit">
                      <UserGroupIcon className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
                      {q.students} students
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="revenue-card mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl border-2 border-teal-200 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <TrophyIcon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 flex-shrink-0" />
                  <span className="font-bold text-teal-900 text-base sm:text-lg">🎯 Group Revenue</span>
                </div>
                <span className="text-xl sm:text-2xl font-bold text-teal-600">$1,920</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-emerald-50 rounded-xl border-2 border-dashed border-emerald-300">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="text-base sm:text-lg font-semibold text-gray-700 mb-2">🎯 No group qualifications yet</p>
            <p className="text-sm text-gray-500 mb-4 sm:mb-6">Start building your group teaching portfolio</p>
            <button className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-teal-300">
              ✨ Create First Group Class
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
