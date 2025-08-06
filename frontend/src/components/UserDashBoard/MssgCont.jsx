import React, { useState, useEffect } from 'react';
import { MessageSquare, SendHorizonal, Trash2, User } from "lucide-react";

const MssgCont = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'host',
        text: 'Hi there! Is the room still available?',
        timestamp: '2025-08-06 09:30',
      },
      {
        id: 2,
        sender: 'guest',
        text: 'Yes, it is. Let me know if you want to book.',
        timestamp: '2025-08-06 09:32',
      },
    ]);
  }, []);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg = {
      id: Date.now(),
      sender: 'host',
      text: inputText.trim(),
      timestamp: new Date().toLocaleString(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  const handleDelete = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 py-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-3xl font-bold text-white">Messages</h2>
            <MessageSquare size={28} className="text-purple-400" />
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-4 max-h-[400px] sm:max-h-[450px] overflow-y-auto scrollbar-thin pr-1">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'guest' ? 'justify-start' : 'justify-end'}`}>
                <div className={`
                  w-full max-w-[80%] sm:max-w-[70%] px-4 py-3 rounded-2xl shadow-md relative
                  ${msg.sender === 'guest' ? 'bg-purple-600/30 text-white' : 'bg-emerald-500/30 text-white'}
                `}>
                  <div className="flex items-center space-x-2 mb-1">
                    <User size={14} />
                    <span className="text-sm font-semibold capitalize">{msg.sender}</span>
                  </div>
                  <p className="text-sm break-words">{msg.text}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-300">{msg.timestamp}</span>
                    <button onClick={() => handleDelete(msg.id)} className="text-red-400 hover:text-red-300">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="mt-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder-gray-400 focus:outline-none border border-white/20 focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                onClick={handleSend}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-3 rounded-xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center"
              >
                <SendHorizonal size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MssgCont;
