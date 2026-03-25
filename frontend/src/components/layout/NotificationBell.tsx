"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bell, RotateCcw, Clock, Flame, Trophy } from "lucide-react";
import { useState } from "react";
import { notifications } from "@/lib/mock-data";

const typeIcons = {
  spaced_review: RotateCcw,
  daily_reminder: Clock,
  streak_warning: Flame,
  milestone: Trophy,
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const unreadCount = items.filter((n) => !n.read).length;

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setItems(items.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-surface-100 transition-colors text-ink-500"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-rose-500 text-ink-50 text-[10px] font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute right-0 top-full mt-2 w-80 bg-surface-100 rounded-xl shadow-elevated border border-surface-200 z-40 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-surface-200">
                <h3 className="font-display font-semibold text-ink-900">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-brand-500 hover:text-brand-500 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {items.map((notif) => {
                  const Icon = typeIcons[notif.type] || Bell;
                  return (
                    <button
                      key={notif.id}
                      onClick={() => markRead(notif.id)}
                      className={`w-full text-left p-4 flex gap-3 hover:bg-surface-100 transition-colors border-b border-surface-200 ${
                        !notif.read ? "bg-brand-100/50" : ""
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        !notif.read ? "bg-brand-50 text-brand-600" : "bg-surface-100 text-ink-500"
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!notif.read ? "font-semibold text-ink-900" : "font-medium text-ink-800"}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-ink-500 mt-0.5 line-clamp-2">{notif.body}</p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0 mt-1.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
