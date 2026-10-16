import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function NotificationDetailScreen({ route, navigation }: any) {
  const { notification } = route.params;

  const renderIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <MaterialCommunityIcons name="calendar-check" size={48} color={ COLORS.success } />;
      case 'cancellation':
        return <MaterialCommunityIcons name="calendar-remove" size={48} color={ COLORS.errorDark } />;
      case 'info':
      default:
        return <MaterialCommunityIcons name="information" size={48} color={ COLORS.info } />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          {renderIcon(notification.type)}
        </View>
        
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.timestamp}>
          {new Date(notification.timestamp).toLocaleString()}
        </Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.message}>{notification.message}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: COLORS.inputBackground,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 24,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.textDark,
    textAlign: 'center',
  },
});
