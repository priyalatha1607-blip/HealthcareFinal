import os

# 1. Update NotificationContext.tsx for AsyncStorage
ctx_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\context\NotificationContext.tsx'
with open(ctx_path, 'r', encoding='utf-8') as f:
    ctx_content = f.read()

import_stmt = '''import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';\n'''

ctx_content = ctx_content.replace(
'''import React, { createContext, useState, useContext, ReactNode } from 'react';''',
import_stmt)

new_provider_logic = '''
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const stored = await AsyncStorage.getItem('notifications');
        if (stored) {
          setNotifications(JSON.parse(stored));
        }
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

  const markAllAsRead = () => {
    const updated = notifications.map((notif) => ({ ...notif, isRead: true }));
    saveNotifications(updated);
  };
'''

ctx_content = ctx_content.replace(
'''export const NotificationProvider = ({ children }: { children: ReactNode }) => {
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
  };''',
new_provider_logic)

with open(ctx_path, 'w', encoding='utf-8') as f:
    f.write(ctx_content)


# 2. Update NotificationsScreen.tsx to mark as read on blur
scr_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\NotificationsScreen.tsx'
with open(scr_path, 'r', encoding='utf-8') as f:
    scr_content = f.read()

scr_content = scr_content.replace(
'''  useEffect(() => {
    // Mark notifications as read when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      markAllAsRead();
    });
    return unsubscribe;
  }, [navigation, markAllAsRead]);''',
'''  useEffect(() => {
    // Mark notifications as read when the user LEAVES the screen, 
    // so they can see which ones were unread while they are viewing it.
    const unsubscribe = navigation.addListener('blur', () => {
      markAllAsRead();
    });
    return unsubscribe;
  }, [navigation, markAllAsRead]);''')

with open(scr_path, 'w', encoding='utf-8') as f:
    f.write(scr_content)

