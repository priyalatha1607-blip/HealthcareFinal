import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);


export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const stored = await AsyncStorage.getItem('notifications');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.length > 0) {
            setNotifications(parsed);
            return;
          }
        }
        
        // If empty or nothing stored, set 4 dummy notifications and save
        const dummyNotifications: NotificationItem[] = [
          { id: 'd1', title: 'Welcome!', message: 'Welcome to the Healthcare app. Book your first appointment today.', timestamp: new Date().toISOString(), isRead: false, type: 'info' },
          { id: 'd2', title: 'System Update', message: 'We have updated our terms and privacy policy. Please review them.', timestamp: new Date(Date.now() - 86400000).toISOString(), isRead: false, type: 'info' },
          { id: 'd3', title: 'Reminder', message: 'Drink plenty of water and stay hydrated.', timestamp: new Date(Date.now() - 172800000).toISOString(), isRead: false, type: 'info' },
          { id: 'd4', title: 'Health Tip', message: 'A 30-minute walk every day keeps you healthy.', timestamp: new Date(Date.now() - 259200000).toISOString(), isRead: false, type: 'info' },
        ];
        saveNotifications(dummyNotifications);

      } catch (error) {
        console.error("Failed to load notifications", error);
      }
    };
    loadNotifications();
  }, []);

  const saveNotifications = async (newNotifications: NotificationItem[]) => {
    setNotifications(newNotifications);
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(newNotifications));
    } catch (error) {
      console.error("Failed to save notifications", error);
    }
  };

  const addNotification = (title: string, message: string, type: NotificationItem['type']) => {
    const newNotification: NotificationItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
      type,
    };
    saveNotifications([newNotification, ...notifications]);
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((notif) => 
      notif.id === id ? { ...notif, isRead: true } : notif
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((notif) => ({ ...notif, isRead: true }));
    saveNotifications(updated);
  };


  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAsRead, markAllAsRead }}>
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
