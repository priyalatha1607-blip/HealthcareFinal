import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'booking' | 'cancellation' | 'info';
}

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  addNotification: (title: string, message: string, type: NotificationItem['type']) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const newNotification: NotificationItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      type,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
