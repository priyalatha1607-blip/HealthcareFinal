import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const allDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', rating: '4.9', reviews: 120, image: 'https://i.pravatar.cc/150?img=47' },
  { id: '2', name: 'Dr. Mark Davis', specialty: 'Dentist', rating: '4.8', reviews: 85, image: 'https://i.pravatar.cc/150?img=11' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', rating: '4.7', reviews: 200, image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Michael Brown', specialty: 'Neurologist', rating: '4.9', reviews: 150, image: 'https://i.pravatar.cc/150?img=59' },
  { id: '5', name: 'Dr. Sarah Wilson', specialty: 'Orthopedist', rating: '4.6', reviews: 90, image: 'https://i.pravatar.cc/150?img=44' },
  { id: '6', name: 'Dr. David Lee', specialty: 'Ophthalmologist', rating: '4.8', reviews: 110, image: 'https://i.pravatar.cc/150?img=60' },
  { id: '7', name: 'Dr. Lisa Wong', specialty: 'Dermatologist', rating: '4.7', reviews: 130, image: 'https://i.pravatar.cc/150?img=45' },
  { id: '8', name: 'Dr. Robert Taylor', specialty: 'General Surgeon', rating: '4.5', reviews: 75, image: 'https://i.pravatar.cc/150?img=53' },
];

export default function DoctorScreen() {
  const renderDoctor = ({ item: doc }: any) => (
    <TouchableOpacity style={styles.doctorCard}>
      <Image source={{ uri: doc.image }} style={styles.doctorImageLarge} />
      <View style={styles.ratingBadge}>
        <MaterialCommunityIcons name="star" size={12} color="#F5B041" />
        <Text style={styles.ratingText}>{doc.rating}</Text>
      </View>
      <Text style={styles.doctorCardName} numberOfLines={1}>{doc.name}</Text>
      <Text style={styles.doctorCardSpecialty}>{doc.specialty}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="heart-pulse" size={32} color="#00796B" style={styles.logoIcon} />
          <Text style={styles.headerTitle}>All Doctors</Text>
        </View>
      </View>
      <FlatList
        data={allDoctors}
        keyExtractor={(item) => item.id}
        renderItem={renderDoctor}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
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
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  doctorCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  doctorImageLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#F5B041',
    marginLeft: 2,
  },
  doctorCardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  doctorCardSpecialty: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
