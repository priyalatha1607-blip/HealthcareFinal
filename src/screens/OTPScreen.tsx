import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import CustomButton from '../components/CustomButton';
import OTPInput from '../components/OTPInput';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'OTPScreen'>;
  route: { params: { email: string } };
};

export default function OTPScreen({ navigation, route }: Props) {
  const email = route.params?.email || '';
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

  const handleVerifyOTP = () => {
    setError('');
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    if (otp.length < 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    // OTP verified, move to password step
    Keyboard.dismiss();
    navigation.navigate('ResetPasswordScreen', { email });
  };

  const handleResendOTP = () => {
    setTimeLeft(30);
    setOtp('');
    Alert.alert('Success', 'A new OTP has been sent to your email.');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Enter OTP</Text>
        <Text style={styles.subtitle}>We've sent a code to {email}</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <OTPInput
          length={6}
          value={otp}
          onChangeText={setOtp}
          autoFocus={true}
        />
        
        <View style={styles.spacer} />
        
        <CustomButton title="Verify OTP" onPress={handleVerifyOTP} />

        {timeLeft > 0 ? (
          <Text style={styles.resendText}>OTP expires in {timeLeft}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResendOTP} style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  form: {
    flex: 1,
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  spacer: {
    height: 32,
  },
  resendText: {
    marginTop: 24,
    color: COLORS.textLight,
    fontSize: 14,
  },
  resendButton: {
    marginTop: 24,
  },
  resendButtonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
