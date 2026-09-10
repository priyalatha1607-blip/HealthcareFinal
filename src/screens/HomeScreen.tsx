import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Dental', icon: 'tooth-outline', color: '#FF9A9E' },
  { id: '2', name: 'Heart', icon: 'heart-pulse', color: '#FECFEF' },
  { id: '3', name: 'Eye', icon: 'eye-outline', color: '#A1C4FD' },
  { id: '4', name: 'Brain', icon: 'brain', color: '#C2E9FB' },
  { id: '5', name: 'Bone', icon: 'bone', color: '#D4FC79' },
];

const topDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', rating: '4.9', reviews: 120, image: 'https://i.pravatar.cc/150?img=47' },
  { id: '2', name: 'Dr. Mark Davis', specialty: 'Dentist', rating: '4.8', reviews: 85, image: 'https://i.pravatar.cc/150?img=11' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', rating: '4.7', reviews: 200, image: 'https://i.pravatar.cc/150?img=32' },
];

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingText}>Hello, Priya 👋</Text>
            <Text style={styles.subGreetingText}>How are you feeling today?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search doctor, clinics, symptoms..." 
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Upcoming Appointment */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?img=12' }} style={styles.doctorImageSmall} />
              <View style={styles.appointmentDoctorInfo}>
                <Text style={styles.appointmentDoctorName}>Dr. Richard Lee</Text>
                <Text style={styles.appointmentSpecialty}>General Practitioner</Text>
              </View>
            </View>
            
            <View style={styles.appointmentCardBody}>
              <View style={styles.appointmentTimeContainer}>
                <MaterialCommunityIcons name="calendar" size={18} color="#fff" />
                <Text style={styles.appointmentTimeText}>Today, Oct 12</Text>
              </View>
              <View style={styles.appointmentTimeContainer}>
                <MaterialCommunityIcons name="clock-outline" size={18} color="#fff" />
                <Text style={styles.appointmentTimeText}>10:00 AM - 10:30 AM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Categories / Specialties */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
            {categories.map((cat) => (
              <TouchableOpacity key={cat.id} style={styles.categoryCard}>
                <View style={[styles.categoryIconContainer, { backgroundColor: cat.color }]}>
                  <MaterialCommunityIcons name={cat.icon as any} size={28} color="#fff" />
                </View>
                <Text style={styles.categoryName}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Doctors */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
            {topDoctors.map((doc) => (
              <TouchableOpacity key={doc.id} style={styles.doctorCard}>
                <Image source={{ uri: doc.image }} style={styles.doctorImageLarge} />
                <View style={styles.ratingBadge}>
                  <MaterialCommunityIcons name="star" size={12} color="#F5B041" />
                  <Text style={styles.ratingText}>{doc.rating}</Text>
                </View>
                <Text style={styles.doctorCardName} numberOfLines={1}>{doc.name}</Text>
                <Text style={styles.doctorCardSpecialty}>{doc.specialty}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subGreetingText: {
    fontSize: 14,
    color: '#666',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#00796B',
    padding: 10,
    borderRadius: 12,
    marginLeft: 12,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#00796B',
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: '#00796B',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#00796B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  doctorImageSmall: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  appointmentDoctorInfo: {
    marginLeft: 12,
    flex: 1,
  },
  appointmentDoctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  appointmentSpecialty: {
    fontSize: 13,
    color: '#e0e0e0',
    marginTop: 2,
  },
  appointmentCardBody: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  appointmentTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTimeText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 13,
    fontWeight: '500',
  },
  horizontalScrollPadding: {
    paddingHorizontal: 20,
    paddingRight: 10,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#555',
  },
  doctorCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
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
