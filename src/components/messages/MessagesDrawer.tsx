import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, MessageSquare, Wrench, ShieldCheck, ArrowLeft } from 'lucide-react';

export const MessagesDrawer: React.FC = () => {
  const { 
    isMessagesOpen, 
    setIsMessagesOpen, 
    messages, 
    activeMessageThread, 
    setActiveMessageThread, 
    sendMessage,
    currentUser 
  } = useApp();

  const [replyText, setReplyText] = useState('');

  if (!isMessagesOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMessageThread) return;
    sendMessage(activeMessageThread.id, replyText);
    setReplyText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm sm:max-w-md h-full bg-[#121212] border-l border-[#222222] shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#202020]">
          <div className="flex items-center gap-2">
            {activeMessageThread ? (
              <button
                onClick={() => setActiveMessageThread(null)}
                className="p-1 -ml-1 text-neutral-400 hover:text-white mr-1"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <MessageSquare className="w-4 h-4 text-[#E50914]" />
            )}
            <h3 className="text-sm font-semibold text-white font-display">
              {activeMessageThread ? activeMessageThread.participantName : 'Direct Automotive Messages'}
            </h3>
          </div>
          <button
            onClick={() => {
              setIsMessagesOpen(false);
              setActiveMessageThread(null);
            }}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* View: Thread List or Active Chat */}
        {!activeMessageThread ? (
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 text-xs">
                No active conversations. Enquire with any workshop or message a builder!
              </div>
            ) : (
              messages.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => setActiveMessageThread(thread)}
                  className="p-3 rounded-xl bg-[#161616] hover:bg-[#1a1a1a] border border-[#222222] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={thread.participantAvatar}
                      alt={thread.participantName}
                      className="w-10 h-10 rounded-full object-cover border border-[#2a2a2a]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white truncate">
                          {thread.participantName}
                        </span>
                        <span className="text-[10px] text-neutral-500">
                          {thread.lastTimestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                        {thread.lastMessage}
                      </p>
                      {thread.contextCar && (
                        <span className="inline-block mt-1 text-[9px] font-mono text-neutral-400 bg-neutral-900 px-1.5 py-0.5 rounded">
                          Build: {thread.contextCar}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            
            {/* Context Header */}
            {(activeMessageThread.contextProduct || activeMessageThread.contextCar) && (
              <div className="px-4 py-2 bg-[#171717] border-b border-[#242424] text-[11px] text-neutral-400 flex items-center justify-between">
                <span>Subject: {activeMessageThread.contextProduct || activeMessageThread.contextCar}</span>
                <span className="text-[10px] text-[#E50914] font-medium">Fitment Inquiry</span>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {activeMessageThread.messages.map((m) => {
                const isMe = m.senderId === currentUser.id;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isMe
                          ? 'bg-[#E50914] text-white rounded-br-xs'
                          : 'bg-[#1f1f1f] text-neutral-200 border border-[#2a2a2a] rounded-bl-xs'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[9px] text-neutral-500 mt-1 px-1">
                      {m.timestamp}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#202020] bg-[#141414] flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Ask about fitment, parts, installation..."
                className="flex-1 bg-[#1c1c1c] border border-[#2b2b2b] rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#E50914]"
              />
              <button
                type="submit"
                disabled={!replyText.trim()}
                className="p-2.5 rounded-xl bg-[#E50914] text-white disabled:opacity-40 hover:bg-[#c90812] transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
};
