import React from 'react';
import { ScheduleTable } from '../ScheduleTable';

export const ScheduleTab = () => {
  return (
    <div className="space-y-6">
      {/* Enhanced Schedule View */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
          📅 Schedule Management
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Manage your daily schedule, track lessons, and monitor student attendance.
        </p>
      </div>

      {/* Include the existing ScheduleTable component */}
      <div className="bg-transparent">
        <ScheduleTable />
      </div>
    </div>
  );
};
