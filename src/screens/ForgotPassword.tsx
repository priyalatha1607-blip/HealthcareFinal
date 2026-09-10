import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ResetPasswordModal from '../components/ResetPasswordModal';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

export default function ForgotPassword({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState<'email' | 'otp' | 'password'>('email');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [modalReady, setModalReady] = useState(false);

  useEffect(() => {
    if (step === 'otp' && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [step, timeLeft]);

  const handleReset = () => {
    setError('');
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    // Show popup for entering OTP
    Keyboard.dismiss();
    setStep('otp');
    setTimeLeft(30);
    setOtp('');
    setModalReady(false);
    setModalVisible(true);
  };

  const handleResendOTP = () => {
    setTimeLeft(30);
    setOtp('');
    Alert.alert('Success', 'A new OTP has been sent to your email.');
  };

  const handleVerifyOTP = () => {
    setError('');
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }
    // OTP verified, move to password step
    setStep('password');
  };

  const handleUpdatePassword = () => {
    setError('');
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError('Password must contain at least 8 characters, one uppercase, one number and one special character');
      return;
    }
    Alert.alert(
      'Updated',
      'Your password has been updated successfully.',
      [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            navigation.replace('SignIn');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color={COLORS.text} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Enter your email to receive OTP</Text>
      </View>

      <View style={styles.form}>
        {error && step === 'email' ? <Text style={styles.errorText}>{error}</Text> : null}
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomButton title="Send OTP" onPress={handleReset} />

        <ResetPasswordModal
          visible={modalVisible}
          step={step === 'email' ? 'otp' : step}
          error={error}
          otp={otp}
          setOtp={setOtp}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          timeLeft={timeLeft}
          modalReady={modalReady}
          onVerifyOTP={handleVerifyOTP}
          onUpdatePassword={handleUpdatePassword}
          onResendOTP={handleResendOTP}
          onCancel={() => {
            setModalVisible(false);
            setModalReady(false);
          }}
          onShow={() => setModalReady(true)}
        />
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
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  header: {
    marginBottom: 40,
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
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    fontSize: 14,
    textAlign: 'center',
  },
});
