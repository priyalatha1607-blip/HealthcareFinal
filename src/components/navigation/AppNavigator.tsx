import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import Onboarding1 from '../../screens/Onboarding1';
import Onboarding2 from '../../screens/Onboarding2';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import MainTabNavigator from './MainTabNavigator';
import ForgotPassword from '../../screens/ForgotPassword';

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
    </Stack.Navigator>
  );
}
