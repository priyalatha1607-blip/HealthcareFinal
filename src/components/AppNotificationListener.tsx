import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNotifications } from '../context/NotificationContext';
import { registerForPushNotificationsAsync } from '../services/notificationService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AppNotificationListener() {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Register for push notifications and get token
    registerForPushNotificationsAsync();

    // Listener for foreground notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      const { title, body } = notification.request.content;
      if (title || body) {
        // Add to our in-app notification center
        addNotification(title || 'Alert', body || '', 'info');
      }
    });

    // Listener for when user taps the notification
    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      // You can handle navigation here if needed
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return null;
}
