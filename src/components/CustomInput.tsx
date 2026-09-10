import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

interface CustomInputProps extends TextInputProps {
  label: string;
  isPassword?: boolean;
  required?: boolean;
}

export default function CustomInput({ label, isPassword = false, required = false, ...props }: CustomInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  // Safely get the length of the string value, defaulting to 0
  const valueLength = typeof props.value === 'string' ? props.value.length : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.requiredAsterisk}>*</Text>}
      </Text>
      
      {isPassword ? (
        <View style={styles.passwordContainer}>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={!showPassword}
              placeholderTextColor={COLORS.gray}
              autoCapitalize="none"
              autoCorrect={false}
              {...props}
            />
          </View>
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={20} 
              color={COLORS.textLight} 
            />
          </TouchableOpacity>
        </View>
      ) : (
        <TextInput
          style={styles.input}
          placeholderTextColor={COLORS.gray}
          {...props}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  requiredAsterisk: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    borderRadius: 12,
  },
  passwordInputWrapper: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  passwordInput: {
    padding: 16,
    fontSize: 16,
    color: COLORS.text,
  },
  maskedTextContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  maskedText: {
    fontSize: 18,
    color: COLORS.text,
    letterSpacing: 3,
  },
  eyeIcon: {
    padding: 16,
  },
});
