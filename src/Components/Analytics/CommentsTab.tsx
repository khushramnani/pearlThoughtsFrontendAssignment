import React from 'react';
import { ChatBubbleLeftRightIcon, StarIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';

const commentsData = [
  {
    id: 1,
    studentName: 'Sarah Johnson',
    subject: 'Vocal Contemporary',
    comment: 'Amazing progress in vocal techniques! Sarah has shown remarkable improvement in breath control and pitch accuracy.',
    rating: 5,
    date: '2024-07-10',
    type: 'progress',
    sentiment: 'positive'
  },
  {
    id: 2,
    studentName: 'Mike Chen',
    subject: 'Vocal Core',
    comment: 'Good effort, but needs more practice with higher notes. Recommend additional vocal exercises.',
    rating: 4,
    date: '2024-07-09',
    type: 'feedback',
    sentiment: 'neutral'
  },
  {
    id: 3,
    studentName: 'Emma Davis',
    subject: 'Instrument',
    comment: 'Excellent dedication! Emma practices regularly and it shows in her performance.',
    rating: 5,
    date: '2024-07-11',
    type: 'praise',
    sentiment: 'positive'
  },
  {
    id: 4,
    studentName: 'James Wilson',
    subject: 'Vocal Mix',
    comment: 'Struggling with rhythm patterns. Need to focus on metronome practice.',
    rating: 3,
    date: '2024-07-08',
    type: 'concern',
    sentiment: 'negative'
  },
  {
    id: 5,
    studentName: 'Lisa Brown',
    subject: 'Vocal Plus',
    comment: 'Outstanding performance! Ready for advanced level challenges.',
    rating: 5,
    date: '2024-07-05',
    type: 'achievement',
    sentiment: 'positive'
  },
  {
    id: 6,
    studentName: 'Alex Rodriguez',
    subject: 'Vocal Contemporary',
    comment: 'Great improvement in stage presence and confidence.',
    rating: 4,
    date: '2024-07-07',
    type: 'progress',
    sentiment: 'positive'
  }
];

export const CommentsTab = () => {
  const getCommentTypeColor = (type: string) => {
    switch (type) {
      case 'progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'praise': return 'bg-green-100 text-green-800 border-green-200';
      case 'achievement': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'feedback': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'concern': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return '😊';
      case 'neutral': return '😐';
      case 'negative': return '😟';
      default: return '😐';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'neutral': return 'text-yellow-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const totalComments = commentsData.length;
  const positiveComments = commentsData.filter(c => c.sentiment === 'positive').length;
  const averageRating = (commentsData.reduce((acc, c) => acc + c.rating, 0) / totalComments).toFixed(1);
  const recentComments = commentsData.filter(c => new Date(c.date) >= new Date('2024-07-08')).length;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 border-2 border-blue-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-blue-600">{totalComments}</p>
              <p className="text-sm text-blue-700 font-medium">Total Comments</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-4 border-2 border-green-200 shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full text-white font-bold">😊</div>
            <div>
              <p className="text-2xl font-bold text-green-600">{positiveComments}</p>
              <p className="text-sm text-green-700 font-medium">Positive</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 border-2 border-yellow-200 shadow-md">
          <div className="flex items-center space-x-3">
            <StarIcon className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-600">{averageRating}</p>
              <p className="text-sm text-yellow-700 font-medium">Avg Rating</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4 border-2 border-purple-200 shadow-md">
          <div className="flex items-center space-x-3">
            <ClockIcon className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-purple-600">{recentComments}</p>
              <p className="text-sm text-purple-700 font-medium">Recent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Feed */}
      <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2 text-blue-600" />
          💬 Student Comments & Feedback
        </h3>
        
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {commentsData.map((comment) => (
            <div key={comment.id} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {comment.studentName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{comment.studentName}</p>
                    <p className="text-sm text-gray-600">{comment.subject}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-2xl ${getSentimentColor(comment.sentiment)}`}>
                    {getSentimentEmoji(comment.sentiment)}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getCommentTypeColor(comment.type)}`}>
                    {comment.type}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-3 leading-relaxed">{comment.comment}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < comment.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({comment.rating}/5)</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4" />
                  <span>{comment.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">📊 Comment Types</h4>
          <div className="space-y-3">
            {['progress', 'praise', 'achievement', 'feedback', 'concern'].map(type => {
              const count = commentsData.filter(c => c.type === type).length;
              const percentage = Math.round((count / totalComments) * 100);
              return (
                <div key={type} className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getCommentTypeColor(type)}`}>
                    {type}
                  </span>
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
          <h4 className="text-lg font-semibold text-gray-900 mb-3">😊 Sentiment Analysis</h4>
          <div className="space-y-3">
            {['positive', 'neutral', 'negative'].map(sentiment => {
              const count = commentsData.filter(c => c.sentiment === sentiment).length;
              const percentage = Math.round((count / totalComments) * 100);
              return (
                <div key={sentiment} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`text-xl ${getSentimentColor(sentiment)}`}>
                      {getSentimentEmoji(sentiment)}
                    </span>
                    <span className="capitalize font-medium">{sentiment}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${
                        sentiment === 'positive' ? 'bg-green-500' :
                        sentiment === 'neutral' ? 'bg-yellow-500' : 'bg-red-500'
                      }`} style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600">{percentage}%</span>
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
          ➕ Add Comment
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-green-300 text-sm font-medium">
          📊 Generate Report
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-purple-300 text-sm font-medium">
          📧 Send Summary
        </button>
      </div>
    </div>
  );
};
