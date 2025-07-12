import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  ChevronDownIcon, 
  BellIcon, 
  UserCircleIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

export const Header = () => {
  const headerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    gsap.set([titleRef.current, searchRef.current, actionsRef.current], {
      y: -20,
      opacity: 0
    });

    tl.to(headerRef.current, {
      duration: 0.6,
      y: 0,
      ease: "power2.out"
    })
    .to(titleRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "back.out(1.7)"
    }, "-=0.3")
    .to(searchRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3")
    .to(actionsRef.current, {
      duration: 0.5,
      y: 0,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.3");

    const buttons = headerRef.current?.querySelectorAll('button');
    buttons?.forEach((button: Element) => {
      const buttonElement = button as HTMLButtonElement;
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

  return (
    <header 
      ref={headerRef}
      className="bg-gradient-to-r from-white via-blue-50 to-purple-50 border-b-2 border-purple-200 shadow-lg"
    >
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        <div ref={titleRef} className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent truncate">
            <span className="hidden sm:inline">Teacher Dashboard</span>
            <span className="sm:hidden">Dashboard</span>
          </h1>
        </div>

        <div ref={searchRef} className="flex-1 max-w-xs sm:max-w-lg mx-2 sm:mx-8 hidden md:block">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border-2 border-purple-200 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-md hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              placeholder="🔍 Search..."
            />
          </div>
        </div>

        <div ref={actionsRef} className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
          <button className="md:hidden p-2 text-purple-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl bg-purple-50 hover:bg-purple-100 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-purple-200">
            <MagnifyingGlassIcon className="h-5 w-5" />
          </button>

          <button className="relative p-2 text-purple-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl bg-purple-50 hover:bg-purple-100 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-purple-200">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500 ring-2 ring-white shadow-lg">
              <span className="block h-1 w-1 rounded-full bg-white mx-auto mt-1"></span>
            </span>
          </button>

          <button className="hidden sm:block p-2 text-purple-500 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-xl bg-purple-50 hover:bg-purple-100 shadow-md hover:shadow-lg transition-all duration-300 border-2 border-purple-200">
            <Cog6ToothIcon className="h-5 w-5" />
          </button>

          <div className="relative">
            <button className="flex items-center space-x-1 sm:space-x-3 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 min-w-0">
              <UserCircleIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 flex-shrink-0" />
              <div className="text-left hidden lg:block min-w-0">
                <p className="font-medium text-gray-700 text-sm truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">Administrator</p>
              </div>
              <ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 hidden sm:block flex-shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
