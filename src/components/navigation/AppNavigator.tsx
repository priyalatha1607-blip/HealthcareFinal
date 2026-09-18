import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Onboarding1 from '../../screens/Onboarding1';
import Onboarding2 from '../../screens/Onboarding2';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import MainTabNavigator from './MainTabNavigator';
import ForgotPassword from '../../screens/ForgotPassword';
import BookAppointmentScreen from '../../screens/BookAppointmentScreen';

import NotificationsScreen from '../../screens/NotificationsScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import HelpSupportScreen from '../../screens/HelpSupportScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={Onboarding1} />
      <Stack.Screen name="Onboarding2" component={Onboarding2} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
      
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MedicalRecords" component={require('../../screens/MedicalRecordsScreen').default} options={{ headerShown: false }} />
      <Stack.Screen name="Nearby" component={require('../../screens/NearbyScreen').default} options={{ headerShown: false }} />
      <Stack.Screen name="ConsultDoctor" component={require('../../screens/ConsultDoctorScreen').default} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
