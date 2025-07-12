import React from 'react';
import { UserGroupIcon, TrophyIcon, ChartBarIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const studentsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    subject: 'Vocal Contemporary',
    level: 'Advanced',
    progress: 85,
    lessons: 24,
    status: 'active',
    lastLesson: '2024-07-10',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Mike Chen',
    subject: 'Vocal Core',
    level: 'Intermediate',
    progress: 72,
    lessons: 18,
    status: 'active',
    lastLesson: '2024-07-09',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Emma Davis',
    subject: 'Instrument',
    level: 'Beginner',
    progress: 45,
    lessons: 12,
    status: 'active',
    lastLesson: '2024-07-11',
    rating: 4.9
  },
  {
    id: 4,
    name: 'James Wilson',
    subject: 'Vocal Mix',
    level: 'Advanced',
    progress: 90,
    lessons: 32,
    status: 'active',
    lastLesson: '2024-07-08',
    rating: 4.7
  },
  {
    id: 5,
    name: 'Lisa Brown',
    subject: 'Vocal Plus',
    level: 'Expert',
    progress: 95,
    lessons: 45,
    status: 'completed',
    lastLesson: '2024-07-05',
    rating: 5.0
  }
];

export const StudentsTab = () => {
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Expert': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const totalStudents = studentsData.length;
  const activeStudents = studentsData.filter(s => s.status === 'active').length;
  const averageProgress = Math.round(studentsData.reduce((acc, s) => acc + s.progress, 0) / totalStudents);
  const totalLessons = studentsData.reduce((acc, s) => acc + s.lessons, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-200 shadow-md">
          <div className="flex items-center space-x-3">
            <UserGroupIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalStudents}</p>
              <p className="text-sm text-blue-700 font-medium">Total Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200 shadow-md">
          <div className="flex items-center space-x-3">
            <AcademicCapIcon className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold text-green-600">{activeStudents}</p>
              <p className="text-sm text-green-700 font-medium">Active Students</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ChartBarIcon className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-600">{averageProgress}%</p>
              <p className="text-sm text-purple-700 font-medium">Avg Progress</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl p-4 border-2 border-orange-200 shadow-md">
          <div className="flex items-center space-x-3">
            <TrophyIcon className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold text-orange-600">{totalLessons}</p>
              <p className="text-sm text-orange-700 font-medium">Total Lessons</p>
            </div>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4 overflow-x-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2 text-blue-600" />
          👥 Student Management Dashboard
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                <th className="border-2 border-gray-300 p-3 text-left font-semibold text-gray-700">Student</th>
                <th className="border-2 border-gray-300 p-3 text-left font-semibold text-gray-700">Subject</th>
                <th className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">Level</th>
                <th className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">Progress</th>
                <th className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">Lessons</th>
                <th className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">Status</th>
                <th className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">Rating</th>
                <th className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border-2 border-gray-300 p-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{student.name}</p>
                        <p className="text-xs text-gray-500">Last: {student.lastLesson}</p>
                      </div>
                    </div>
                  </td>
                  <td className="border-2 border-gray-300 p-3 text-gray-700 font-medium">{student.subject}</td>
                  <td className="border-2 border-gray-300 p-3 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getLevelColor(student.level)}`}>
                      {student.level}
                    </span>
                  </td>
                  <td className="border-2 border-gray-300 p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(student.progress)}`}
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{student.progress}%</span>
                    </div>
                  </td>
                  <td className="border-2 border-gray-300 p-3 text-center font-semibold text-gray-700">{student.lessons}</td>
                  <td className="border-2 border-gray-300 p-3 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getStatusColor(student.status)}`}>
                      {student.status === 'active' ? '✅ Active' : '⏸️ Completed'}
                    </span>
                  </td>
                  <td className="border-2 border-gray-300 p-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-semibold text-gray-700">{student.rating}</span>
                    </div>
                  </td>
                  <td className="border-2 border-gray-300 p-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        📝 View
                      </button>
                      <button className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        📞 Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-blue-300 text-sm font-medium">
          ➕ Add New Student
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-300 text-sm font-medium">
          📊 Progress Report
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-300 text-sm font-medium">
          📋 Export List
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-orange-300 text-sm font-medium">
          📧 Send Notifications
        </button>
      </div>
    </div>
  );
};
