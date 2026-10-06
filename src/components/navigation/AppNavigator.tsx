import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Onboarding1 from '../../screens/Onboarding1';
import Onboarding2 from '../../screens/Onboarding2';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import MainTabNavigator from './MainTabNavigator';
import ForgotPassword from '../../screens/ForgotPassword';
import OTPScreen from '../../screens/OTPScreen';
import ResetPasswordScreen from '../../screens/ResetPasswordScreen';
import BookAppointmentScreen from '../../screens/BookAppointmentScreen';

import NotificationsScreen from '../../screens/NotificationsScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import HelpSupportScreen from '../../screens/HelpSupportScreen';
import EditProfileScreen from '../../screens/EditProfileScreen';
import HealthDetailsScreen from '../../screens/HealthDetailsScreen';
import DoctorProfileScreen from '../../screens/DoctorProfileScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';
import TermsOfUseScreen from '../../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import HealthConsentScreen from '../../screens/HealthConsentScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';

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
      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
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
      <Stack.Screen name="HealthDetails" component={HealthDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HealthConsent" component={HealthConsentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
