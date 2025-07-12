import React from 'react';
import { XCircleIcon, ClockIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
];

const unavailabilityData = {
  'Monday': [
    { time: '8:00 AM', reason: 'Personal Appointment' },
    { time: '11:00 AM', reason: 'Meeting' },
    { time: '1:00 PM', reason: 'Lunch Break' },
    { time: '5:00 PM', reason: 'Training Session' }
  ],
  'Tuesday': [
    { time: '10:00 AM', reason: 'Doctor Appointment' },
    { time: '12:00 PM', reason: 'Lunch Break' },
    { time: '4:00 PM', reason: 'Staff Meeting' }
  ],
  'Wednesday': [
    { time: '8:00 AM', reason: 'Early Morning Break' },
    { time: '1:00 PM', reason: 'Lunch Break' },
    { time: '3:00 PM', reason: 'Professional Development' },
    { time: '6:00 PM', reason: 'Personal Time' }
  ],
  'Thursday': [
    { time: '8:00 AM', reason: 'Morning Prep' },
    { time: '12:00 PM', reason: 'Lunch Break' },
    { time: '1:00 PM', reason: 'Admin Work' }
  ],
  'Friday': [
    { time: '10:00 AM', reason: 'Weekly Planning' },
    { time: '11:00 AM', reason: 'Team Meeting' },
    { time: '12:00 PM', reason: 'Lunch Break' },
    { time: '4:00 PM', reason: 'Week Wrap-up' },
    { time: '5:00 PM', reason: 'Personal Time' }
  ],
  'Saturday': [
    { time: '8:00 AM', reason: 'Weekend Break' },
    { time: '9:00 AM', reason: 'Family Time' },
    { time: '2:00 PM', reason: 'Personal Appointment' },
    { time: '5:00 PM', reason: 'Recreation' }
  ],
  'Sunday': [
    { time: '8:00 AM', reason: 'Rest Day' },
    { time: '9:00 AM', reason: 'Rest Day' },
    { time: '10:00 AM', reason: 'Rest Day' },
    { time: '11:00 AM', reason: 'Rest Day' },
    { time: '12:00 PM', reason: 'Rest Day' },
    { time: '1:00 PM', reason: 'Rest Day' },
    { time: '5:00 PM', reason: 'Sunday Evening' }
  ]
};

export const UnavailabilityTab = () => {
  const getUnavailabilityInfo = (day: string, time: string) => {
    const dayData = unavailabilityData[day as keyof typeof unavailabilityData];
    return dayData?.find(slot => slot.time === time);
  };

  const getUnavailabilityStats = () => {
    const totalSlots = days.length * timeSlots.length;
    const unavailableSlots = Object.values(unavailabilityData).reduce((acc, daySlots) => acc + daySlots.length, 0);
    const percentage = Math.round((unavailableSlots / totalSlots) * 100);
    return { total: totalSlots, unavailable: unavailableSlots, percentage };
  };

  const stats = getUnavailabilityStats();

  const getReasonColor = (reason: string) => {
    if (reason.includes('Lunch') || reason.includes('Break')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (reason.includes('Meeting') || reason.includes('Admin')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (reason.includes('Personal') || reason.includes('Family')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (reason.includes('Rest') || reason.includes('Weekend')) return 'bg-gray-100 text-gray-800 border-gray-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-4 border-2 border-red-200 shadow-md">
          <div className="flex items-center space-x-3">
            <XCircleIcon className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-600">{stats.unavailable}</p>
              <p className="text-sm text-red-700 font-medium">Unavailable Slots</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-4 border-2 border-orange-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ExclamationTriangleIcon className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.percentage}%</p>
              <p className="text-sm text-orange-700 font-medium">Unavailability Rate</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ClockIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.total - stats.unavailable}</p>
              <p className="text-sm text-green-700 font-medium">Available Slots</p>
            </div>
          </div>
        </div>
      </div>

      {/* Unavailability Grid */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <XCircleIcon className="w-5 h-5 mr-2 text-red-600" />
          🚫 Weekly Unavailability Schedule
        </h3>
        
        <div className="min-w-[800px]">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-2 border-gray-300 p-3 bg-gradient-to-r from-gray-100 to-gray-200 text-left font-semibold text-gray-700">
                  ⏰ Time
                </th>
                {days.map((day) => (
                  <th key={day} className="border-2 border-gray-300 p-3 bg-gradient-to-r from-red-100 to-pink-100 text-center font-semibold text-gray-700">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time, timeIndex) => (
                <tr key={time} className={timeIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border-2 border-gray-300 p-3 font-medium text-gray-600 bg-gray-100">
                    {time}
                  </td>
                  {days.map((day) => {
                    const unavailableInfo = getUnavailabilityInfo(day, time);
                    return (
                      <td key={`${day}-${time}`} className="border-2 border-gray-300 p-1 text-center">
                        {unavailableInfo ? (
                          <div className={`text-xs font-medium py-2 px-2 rounded-lg shadow-sm border-2 ${getReasonColor(unavailableInfo.reason)}`}>
                            <div className="font-semibold">❌ Unavailable</div>
                            <div className="text-xs mt-1 opacity-90">{unavailableInfo.reason}</div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 text-xs py-2 px-2 rounded-lg border border-green-200">
                            ✅ Available
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reason Legend */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          📋 Unavailability Reasons
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-orange-200 rounded border border-orange-300"></div>
            <span className="text-sm text-gray-700">Breaks & Lunch</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-200 rounded border border-blue-300"></div>
            <span className="text-sm text-gray-700">Meetings & Admin</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-200 rounded border border-purple-300"></div>
            <span className="text-sm text-gray-700">Personal Time</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded border border-gray-300"></div>
            <span className="text-sm text-gray-700">Rest Days</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-red-300 text-sm font-medium">
          ➕ Add Unavailable Time
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-orange-300 text-sm font-medium">
          ✏️ Edit Reasons
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-300 text-sm font-medium">
          📊 Export Report
        </button>
      </div>
    </div>
  );
};
