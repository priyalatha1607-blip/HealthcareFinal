import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/components/navigation/AppNavigator';
import { useEffect } from "react";
import { registerForPushNotificationsAsync } from "./src/services/notificationService";


export default function App() {
   useEffect(() => {
    setTimeout(() => {
    registerForPushNotificationsAsync();
  }, 5000)
},[]);

  
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
