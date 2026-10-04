import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/components/navigation/AppNavigator';
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./src/services/notificationService";
import { AppointmentProvider } from "./src/context/AppointmentContext";
import { NotificationProvider } from "./src/context/NotificationContext";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  useEffect(() => {
    // Push notifications removed to prevent device-specific errors
  },[]);

  
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppointmentProvider>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </SafeAreaProvider>
        </AppointmentProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}
