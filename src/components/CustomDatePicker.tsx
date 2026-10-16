import React from 'react';
import { View, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface CustomDatePickerProps {
  visible: boolean;
  value: Date;
  onChange: (date: Date | undefined) => void;
  onClose: () => void;
  minimumDate?: Date;
}

export default function CustomDatePicker({ 
  visible, 
  value, 
  onChange, 
  onClose,
  minimumDate = new Date() 
}: CustomDatePickerProps) {
  if (!visible) return null;

  const handleChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // Hide picker on Android immediately, handled by caller on iOS
    if (Platform.OS === 'android') {
      onClose();
    }
    
    if (event.type === 'set' && selectedDate) {
      onChange(selectedDate);
    } else if (event.type === 'dismissed') {
      onClose();
    }
  };

  return (
    <DateTimePicker
      value={value}
      mode="date"
      display="default"
      minimumDate={minimumDate}
      onChange={handleChange}
    />
  );
}
