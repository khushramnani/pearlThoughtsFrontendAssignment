import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { UserIcon, BriefcaseIcon, CalendarIcon, StarIcon } from '@heroicons/react/24/outline';

export const TeacherDetails = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, detailsRef.current, statsRef.current], {
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
    .to(detailsRef.current, {
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

    const statCards = statsRef.current?.querySelectorAll('.stat-card');
    statCards?.forEach((card: Element, index: number) => {
      gsap.set(card, { scale: 0.8, opacity: 0 });
      gsap.to(card, {
        duration: 0.4,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.7)",
        delay: 0.8 + (index * 0.1)
      });

      const cardElement = card as HTMLElement;
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(cardElement, {
          duration: 0.3,
          scale: 1.05,
          y: -5,
          ease: "power2.out"
        });
      });
      
      cardElement.addEventListener('mouseleave', () => {
        gsap.to(cardElement, {
          duration: 0.3,
          scale: 1,
          y: 0,
          ease: "power2.out"
        });
      });
    });

    const stars = headerRef.current?.querySelectorAll('.star-icon');
    stars?.forEach((star: Element, index: number) => {
      gsap.set(star, { scale: 0, rotation: -180 });
      gsap.to(star, {
        duration: 0.5,
        scale: 1,
        rotation: 0,
        ease: "back.out(1.7)",
        delay: 1 + (index * 0.1)
      });
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl border-2 border-purple-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
      style={{ transform: 'scale(0.95)' }}
    >
      <div 
        ref={headerRef}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 px-4 sm:px-6 py-6 sm:py-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white flex-shrink-0">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AA</span>
          </div>
          <div className="text-white flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold drop-shadow-lg truncate">✨ Alynia Allan</h1>
            <p className="text-purple-100 text-lg sm:text-xl font-medium">🎓 Senior Teacher</p>
            <div className="flex items-center justify-center sm:justify-start mt-3 flex-wrap">
              <div className="flex">
                <StarIcon className="star-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 fill-current drop-shadow-sm" />
                <StarIcon className="star-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 fill-current drop-shadow-sm" />
                <StarIcon className="star-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 fill-current drop-shadow-sm" />
                <StarIcon className="star-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 fill-current drop-shadow-sm" />
                <StarIcon className="star-icon w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-300 fill-current drop-shadow-sm" />
              </div>
              <span className="ml-2 sm:ml-3 text-yellow-100 font-semibold bg-yellow-500 bg-opacity-20 px-2 sm:px-3 py-1 rounded-full border border-yellow-300 text-xs sm:text-sm lg:text-base">⭐ 5.0 Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={detailsRef} className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Teacher Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <UserIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Full Name</p>
              <p className="text-sm sm:text-base text-gray-900 truncate">Alynia Allan</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <BriefcaseIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Role</p>
              <p className="text-sm sm:text-base text-gray-900 truncate">Senior Teacher</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3 sm:col-span-2 lg:col-span-1">
            <div className="flex-shrink-0">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mt-1" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-500">Experience</p>
              <p className="text-sm sm:text-base text-gray-900 truncate">8 Years</p>
            </div>
          </div>
        </div>
        
        <div ref={statsRef} className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div className="stat-card bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-3 sm:p-4 lg:p-5 text-center border-2 border-blue-200 shadow-lg">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">156</p>
            <p className="text-xs sm:text-sm text-blue-700 font-medium">👥 Students</p>
          </div>
          <div className="stat-card bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-3 sm:p-4 lg:p-5 text-center border-2 border-green-200 shadow-lg">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">12</p>
            <p className="text-xs sm:text-sm text-green-700 font-medium">📚 Subjects</p>
          </div>
          <div className="stat-card bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 sm:p-4 lg:p-5 text-center border-2 border-purple-200 shadow-lg">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">4.9</p>
            <p className="text-xs sm:text-sm text-purple-700 font-medium">⭐ Rating</p>
          </div>
          <div className="stat-card bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-3 sm:p-4 lg:p-5 text-center border-2 border-orange-200 shadow-lg">
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">98%</p>
            <p className="text-xs sm:text-sm text-orange-700 font-medium">🎯 Success</p>
          </div>
        </div>
      </div>
    </div>
  );
};