import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaCheck } from "react-icons/fa";
import { FaFeatherAlt } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "@/lib/api/notification";
import type { AppNotification } from "@/types/notification";

const timeAgo = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await getNotifications();
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    } catch {
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkRead = async (notification: AppNotification) => {
    if (notification.read) return;
    try {
      await markNotificationRead(notification.notification_id);
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_id === notification.notification_id ? { ...n, read: true } : n
        )
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch {
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch {
    }
  };

  return (
    <div ref={panelRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 text-white/40 hover:text-white/70 transition-colors rounded-xl hover:bg-white/5"
      >
        <FaBell size={16} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-400 rounded-full text-[9px] font-bold text-[#0C0C0C] flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-[#111111] border border-white/8 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/6">
            <h3 className="text-white text-sm font-bold">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-white/30 hover:text-amber-400 text-xs transition-colors flex items-center gap-1"
                >
                  <FaCheck size={9} /> Mark all read
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="text-white/30 hover:text-white/60 transition-colors p-0.5"
              >
                <FaXmark size={13} />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 gap-3">
                <FaBell size={24} className="text-white/10" />
                <p className="text-white/25 text-xs">No notifications yet</p>
                <p className="text-white/15 text-xs">Follow writers to get notified of new articles</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.notification_id}
                  className={`relative px-4 py-3 border-b border-white/4 hover:bg-white/4 transition-colors ${
                    !n.read ? "bg-amber-400/4" : ""
                  }`}
                >
                  {!n.read && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-amber-400" />
                  )}
                  <div className="pl-2">
                    {n.article_slug ? (
                      <Link
                        to={`/articles/${n.article_slug}`}
                        onClick={() => {
                          handleMarkRead(n);
                          setOpen(false);
                        }}
                        className="block"
                      >
                        <NotificationItem notification={n} />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleMarkRead(n)}
                        className="w-full text-left"
                      >
                        <NotificationItem notification={n} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const NotificationItem = ({ notification }: { notification: AppNotification }) => (
  <>
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-xl bg-amber-400/10 flex items-center justify-center shrink-0 mt-0.5">
        <FaFeatherAlt size={11} className="text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/70 text-xs font-semibold leading-snug">{notification.title}</p>
        <p className="text-white/35 text-xs mt-0.5 line-clamp-2 leading-snug">{notification.body}</p>
        <p className="text-white/20 text-[10px] mt-1">{timeAgo(notification.createdAt)}</p>
      </div>
    </div>
  </>
);
