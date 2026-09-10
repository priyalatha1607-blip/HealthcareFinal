import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native';
import { COLORS } from '../constants/colors';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function CustomButton({ 
  title, 
  style, 
  textStyle, 
  variant = 'primary', 
  ...props 
}: CustomButtonProps) {
  
  const getContainerStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.container, styles.secondaryContainer, style];
      case 'outline':
        return [styles.container, styles.outlineContainer, style];
      case 'primary':
      default:
        return [styles.container, styles.primaryContainer, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'secondary':
        return [styles.text, styles.secondaryText, textStyle];
      case 'outline':
        return [styles.text, styles.outlineText, textStyle];
      case 'primary':
      default:
        return [styles.text, styles.primaryText, textStyle];
    }
  };

  return (
    <TouchableOpacity style={getContainerStyle()} {...props}>
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  secondaryContainer: {
    backgroundColor: COLORS.primaryLight,
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.white,
  },
  secondaryText: {
    color: COLORS.primary,
  },
  outlineText: {
    color: COLORS.primary,
  },
});
