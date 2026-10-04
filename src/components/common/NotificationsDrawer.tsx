import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Heart, MessageCircle, UserPlus, Sparkles, Check, ArrowRight } from 'lucide-react';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationsOpen, 
    setIsNotificationsOpen, 
    notifications, 
    setCurrentTab, 
    setActivePost, 
    posts 
  } = useApp();

  if (!isNotificationsOpen) return null;

  const handleAction = (item: any) => {
    if (item.actionUrl) {
      const post = posts.find(p => p.id === item.actionUrl);
      if (post) {
        setActivePost(post);
        setIsNotificationsOpen(false);
        return;
      }
    }
    setCurrentTab('community');
    setIsNotificationsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-sm sm:max-w-md h-full bg-[#121212] border-l border-[#222222] shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#202020]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#E50914]" />
            <h3 className="text-sm font-semibold text-white font-display">
              Notifications & Alerts
            </h3>
          </div>
          <button
            onClick={() => setIsNotificationsOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((n) => {
            const iconMap: Record<string, React.ReactNode> = {
              suggestion: <Sparkles className="w-4 h-4 text-[#E50914]" />,
              like: <Heart className="w-4 h-4 text-red-500" />,
              comment: <MessageCircle className="w-4 h-4 text-blue-400" />,
              follow: <UserPlus className="w-4 h-4 text-emerald-400" />,
              follow_request: <UserPlus className="w-4 h-4 text-emerald-400" />,
              car_tag: <Sparkles className="w-4 h-4 text-[#E50914]" />,
              product_tag: <Sparkles className="w-4 h-4 text-amber-400" />,
              verification: <Check className="w-4 h-4 text-emerald-400" />,
              enquiry: <Sparkles className="w-4 h-4 text-amber-400" />,
              system: <Bell className="w-4 h-4 text-neutral-400" />,
            };
            const icon = iconMap[n.type] || <Bell className="w-4 h-4 text-neutral-400" />;

            return (
              <div
                key={n.id}
                onClick={() => handleAction(n)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  n.isRead 
                    ? 'bg-[#161616] border-[#222222] text-neutral-300 hover:border-neutral-700' 
                    : 'bg-[#1a1414] border-[#381a1a] text-white hover:border-[#E50914]/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#222222]/80 shrink-0 mt-0.5">
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <p className="text-xs font-semibold text-white truncate">{n.title}</p>
                      <span className="text-[10px] text-neutral-500 shrink-0">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                      {n.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#202020] bg-[#141414] text-center">
          <p className="text-[11px] text-neutral-500">
            Real-time automotive community alerts synced
          </p>
        </div>

      </div>
    </div>
  );
};
