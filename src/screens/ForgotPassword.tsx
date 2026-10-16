import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, Keyboard } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
};

export default function ForgotPassword({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

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
    
    // Navigate to OTP Screen
    Keyboard.dismiss();
    navigation.navigate('OTPScreen', { email });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={28} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Reset Password</Text>
        </View>
        <Text style={styles.subtitle}>Enter your email to receive OTP</Text>
      </View>

      <View style={styles.form}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <CustomButton title="Send OTP" onPress={handleReset} />
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
    marginRight: 12,
  },
  header: {
    marginTop: 80,
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginLeft: 40,
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
