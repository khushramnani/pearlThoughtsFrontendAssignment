import React from 'react';
import { ArchiveBoxIcon, ClockIcon, UserIcon, CalendarIcon, TrophyIcon } from '@heroicons/react/24/outline';

const historyData = [
  {
    id: 1,
    date: '2024-07-11',
    time: '10:00 AM',
    student: 'Emma Davis',
    subject: 'Instrument',
    type: 'lesson',
    status: 'completed',
    duration: 60,
    notes: 'Great progress with chord transitions'
  },
  {
    id: 2,
    date: '2024-07-10',
    time: '2:00 PM',
    student: 'Sarah Johnson',
    subject: 'Vocal Contemporary',
    type: 'lesson',
    status: 'completed',
    duration: 45,
    notes: 'Excellent breath control improvement'
  },
  {
    id: 3,
    date: '2024-07-09',
    time: '11:00 AM',
    student: 'Mike Chen',
    subject: 'Vocal Core',
    type: 'lesson',
    status: 'completed',
    duration: 60,
    notes: 'Needs work on higher register'
  },
  {
    id: 4,
    date: '2024-07-08',
    time: '3:00 PM',
    student: 'James Wilson',
    subject: 'Vocal Mix',
    type: 'lesson',
    status: 'completed',
    duration: 45,
    notes: 'Rhythm practice required'
  },
  {
    id: 5,
    date: '2024-07-07',
    time: '1:00 PM',
    student: 'Alex Rodriguez',
    subject: 'Vocal Contemporary',
    type: 'assessment',
    status: 'completed',
    duration: 30,
    notes: 'Level advancement assessment - passed'
  },
  {
    id: 6,
    date: '2024-07-06',
    time: '10:30 AM',
    student: 'Sarah Johnson',
    subject: 'Vocal Contemporary',
    type: 'lesson',
    status: 'cancelled',
    duration: 0,
    notes: 'Student illness - rescheduled'
  },
  {
    id: 7,
    date: '2024-07-05',
    time: '4:00 PM',
    student: 'Lisa Brown',
    subject: 'Vocal Plus',
    type: 'recital',
    status: 'completed',
    duration: 90,
    notes: 'Final performance - outstanding'
  },
  {
    id: 8,
    date: '2024-07-04',
    time: '9:00 AM',
    student: 'Emma Davis',
    subject: 'Instrument',
    type: 'lesson',
    status: 'completed',
    duration: 60,
    notes: 'Introduction to advanced techniques'
  }
];

export const HistoryTab = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'assessment': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'recital': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚';
      case 'assessment': return '📝';
      case 'recital': return '🎭';
      default: return '📄';
    }
  };

  const totalSessions = historyData.length;
  const completedSessions = historyData.filter(h => h.status === 'completed').length;
  const totalHours = Math.round(historyData.reduce((acc, h) => acc + h.duration, 0) / 60);
  const thisWeekSessions = historyData.filter(h => new Date(h.date) >= new Date('2024-07-07')).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ArchiveBoxIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalSessions}</p>
              <p className="text-sm text-blue-700 font-medium">Total Sessions</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200 shadow-md">
          <div className="flex items-center space-x-3">
            <TrophyIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{completedSessions}</p>
              <p className="text-sm text-green-700 font-medium">Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ClockIcon className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-600">{totalHours}h</p>
              <p className="text-sm text-purple-700 font-medium">Total Hours</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-4 border-2 border-orange-200 shadow-md">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-orange-600">{thisWeekSessions}</p>
              <p className="text-sm text-orange-700 font-medium">This Week</p>
            </div>
          </div>
        </div>
      </div>

      {/* History Timeline */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ArchiveBoxIcon className="w-5 h-5 mr-2 text-blue-600" />
          📚 Teaching History Timeline
        </h3>
        
        <div className="max-h-[600px] overflow-y-auto">
          <div className="space-y-4">
            {historyData.map((session) => (
              <div key={session.id} className="relative pl-8 pb-4">
                {/* Timeline line */}
                <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"></div>
                
                {/* Timeline dot */}
                <div className="absolute left-2 top-4 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white shadow-md"></div>
                
                {/* Content */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md ml-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {session.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 flex items-center">
                          {session.student}
                          <span className="ml-2 text-lg">{getTypeIcon(session.type)}</span>
                        </p>
                        <p className="text-sm text-gray-600">{session.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getTypeColor(session.type)}`}>
                        {session.type}
                      </span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      <span>{session.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <UserIcon className="w-4 h-4" />
                      <span>{session.duration} minutes</span>
                    </div>
                  </div>
                  
                  {session.notes && (
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">📝 Notes: </span>
                        {session.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* History Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">📊 Session Types</h4>
          <div className="space-y-3">
            {['lesson', 'assessment', 'recital'].map(type => {
              const count = historyData.filter(h => h.type === type).length;
              const percentage = Math.round((count / totalSessions) * 100);
              return (
                <div key={type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getTypeIcon(type)}</span>
                    <span className="capitalize font-medium">{type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">📈 Weekly Activity</h4>
          <div className="space-y-3">
            {['2024-07-07', '2024-07-08', '2024-07-09', '2024-07-10', '2024-07-11'].map(date => {
              const count = historyData.filter(h => h.date === date).length;
              const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
              return (
                <div key={date} className="flex items-center justify-between">
                  <span className="font-medium">{dayName}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${count * 25}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{count} sessions</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-300 text-sm font-medium">
          📊 Export History
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-300 text-sm font-medium">
          📈 Generate Report
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-300 text-sm font-medium">
          🔍 Advanced Filter
        </button>
      </div>
    </div>
  );
};
