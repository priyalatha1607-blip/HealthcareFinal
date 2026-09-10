import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dummyAppointments = [
  { id: 1, doctor: 'Dr. Ashock', specialty: 'Cardiologist', date: 'Oct 12, 2026', time: '10:00 AM', status: 'Confirmed' },
  { id: 2, doctor: 'Dr. Sarah ', specialty: 'Dermatologist', date: 'Oct 15, 2026', time: '02:30 PM', status: 'Pending' },
  { id: 3, doctor: 'Dr. sivasankari', specialty: 'Pediatrician', date: 'Oct 18, 2026', time: '09:15 AM', status: 'Confirmed' },
  { id: 4, doctor: 'Dr. Logaraj', specialty: 'Orthopedist', date: 'Oct 20, 2026', time: '11:45 AM', status: 'Confirmed' },
  { id: 5, doctor: 'Dr. HariPrasad', specialty: 'General Practitioner', date: 'Oct 25, 2026', time: '04:00 PM', status: 'Pending' },
];

export default function AppointmentsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="heart-pulse" size={32} color="#00796B" style={styles.logoIcon} />
          <Text style={styles.headerTitle}>Healthcare</Text>
        </View>
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>My Appointments</Text>
        {dummyAppointments.map((apt) => (
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
                <MaterialCommunityIcons name="calendar" size={16} color="#666" style={styles.icon} />
                <Text style={styles.dateTimeText}>{apt.date}</Text>
              </View>
              <View style={styles.dateTimeContainer}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#666" style={styles.icon} />
                <Text style={styles.dateTimeText}>{apt.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
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
    color: '#333',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
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
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
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
});
