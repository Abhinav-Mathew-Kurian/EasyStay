import React from 'react';
import { MessageSquare, MapPin } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const dummyChats = [
  {
    id: 1,
    name: 'Rahul',
    city: 'Delhi',
    lastMessage: 'Is the room still available?',
    timestamp: '9:30 AM',
    unread: true,
    avatar: 'https://i.pravatar.cc/40?img=1',
  },
  {
    id: 2,
    name: 'Aisha',
    city: 'Mumbai',
    lastMessage: 'Can I come for a visit tomorrow?',
    timestamp: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/40?img=2',
  },
  {
    id: 3,
    name: 'John',
    city: 'Bangalore',
    lastMessage: 'Thanks for the quick reply!',
    timestamp: '2 days ago',
    unread: false,
    avatar: 'https://i.pravatar.cc/40?img=3',
  },
];

const Messages = () => {
  const navigate = useNavigate();

  const handleChatClick = (chatId) => {
    navigate(`/2/dashboard/messages/msg-id`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-6 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Your Chats</h1>
          <MessageSquare size={28} className="text-purple-400" />
        </div>

        {/* Chat List */}
        <div className="flex flex-col gap-4">
          {dummyChats.map(chat => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className="flex items-center gap-4 bg-white/5 hover:bg-white/10 cursor-pointer rounded-xl px-4 py-3 transition-all duration-200"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-10 h-10 rounded-full border border-white/20"
              />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin size={12} className="text-emerald-400" />
                  <span className="text-sm text-gray-300">{chat.city}</span>
                </div>
                <p className="text-gray-300 text-sm truncate mt-1">{chat.lastMessage}</p>
              </div>
              {chat.unread && (
                <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messages;
