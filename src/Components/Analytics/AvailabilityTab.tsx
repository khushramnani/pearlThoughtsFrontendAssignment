import React, { useState, useEffect, useRef } from 'react';
import { ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { gsap } from 'gsap';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

const monthlyData = [
  { month: 'Jan', available: 85, total: 100, percentage: 85 },
  { month: 'Feb', available: 78, total: 100, percentage: 78 },
  { month: 'Mar', available: 92, total: 100, percentage: 92 },
  { month: 'Apr', available: 88, total: 100, percentage: 88 },
  { month: 'May', available: 95, total: 100, percentage: 95 },
  { month: 'Jun', available: 82, total: 100, percentage: 82 },
  { month: 'Jul', available: 90, total: 100, percentage: 90 },
  { month: 'Aug', available: 87, total: 100, percentage: 87 },
  { month: 'Sep', available: 93, total: 100, percentage: 93 },
  { month: 'Oct', available: 89, total: 100, percentage: 89 },
  { month: 'Nov', available: 84, total: 100, percentage: 84 },
  { month: 'Dec', available: 91, total: 100, percentage: 91 }
];

const availabilityData = {
  'Monday': ['9:00 AM', '10:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
  'Tuesday': ['8:00 AM', '9:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
  'Wednesday': ['10:00 AM', '11:00 AM', '12:00 PM', '4:00 PM', '5:00 PM'],
  'Thursday': ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'],
  'Friday': ['8:00 AM', '9:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'],
  'Saturday': ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'],
  'Sunday': ['2:00 PM', '3:00 PM', '4:00 PM']
};

export const AvailabilityTab = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
      
      if (chartRef.current) {
        gsap.fromTo(chartRef.current, 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
        );
      }
      
      if (pieChartRef.current) {
        gsap.fromTo(pieChartRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
        );
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const getAvailabilityStats = () => {
    const totalSlots = days.length * timeSlots.length;
    const availableSlots = Object.values(availabilityData).reduce((acc, daySlots) => acc + daySlots.length, 0);
    const percentage = Math.round((availableSlots / totalSlots) * 100);
    return { total: totalSlots, available: availableSlots, percentage };
  };

  const stats = getAvailabilityStats();

  const chartData = days.map(day => {
    const daySlots = availabilityData[day as keyof typeof availabilityData] || [];
    return {
      day: day.slice(0, 3),
      fullDay: day,
      available: daySlots.length,
      total: timeSlots.length,
      percentage: Math.round((daySlots.length / timeSlots.length) * 100),
      unavailable: timeSlots.length - daySlots.length
    };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200 shadow-md">
          <div className="flex items-center space-x-3">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              <p className="text-sm text-green-700 font-medium">Available Slots</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ClockIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              <p className="text-sm text-blue-700 font-medium">Total Slots</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">%</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{stats.percentage}%</p>
              <p className="text-sm text-purple-700 font-medium">Availability Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Availability Chart */}
      <div ref={chartRef} className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <ClockIcon className="w-5 h-5 mr-2 text-blue-600" />
          📊 Daily Availability Chart
        </h3>
        
        <div className="space-y-4">
          {chartData.map((data, index) => (
            <div key={data.day} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700 text-sm w-20">{data.fullDay}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{data.available}/{data.total} slots</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                    {data.percentage}%
                  </span>
                </div>
              </div>
              
              <div className="relative h-12 flex items-center space-x-2">
                <div className="flex-1 relative">
                  <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg border border-gray-200 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 rounded-lg transition-all duration-1500 ease-out transform group-hover:scale-y-110 shadow-sm"
                      style={{ 
                        width: isAnimated ? `${data.percentage}%` : '0%',
                        transitionDelay: `${index * 200}ms`
                      }}
                    >
                      <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900 text-white text-xs rounded-lg px-2 py-1">
                      {data.available} available
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  {Array.from({ length: data.available }).slice(0, 8).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 bg-gradient-to-t from-green-400 to-emerald-500 rounded-sm transition-all duration-700 hover:shadow-lg"
                      style={{
                        height: isAnimated ? '20px' : '0px',
                        transitionDelay: `${index * 200 + i * 50}ms`
                      }}
                    ></div>
                  ))}
                  {data.available > 8 && (
                    <span className="text-xs text-gray-500 ml-1">+{data.available - 8}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Trend Chart with Toggle */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            📈 Monthly Availability Trend
          </h3>
          <div className="flex bg-gray-100 rounded-lg p-1 border">
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                chartType === 'bar' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📊 Bar
            </button>
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                chartType === 'line' 
                  ? 'bg-blue-500 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📈 Line
            </button>
          </div>
        </div>
        
        {chartType === 'bar' ? (
          <div className="h-64">
            <div className="flex items-end justify-between h-full space-x-2 px-4">
              {monthlyData.map((data, index) => {
                const maxValue = Math.max(...monthlyData.map(d => d.percentage));
                const height = (data.percentage / maxValue) * 200;
                
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center group relative">
                    <div className="relative w-full max-w-8">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-400 via-purple-500 to-pink-500 rounded-t-lg transition-all duration-1000 ease-out transform group-hover:scale-110 shadow-lg relative overflow-hidden cursor-pointer"
                        style={{ 
                          height: isAnimated ? `${height}px` : '0px',
                          minHeight: isAnimated ? '8px' : '0px',
                          transitionDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 transform skew-x-12 animate-pulse"></div>
                        
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                          {data.percentage}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-center">
                      <div className="text-xs font-medium text-gray-700 mb-1">
                        {data.month}
                      </div>
                      <div className="text-xs text-gray-500 bg-gray-50 rounded-full px-2 py-1 border">
                        {data.percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="relative h-64">
            <div className="absolute inset-0 grid grid-rows-5 grid-cols-12 gap-0">
              {Array.from({ length: 60 }).map((_, i) => (
                <div key={i} className="border-r border-b border-gray-100"></div>
              ))}
            </div>
            
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>100%</span>
              <span>80%</span>
              <span>60%</span>
              <span>40%</span>
              <span>20%</span>
              <span>0%</span>
            </div>
            
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              
              <path
                d={`M 0 ${100 - monthlyData[0].percentage} ${monthlyData.map((data, index) => 
                  `L ${(index / (monthlyData.length - 1)) * 100} ${100 - data.percentage}`
                ).join(' ')} L 100 100 L 0 100 Z`}
                fill="url(#areaGradient)"
                className="transition-all duration-2000 ease-out"
                style={{
                  opacity: isAnimated ? 1 : 0
                }}
              />
              
              <path
                d={`M 0 ${100 - monthlyData[0].percentage} ${monthlyData.map((data, index) => 
                  `L ${(index / (monthlyData.length - 1)) * 100} ${100 - data.percentage}`
                ).join(' ')}`}
                stroke="url(#lineGradient)"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-2000 ease-out"
                style={{
                  strokeDasharray: isAnimated ? 'none' : '200',
                  strokeDashoffset: isAnimated ? '0' : '200'
                }}
              />
              
              {monthlyData.map((data, index) => (
                <circle
                  key={index}
                  cx={(index / (monthlyData.length - 1)) * 100}
                  cy={100 - data.percentage}
                  r="1.5"
                  fill="#3B82F6"
                  stroke="white"
                  strokeWidth="0.5"
                  className="transition-all duration-1000 ease-out hover:r-2 cursor-pointer"
                  style={{
                    opacity: isAnimated ? 1 : 0,
                    transitionDelay: `${index * 100 + 1000}ms`
                  }}
                />
              ))}
            </svg>
            
            <div className="absolute bottom-0 left-0 w-full flex justify-between text-xs text-gray-500 -mb-6">
              {monthlyData.map((data) => (
                <span key={data.month} className="transform -rotate-45 origin-top-left">
                  {data.month}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200 shadow-sm">
            <div className="text-lg font-bold text-green-600">
              {Math.max(...monthlyData.map(d => d.percentage))}%
            </div>
            <div className="text-xs text-green-700">Best Month</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 shadow-sm">
            <div className="text-lg font-bold text-blue-600">
              {Math.round(monthlyData.reduce((acc, d) => acc + d.percentage, 0) / monthlyData.length)}%
            </div>
            <div className="text-xs text-blue-700">Average</div>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 shadow-sm">
            <div className="text-lg font-bold text-purple-600">
              {Math.min(...monthlyData.map(d => d.percentage))}%
            </div>
            <div className="text-xs text-purple-700">Lowest Month</div>
          </div>
        </div>
      </div>

      {/* Circular Progress Chart */}
      <div ref={pieChartRef} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          🎯 Availability Overview
        </h3>
        
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="url(#gradient1)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${stats.percentage * 2.83} 283`}
                strokeLinecap="round"
                className="transition-all duration-2000 ease-out"
                style={{
                  strokeDasharray: isAnimated ? `${stats.percentage * 2.83} 283` : '0 283'
                }}
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <div className="text-3xl font-bold text-indigo-600">{stats.percentage}%</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-green-200 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            <div className="text-sm text-green-700">Available</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-red-200 shadow-sm">
            <div className="text-2xl font-bold text-red-600">{stats.total - stats.available}</div>
            <div className="text-sm text-red-700">Unavailable</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-300 text-sm font-medium">
          ➕ Add Available Time
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-300 text-sm font-medium">
          📋 Bulk Edit
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-300 text-sm font-medium">
          📊 Export Schedule
        </button>
      </div>
    </div>
  );
};
