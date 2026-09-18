import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { useNotifications } from '../context/NotificationContext';

const topDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', clinic: 'HeartCare Hospital', rating: '4.9', reviews: 120, image: 'https://i.pravatar.cc/150?img=47' },
  { id: '2', name: 'Dr. Mark Davis', specialty: 'Dentist', clinic: 'Smile Dental Clinic', rating: '4.8', reviews: 85, image: 'https://i.pravatar.cc/150?img=11' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', clinic: 'Kids Wellness Center', rating: '4.7', reviews: 200, image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Richard Lee', specialty: 'General Practitioner', clinic: 'City Health Clinic', rating: '4.6', reviews: 150, image: 'https://i.pravatar.cc/150?img=12' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

const { width } = Dimensions.get('window');

const categories = [
  { id: '1', name: 'Dental', icon: 'tooth', color: '#E8F5E9', iconColor: '#4CAF50' },
  { id: '2', name: 'Heart', icon: 'heart-pulse', color: '#FFEBEE', iconColor: '#F44336' },
  { id: '3', name: 'Eye', icon: 'eye', color: '#E3F2FD', iconColor: '#2196F3' },
  { id: '4', name: 'Brain', icon: 'brain', color: '#F3E5F5', iconColor: '#9C27B0' },
  { id: '5', name: 'Bone', icon: 'bone', color: '#FFF3E0', iconColor: '#FF9800' },
];



export default function HomeScreen({ navigation }: Props) {
  const { unreadCount } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = topDoctors.filter((doc) => {
    const query = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.specialty.toLowerCase().includes(query) ||
      (doc.clinic && doc.clinic.toLowerCase().includes(query))
    );
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greetingText}>Hello, Priya 👋</Text>
            <Text style={styles.subGreetingText}>How are you feeling today?</Text>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <MaterialCommunityIcons name="bell-outline" size={24} color="#333" />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#888" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search doctor, clinics, symptoms..." 
            style={styles.searchInput}
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {searchQuery.length > 0 ? (
          // Search Results View
          <View style={styles.searchResultsContainer}>
            <Text style={styles.searchResultsTitle}>Search Results</Text>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <TouchableOpacity key={doc.id} style={styles.searchResultCard}>
                  <Image source={{ uri: doc.image }} style={styles.searchResultImage} />
                  <View style={styles.searchResultInfo}>
                    <Text style={styles.searchResultName}>{doc.name}</Text>
                    <Text style={styles.searchResultSpecialty}>{doc.specialty}</Text>
                    {doc.clinic ? <Text style={styles.searchResultClinic}>{doc.clinic}</Text> : null}
                  </View>
                  <View style={styles.searchResultRating}>
                    <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                    <Text style={styles.searchResultRatingText}>{doc.rating}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <MaterialCommunityIcons name="text-search" size={48} color="#ccc" />
                <Text style={styles.noResultsText}>No doctors or clinics found.</Text>
              </View>
            )}
          </View>
        ) : (
          // Normal Dashboard View
          <>
            {/* Upcoming Appointment */}
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginBottom: 16 }]}>Upcoming Appointment</Text>
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
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
                {categories.map((cat) => (
                  <TouchableOpacity 
                    key={cat.id} 
                    style={styles.categoryCard}
                    onPress={() => navigation.navigate('Doctor' as any, { category: cat.name })}
                  >
                    <View style={[styles.categoryIconContainer, { backgroundColor: cat.iconColor }]}>
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
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
                {topDoctors.map((doc) => (
                  <TouchableOpacity key={doc.id} style={styles.doctorCard}>
                    <Image source={{ uri: doc.image }} style={styles.doctorImageLarge} />
                    <View style={styles.ratingBadge}>
                      <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{doc.rating}</Text>
                    </View>
                    <Text style={styles.doctorCardName} numberOfLines={1}>{doc.name}</Text>
                    <Text style={styles.doctorCardSpecialty}>{doc.specialty}</Text>
                    {doc.clinic ? <Text style={styles.clinicText}>{doc.clinic}</Text> : null}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.quickActionsContainer}>
              <TouchableOpacity 
                style={styles.quickActionCard} 
                onPress={() => navigation.navigate('BookAppointment')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: '#E0F2F1' }]}>
                  <MaterialCommunityIcons name="calendar-check" size={28} color="#00796B" />
                </View>
                <Text style={styles.quickActionText}>Book an</Text>
                <Text style={styles.quickActionText}>Appointment</Text>
              </TouchableOpacity>
              
              <View style={{ width: 12 }} />

              <TouchableOpacity 
                style={styles.quickActionCard} 
                onPress={() => navigation.navigate('MedicalRecords')}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: '#E8EAF6' }]}>
                  <MaterialCommunityIcons name="clipboard-text-outline" size={28} color="#3F51B5" />
                </View>
                <Text style={styles.quickActionText}>Medical</Text>
                <Text style={styles.quickActionText}>Records</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.nearbyBanner}
              onPress={() => navigation.navigate('Nearby')}
            >
              <View style={styles.nearbyBannerContent}>
                <View style={styles.nearbyBannerIcon}>
                  <MaterialCommunityIcons name="map-marker-radius" size={32} color="#fff" />
                </View>
                <View style={styles.nearbyBannerTextContainer}>
                  <Text style={styles.nearbyBannerTitle}>Find Nearby Care</Text>
                  <Text style={styles.nearbyBannerSubtitle}>Hospitals & Pharmacies near you</Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
              </View>
            </TouchableOpacity>
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Consult Online</Text>
              </View>
              <View style={styles.consultContainer}>
                <TouchableOpacity 
                  style={styles.consultCard}
                  onPress={() => navigation.navigate('ConsultDoctor', { issue: 'Video Consult' })}
                >
                  <View style={[styles.consultIconContainer, { backgroundColor: '#E3F2FD' }]}>
                    <MaterialCommunityIcons name="video" size={32} color="#1976D2" />
                  </View>
                  <Text style={styles.consultTitle}>Video Consult</Text>
                  <Text style={styles.consultSubtitle}>Talk via video call</Text>
                </TouchableOpacity>

                <View style={{ width: 16 }} />

                <TouchableOpacity 
                  style={styles.consultCard}
                  onPress={() => navigation.navigate('ConsultDoctor', { issue: 'Audio Consult' })}
                >
                  <View style={[styles.consultIconContainer, { backgroundColor: '#F3E5F5' }]}>
                    <MaterialCommunityIcons name="phone" size={32} color="#9C27B0" />
                  </View>
                  <Text style={styles.consultTitle}>Audio Consult</Text>
                  <Text style={styles.consultSubtitle}>Talk via voice call</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.appLogoContainer}>
              <View style={styles.logoCircle}>
                <MaterialCommunityIcons name="heart-pulse" size={40} color="#fff" />
              </View>
              <Text style={styles.appNameText}>Healthcare</Text>
              <Text style={styles.appTagline}>Your Health, Our Priority</Text>
            </View>
          </>
        )}
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
    paddingBottom: 20,
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
    color: '#666',
    marginTop: 4,
    marginBottom: 8,
  },
  clinicText: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
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
    top: -2,
    right: -2,
    backgroundColor: '#E53935',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
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
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  nearbyBanner: {
    backgroundColor: '#FF7043',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  nearbyBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nearbyBannerTextContainer: {
    flex: 1,
  },
  nearbyBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  nearbyBannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
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
  consultContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  consultCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
  },
  consultIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  consultTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  consultSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  appLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    marginBottom: 24,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#00796B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#00796B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  appNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 4,
  },
  appTagline: {
    fontSize: 14,
    color: '#666',
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
  searchResultsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  searchResultCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  searchResultImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  searchResultInfo: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  searchResultSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  searchResultClinic: {
    fontSize: 12,
    color: '#888',
  },
  searchResultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  searchResultRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F5B041',
    marginLeft: 4,
  },
  noResultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
  },
});
