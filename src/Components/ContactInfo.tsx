import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { EnvelopeIcon, PhoneIcon, MapPinIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export const ContactInfo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([headerRef.current, gridRef.current], {
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
    .to(gridRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3");

    const contactCards = gridRef.current?.querySelectorAll('.contact-card');
    contactCards?.forEach((card: Element, index: number) => {
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
          scale: 1.02,
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
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-xl border-2 border-indigo-200 p-4 sm:p-6 hover:shadow-2xl transition-all duration-300"
      style={{ transform: 'scale(0.95)' }}
    >
      <div ref={headerRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">📞 Contact Information</h2>
        <button className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-pink-300 w-full sm:w-auto">
          ✏️ Edit Contact
        </button>
      </div>
      
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="contact-card flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 border-2 border-blue-200 shadow-md">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
              <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Work Email</p>
            <p className="text-sm sm:text-base text-gray-900 truncate">alyniaallan@example.com</p>
            <p className="text-xs text-green-600 font-semibold mt-2 bg-green-100 px-2 py-1 rounded-full border border-green-200 inline-block">✅ Verified</p>
          </div>
        </div>

        <div className="contact-card flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 border-2 border-green-200 shadow-md">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Phone Number</p>
            <p className="text-sm sm:text-base text-gray-900">+1 (416) 649-9057</p>
            <p className="text-xs text-green-600 font-semibold mt-2 bg-green-100 px-2 py-1 rounded-full border border-green-200 inline-block">📱 Primary</p>
          </div>
        </div>

        <div className="contact-card flex items-start space-x-3 sm:space-x-4 p-4 sm:p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:from-red-100 hover:to-pink-100 transition-all duration-300 md:col-span-2 border-2 border-red-200 shadow-md">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <MapPinIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Home Address</p>
            <p className="text-sm sm:text-base text-gray-900">56 Oswald De Santos Dr, North York, Ontario, Canada</p>
            <p className="text-xs text-blue-600 mt-1 cursor-pointer hover:text-blue-800">View on Map</p>
          </div>
        </div>

        <div className="contact-card flex items-start space-x-3 sm:space-x-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all duration-300 border-2 border-orange-200 shadow-md">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
              <PhoneIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Emergency Contact</p>
            <p className="text-sm sm:text-base text-gray-900">+1 (416) 555-0123</p>
            <p className="text-xs text-gray-500 mt-1">John Allan (Spouse)</p>
          </div>
        </div>

        <div className="contact-card flex items-start space-x-3 sm:space-x-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 border-2 border-purple-200 shadow-md">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <GlobeAltIcon className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-gray-500">Portfolio Website</p>
            <p className="text-sm sm:text-base text-indigo-600 hover:text-indigo-500 cursor-pointer truncate">alyniaallan.com</p>
            <p className="text-xs text-gray-500 mt-1">Professional Portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
};