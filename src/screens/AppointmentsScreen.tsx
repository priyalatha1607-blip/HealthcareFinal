import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dummyAppointments = [
  { id: 1, doctor: 'Dr. Ashock', specialty: 'Cardiologist', date: 'Oct 12, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Sarah ', specialty: 'Dermatologist', date: 'Oct 15, 2026', time: '02:30 PM', status: 'Pending' },
  { id: 3, doctor: 'Dr. sivasankari', specialty: 'Pediatrician', date: 'Oct 18, 2026', time: '09:15 AM', status: 'Confirmed' },
  { id: 4, doctor: 'Dr. Logaraj', specialty: 'Orthopedist', date: 'Oct 20, 2026', time: '11:45 AM', status: 'Confirmed' },
  { id: 5, doctor: 'Dr. HariPrasad', specialty: 'General Practitioner', date: 'Oct 25, 2026', time: '04:00 PM', status: 'Pending' },
];
import { useAppointments } from '../context/AppointmentContext';
import { useNotifications } from '../context/NotificationContext';
import { COLORS } from '../constants/colors';

export default function AppointmentsScreen() {
  const { appointments, cancelAppointment } = useAppointments();
  const { addNotification } = useNotifications();
  
  // Combine context appointments with dummy ones.
  const allAppointments = [
    ...appointments.map(apt => ({ ...apt, status: 'Confirmed' })),
    ...dummyAppointments.filter(da => !appointments.find(a => a.id === da.id.toString()))
  ];

  const handleCancel = (id: string | number) => {
    Alert.alert('Cancel Appointment', 'Are you sure you want to cancel this appointment?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: () => {
        if (typeof id === 'string') {
          const apt = appointments.find(a => a.id === id);
          cancelAppointment(id);
          if (apt) {
            addNotification(
              'Appointment Cancelled',
              `Your appointment with ${apt.doctor} on ${apt.date} has been cancelled.`,
              'cancellation'
            );
          }
        } else {
          // Note: dummy appointments won't actually be removed from the hardcoded array,
          // but we will inform the user.
          Alert.alert('Info', 'Cannot cancel dummy appointments.');
        }
      }}
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="hand-heart" size={32} color={COLORS.primary} style={styles.logoIcon} />
          <Text style={styles.headerTitle}>Healthcare</Text>
        </View>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>My Appointments</Text>
        
        {allAppointments.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: COLORS.textLight }}>No appointments found.</Text>
        ) : (
          allAppointments.map((apt) => (
            <View key={apt.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.doctorName}>{apt.doctor}</Text>
                  <Text style={styles.specialty}>{apt.specialty}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: apt.status === 'Confirmed' ? '#E8F5E9' : '#FFF3E0' }]}>
                  <Text style={[styles.statusText, { color: apt.status === 'Confirmed' ? '#2E7D32' : '#E65100' }]}>{apt.status}</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                <View style={styles.dateTimeContainer}>
                  <MaterialCommunityIcons name="calendar" size={16} color={COLORS.textLight} style={styles.icon} />
                  <Text style={styles.dateTimeText}>{apt.date}</Text>
                </View>
                <View style={styles.dateTimeContainer}>
                  <MaterialCommunityIcons name="clock-outline" size={16} color={COLORS.textLight} style={styles.icon} />
                  <Text style={styles.dateTimeText}>{apt.time?.replace(/:\d{2}(\s?[AaPp][Mm])/, '$1')}</Text>
                </View>
              </View>
              
              <View style={styles.cardFooter}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => handleCancel(apt.id)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 1,
    lineHeight: 28,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  specialty: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  icon: {
    marginRight: 6,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#444',
  },
  cardFooter: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  cancelButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E53935',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#E53935',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
