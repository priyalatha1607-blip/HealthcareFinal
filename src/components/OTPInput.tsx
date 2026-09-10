import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

interface OTPInputProps {
  length: number;
  value: string;
  onChangeText: (text: string) => void;
  autoFocus?: boolean;
}

export default function OTPInput({ length, value, onChangeText, autoFocus }: OTPInputProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autoFocus) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoFocus]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChangeText = (text: string) => {
    // Only allow digits and limit to length
    const digitsOnly = text.replace(/\D/g, '').substring(0, length);
    onChangeText(digitsOnly);
  };

  const boxes = new Array(length).fill(0);

  return (
    <View style={styles.container}>
      <View style={styles.inputsContainer}>
        {boxes.map((_, index) => {
          const digit = value[index] || '';
          const isCurrentFocus = isFocused && value.length === index;
          const isLastDigit = isFocused && index === length - 1 && value.length === length;
          
          return (
            <View 
              key={index} 
              style={[
                styles.box, 
                (isCurrentFocus || isLastDigit) && styles.boxFocused,
                digit ? styles.boxFilled : null
              ]}
            >
              <Text style={styles.digitText}>{digit}</Text>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChangeText}
        maxLength={length}
        keyboardType="number-pad"
        style={styles.hiddenInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        textContentType="oneTimeCode"
        caretHidden={true}
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  inputsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    zIndex: 1,
  },
  box: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
  },
  boxFocused: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  boxFilled: {
    borderColor: COLORS.primary,
  },
  digitText: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
  },
  hiddenInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 55,
    opacity: 0,
    zIndex: 2,
  },
});
