import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export const HomeHeader = ({ userName, unreadCount, onNotificationPress }: any) => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Text style={styles.greetingText}>Hello, {userName} 👋</Text>
      <Text style={styles.subGreetingText}>How are you feeling today?</Text>
    </View>
    <TouchableOpacity style={styles.notificationButton} onPress={onNotificationPress}>
      <MaterialCommunityIcons name="bell-outline" size={24} color={COLORS.text} />
      {unreadCount > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={{ color: COLORS.white, fontSize: 10, fontWeight: 'bold' }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

export const SearchBar = ({ searchQuery, setSearchQuery }: any) => (
  <View style={styles.searchContainer}>
    <MaterialCommunityIcons name="magnify" size={24} color={ COLORS.textMuted } style={styles.searchIcon} />
    <TextInput 
      placeholder="Search doctor and clinic" 
      style={styles.searchInput}
      placeholderTextColor={ COLORS.textMuted }
      value={searchQuery}
      onChangeText={setSearchQuery}
    />
  </View>
);

export const SearchResultsView = ({ filteredDoctors, searchQuery, navigation }: any) => (
  <View style={styles.searchResultsContainer}>
    <Text style={styles.searchResultsTitle}>Search Results</Text>
    {filteredDoctors.length > 0 ? (
      filteredDoctors.map((doc: any) => (
        <TouchableOpacity 
          key={doc.id} 
          style={styles.searchResultCard}
          onPress={() => navigation.navigate('DoctorProfile', { doctor: doc })}
        >
          <Image source={{ uri: doc.image }} style={styles.searchResultImage} />
          <View style={styles.searchResultInfo}>
            <Text style={styles.searchResultName}>{doc.name}</Text>
            <Text style={styles.searchResultSpecialty}>{doc.specialty}</Text>
            {doc.clinic ? <Text style={styles.searchResultClinic}>{doc.clinic}</Text> : null}
          </View>
          <View style={styles.searchResultRating}>
            <MaterialCommunityIcons name="star" size={14} color={ COLORS.star } />
            <Text style={styles.searchResultRatingText}>{doc.rating}</Text>
          </View>
        </TouchableOpacity>
      ))
    ) : (
      <View style={styles.noResultsContainer}>
        <MaterialCommunityIcons name="text-search" size={48} color={ COLORS.grayLight } />
        <Text style={styles.noResultsText}>No doctors or clinics found.</Text>
      </View>
    )}
  </View>
);

export const UpcomingAppointment = ({ navigation, appointment }: any) => (
  <View style={styles.sectionContainer}>
    <Text style={[styles.sectionTitle, { paddingHorizontal: 20, marginBottom: 16 }]}>Upcoming Appointment</Text>
    <TouchableOpacity 
      style={styles.appointmentCard}
      onPress={() => navigation.navigate('Appointments')}
    >
      <View style={styles.appointmentHeader}>
        <Image source={{ uri: appointment?.image || 'https://i.pravatar.cc/150?img=12' }} style={styles.doctorImageSmall} />
        <View style={styles.appointmentDoctorInfo}>
          <Text style={styles.appointmentDoctorName}>{appointment?.doctor || 'Dr. Richard Lee'}</Text>
          <Text style={styles.appointmentSpecialty}>{appointment?.specialty || 'General Practitioner'}</Text>
        </View>
      </View>
      
      <View style={styles.appointmentCardBody}>
        <View style={styles.appointmentTimeContainer}>
          <MaterialCommunityIcons name="calendar" size={18} color={COLORS.white} />
          <Text style={styles.appointmentTimeText}>{appointment?.date || 'Today, Oct 12'}</Text>
        </View>
        <View style={styles.appointmentTimeContainer}>
          <MaterialCommunityIcons name="clock-outline" size={18} color={COLORS.white} />
          <Text style={styles.appointmentTimeText}>{appointment?.time || '10:00 AM'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export const Categories = ({ categories, navigation }: any) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Categories</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
      {categories.map((cat: any) => (
        <TouchableOpacity 
          key={cat.id} 
          style={styles.categoryCard}
          onPress={() => navigation.navigate('Doctor', { category: cat.name })}
        >
          <View style={[styles.categoryIconContainer, { backgroundColor: cat.iconColor }]}>
            <MaterialCommunityIcons name={cat.icon} size={28} color={COLORS.white} />
          </View>
          <Text style={styles.categoryName}>{cat.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export const TopDoctors = ({ topDoctors, navigation }: any) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Top Doctors</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
      {topDoctors.map((doc: any) => (
        <TouchableOpacity key={doc.id} style={styles.doctorCard} onPress={() => navigation.navigate('DoctorProfile', { doctor: doc })}>
          <Image source={{ uri: doc.image }} style={styles.doctorImageLarge} />
          <View style={styles.ratingBadge}>
            <MaterialCommunityIcons name="star" size={14} color={ COLORS.star } />
            <Text style={styles.ratingText}>{doc.rating}</Text>
          </View>
          <Text style={styles.doctorCardName} numberOfLines={1}>{doc.name}</Text>
          <Text style={styles.doctorCardSpecialty}>{doc.specialty}</Text>
          {doc.clinic ? <Text style={styles.clinicText}>{doc.clinic}</Text> : null}
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

export const QuickActions = ({ navigation }: any) => (
  <View style={styles.quickActionsContainer}>
    <TouchableOpacity 
      style={styles.quickActionCard} 
      onPress={() => navigation.navigate('BookAppointment')}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: COLORS.primaryLight }]}>
        <MaterialCommunityIcons name="calendar-check" size={28} color={COLORS.primary} />
      </View>
      <Text style={styles.quickActionText}>Book an</Text>
      <Text style={styles.quickActionText}>Appointment</Text>
    </TouchableOpacity>
    
    <View style={{ width: 12 }} />

    <TouchableOpacity 
      style={styles.quickActionCard} 
      onPress={() => navigation.navigate('MedicalRecords')}
    >
      <View style={[styles.quickActionIcon, { backgroundColor: COLORS.primaryLight }]}>
        <MaterialCommunityIcons name="clipboard-text-outline" size={28} color={COLORS.primary} />
      </View>
      <Text style={styles.quickActionText}>Medical</Text>
      <Text style={styles.quickActionText}>Records</Text>
    </TouchableOpacity>
  </View>
);

export const NearbyBanner = ({ navigation }: any) => (
  <TouchableOpacity 
    style={styles.nearbyBanner}
    onPress={() => navigation.navigate('Nearby')}
  >
    <View style={styles.nearbyBannerContent}>
      <View style={styles.nearbyBannerIcon}>
        <MaterialCommunityIcons name="map-marker-radius" size={32} color={COLORS.white} />
      </View>
      <View style={styles.nearbyBannerTextContainer}>
        <Text style={styles.nearbyBannerTitle}>Find Nearby Care</Text>
        <Text style={styles.nearbyBannerSubtitle}>Hospitals & Pharmacies near you</Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
    </View>
  </TouchableOpacity>
);

export const ConsultOnline = ({ navigation }: any) => (
  <View style={styles.sectionContainer}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Consult Online</Text>
    </View>
    <View style={styles.consultContainer}>
      <TouchableOpacity 
        style={styles.consultCard}
        onPress={() => navigation.navigate('ConsultDoctor', { issue: 'Video Consult' })}
      >
        <View style={[styles.consultIconContainer, { backgroundColor: COLORS.primaryLight }]}>
          <MaterialCommunityIcons name="video" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.consultTitle}>Video Consult</Text>
        <Text style={styles.consultSubtitle}>Talk via video call</Text>
      </TouchableOpacity>

      <View style={{ width: 16 }} />

      <TouchableOpacity 
        style={styles.consultCard}
        onPress={() => navigation.navigate('ConsultDoctor', { issue: 'Audio Consult' })}
      >
        <View style={[styles.consultIconContainer, { backgroundColor: COLORS.primaryLight }]}>
          <MaterialCommunityIcons name="phone" size={32} color={COLORS.primary} />
        </View>
        <Text style={styles.consultTitle}>Audio Consult</Text>
        <Text style={styles.consultSubtitle}>Talk via voice call</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export const AppLogo = () => (
  <View style={styles.appLogoContainer}>
    <View style={styles.logoCircle}>
      <MaterialCommunityIcons name="hand-heart" size={44} color={COLORS.white} />
    </View>
    <Text style={styles.appNameText}>Healthcare</Text>
    <Text style={styles.appTagline}>Your Health, Our Priority</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerLeft: { flex: 1 },
  greetingText: { fontSize: 24, fontWeight: 'bold', color: COLORS.textLight, marginTop: 4, marginBottom: 8 },
  subGreetingText: { fontSize: 14, color: COLORS.textLight },
  notificationButton: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: COLORS.white,
    justifyContent: 'center', alignItems: 'center', shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4,
    elevation: 2, position: 'relative',
  },
  notificationBadge: {
    position: 'absolute', top: -2, right: -2, backgroundColor: COLORS.errorDark,
    borderRadius: 10, minWidth: 18, height: 18, justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: 4,
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white,
    marginHorizontal: 20, borderRadius: 16, paddingHorizontal: 16, height: 56,
    marginBottom: 24, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 3,
  },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: COLORS.text },
  filterButton: { backgroundColor: COLORS.primary, padding: 10, borderRadius: 12, marginLeft: 12 },
  sectionContainer: { marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text },
  appointmentCard: {
    backgroundColor: COLORS.primary, marginHorizontal: 20, borderRadius: 20, padding: 20,
    shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  appointmentHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  doctorImageSmall: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: COLORS.white },
  appointmentDoctorInfo: { marginLeft: 12, flex: 1 },
  appointmentDoctorName: { fontSize: 16, fontWeight: 'bold', color: COLORS.white },
  appointmentSpecialty: { fontSize: 13, color: COLORS.borderMedium, marginTop: 2 },
  appointmentCardBody: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', padding: 12 },
  appointmentTimeContainer: { flexDirection: 'row', alignItems: 'center' },
  appointmentTimeText: { color: COLORS.white, marginLeft: 6, fontSize: 13, fontWeight: '500' },
  horizontalScrollPadding: { paddingHorizontal: 20, paddingRight: 10, paddingBottom: 16, paddingTop: 4 },
  categoryCard: { alignItems: 'center', marginRight: 20 },
  categoryIconContainer: { width: 64, height: 64, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  categoryName: { fontSize: 13, fontWeight: '500', color: COLORS.textSecondary },
  doctorCard: { width: 140, backgroundColor: COLORS.white, borderRadius: 16, padding: 12, marginRight: 16, alignItems: 'center', shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3, position: 'relative' },
  doctorImageLarge: { width: 80, height: 80, borderRadius: 40, marginBottom: 12 },
  ratingBadge: { position: 'absolute', top: 12, right: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.warningBackground, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  ratingText: { fontSize: 10, fontWeight: 'bold', color: COLORS.warning, marginLeft: 2 },
  doctorCardName: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginBottom: 4, textAlign: 'center' },
  doctorCardSpecialty: { fontSize: 12, color: COLORS.textLight, textAlign: 'center' },
  clinicText: { fontSize: 12, color: COLORS.textMuted, marginTop: 2, marginBottom: 8 },
  quickActionsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 24 },
  quickActionCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  quickActionIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  quickActionText: { fontSize: 14, fontWeight: '600', color: COLORS.text, textAlign: 'center' },
  nearbyBanner: { backgroundColor: COLORS.orange, marginHorizontal: 20, borderRadius: 16, padding: 16, marginBottom: 24, shadowColor: COLORS.orange, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  nearbyBannerContent: { flexDirection: 'row', alignItems: 'center' },
  nearbyBannerIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  nearbyBannerTextContainer: { flex: 1 },
  nearbyBannerTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.white, marginBottom: 4 },
  nearbyBannerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  consultContainer: { flexDirection: 'row', paddingHorizontal: 20 },
  consultCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.borderLight },
  consultIconContainer: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  consultTitle: { fontSize: 15, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  consultSubtitle: { fontSize: 12, color: COLORS.textLight },
  appLogoContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 32, marginBottom: 24 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  appNameText: { fontSize: 24, fontWeight: 'bold', color: COLORS.primary, marginBottom: 4 },
  appTagline: { fontSize: 14, color: COLORS.textLight },
  searchResultsContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  searchResultsTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
  searchResultCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12, alignItems: 'center', shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 3 },
  searchResultImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  searchResultInfo: { flex: 1 },
  searchResultName: { fontSize: 16, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 },
  searchResultSpecialty: { fontSize: 14, color: COLORS.textLight, marginBottom: 2 },
  searchResultClinic: { fontSize: 12, color: COLORS.textMuted },
  searchResultRating: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.warningBackground, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  searchResultRatingText: { fontSize: 12, fontWeight: 'bold', color: COLORS.warning, marginLeft: 4 },
  noResultsContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 40 },
  noResultsText: { fontSize: 16, color: COLORS.textMuted, marginTop: 16 },
});
