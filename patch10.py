# 1. Create AppNotificationListener.tsx
listener_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\AppNotificationListener.tsx'
listener_code = '''import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNotifications } from '../context/NotificationContext';
import { registerForPushNotificationsAsync } from '../services/notificationService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
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
  }, [addNotification]);

  return null;
}
'''
with open(listener_path, 'w', encoding='utf-8') as f:
    f.write(listener_code)

# 2. Update App.tsx
app_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\App.tsx'
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

# Add import
import_stmt = '''import AppNotificationListener from './src/components/AppNotificationListener';\n'''
app_content = app_content.replace(
'''import { AuthProvider } from "./src/context/AuthContext";''',
'''import { AuthProvider } from "./src/context/AuthContext";
import AppNotificationListener from "./src/components/AppNotificationListener";''')

# Add component
app_content = app_content.replace(
'''            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>''',
'''            <NavigationContainer>
              <AppNotificationListener />
              <AppNavigator />
            </NavigationContainer>''')

# Remove the old useEffect if it exists
import re
app_content = re.sub(r'''  useEffect\(\(\) => \{\n    // Push notifications removed to prevent device-specific errors\n  \},\[\]\);\n\n  ''', '', app_content)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)
