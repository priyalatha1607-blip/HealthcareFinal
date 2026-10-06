import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/components/navigation/AppNavigator';
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./src/services/notificationService";
import { AppointmentProvider } from "./src/context/AppointmentContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import { AuthProvider } from "./src/context/AuthContext";
import AppNotificationListener from "./src/components/AppNotificationListener";

export default function App() {

  return (
    <AuthProvider>
      <NotificationProvider>
        <AppointmentProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNotificationListener />
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </AppointmentProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
