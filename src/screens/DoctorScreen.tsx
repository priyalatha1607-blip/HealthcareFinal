import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';

const allDoctors = [
  { id: '1', name: 'Dr. Abu Saifuddin', position: 'Assistant Professor', specialty: 'Neuromedicine', degree: 'MD , M.PHIL, PHD', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop', searchTerms: ['brain', 'neuromedicine', 'neurologist'] },
  { id: '2', name: 'Dr. James Merry', position: 'Assistant Professor', specialty: 'Gynae and Obs', degree: 'MD ,M.PHIL, PHD', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop', searchTerms: ['gynae', 'obstetrics'] },
  { id: '3', name: 'Dr. William Henry', position: 'Assistant Professor', specialty: 'Brain Tumor', degree: 'MD ,M.PHIL, PHD', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop', searchTerms: ['brain', 'tumor'] },
  { id: '4', name: 'Dr. Jane Smith', position: 'Senior Consultant', specialty: 'Cardiologist', degree: 'MBBS, MD', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop', searchTerms: ['heart', 'cardiologist'] },
  { id: '5', name: 'Dr. Michael Brown', position: 'Consultant', specialty: 'Neurologist', degree: 'MBBS, MD, DM', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop', searchTerms: ['brain', 'neurologist'] },
  { id: '6', name: 'Dr. Mark Davis', position: 'Senior Dentist', specialty: 'Dentist', degree: 'BDS, MDS', image: 'https://images.unsplash.com/photo-1582750433449-648ed127d09e?w=150&h=150&fit=crop', searchTerms: ['dental', 'dentist', 'teeth'] },
  { id: '7', name: 'Dr. Emily Chen', position: 'Consultant', specialty: 'Ophthalmologist', degree: 'MBBS, MS', image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop', searchTerms: ['eye', 'ophthalmologist', 'vision'] },
  { id: '8', name: 'Dr. Sarah Wilson', position: 'Orthopedic Surgeon', specialty: 'Orthopedist', degree: 'MBBS, MS Ortho', image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&h=150&fit=crop', searchTerms: ['bone', 'orthopedist', 'ortho'] },
  { id: '9', name: 'Dr. David Lee', position: 'Consultant Dentist', specialty: 'Orthodontist', degree: 'BDS, MDS', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop', searchTerms: ['dental', 'dentist'] },
  { id: '10', name: 'Dr. Robert Taylor', position: 'Senior Cardiologist', specialty: 'Cardiologist', degree: 'MBBS, MD', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop', searchTerms: ['heart', 'cardiologist'] },
];

export default function DoctorScreen({ route }: any) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (route?.params?.category) {
      setSearchQuery(route.params.category);
    }
  }, [route?.params?.category]);

  const filteredDoctors = allDoctors.filter(doc => {
    if (!doc.name || !doc.image || !doc.specialty || !doc.position || !doc.degree) return false;
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.specialty.toLowerCase().includes(query) ||
      (doc.searchTerms && doc.searchTerms.some(term => term.includes(query)))
    );
  });

  const renderDoctor = ({ item: doc }: any) => (
    <View style={styles.doctorCard}>
      <View style={styles.doctorInfoContainer}>
        <Image source={{ uri: doc.image }} style={styles.doctorImage} />
        <View style={styles.doctorDetails}>
          <Text style={styles.doctorName}>{doc.name}</Text>
          <Text style={styles.doctorSubText}>{doc.position}</Text>
          <Text style={styles.doctorSubText}>{doc.specialty}</Text>
          <Text style={styles.doctorSubText}>{doc.degree}</Text>
        </View>
      </View>
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={styles.appointmentButton}
          onPress={() => navigation.navigate('BookAppointment')}
        >
          <Text style={styles.appointmentText}>Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor List</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Doctors, Clinics, Labs"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Doctor List */}
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id}
          renderItem={renderDoctor}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            searchQuery.length > 0 ? (
              <Text style={styles.resultsCountText}>
                Found {filteredDoctors.length} {filteredDoctors.length === 1 ? 'doctor' : 'doctors'}
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No doctors found for "{searchQuery}"</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#009688', // Teal color for header area
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#009688',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: COLORS.white,
  },
  searchInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.text,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  doctorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
  },
  doctorInfoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: COLORS.borderLight,
  },
  doctorDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 4,
  },
  doctorSubText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  appointmentButton: {
    flex: 1,
    backgroundColor: '#009688',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  appointmentText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '500',
  },
  resultsCountText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
    fontWeight: '500',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
