import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { useNotifications } from '../context/NotificationContext';
import { useAppointments } from '../context/AppointmentContext';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../constants/colors';
import { 
  HomeHeader, 
  SearchBar, 
  SearchResultsView, 
  UpcomingAppointment, 
  Categories, 
  TopDoctors, 
  QuickActions, 
  NearbyBanner, 
  ConsultOnline, 
  AppLogo 
} from '../components/home/HomeComponents';

const topDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', clinic: 'HeartCare Hospital', rating: '4.9', reviews: 120, image: 'https://i.pravatar.cc/150?img=47' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', clinic: 'Kids Wellness Center', rating: '4.7', reviews: 200, image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Richard Lee', specialty: 'General Practitioner', clinic: 'City Health Clinic', rating: '4.6', reviews: 150, image: 'https://i.pravatar.cc/150?img=12' },
];

const categories = [
  { id: '1', name: 'Dental', icon: 'tooth', color: '#E8F5E9', iconColor: '#4CAF50' },
  { id: '2', name: 'Heart', icon: 'heart-pulse', color: '#FFEBEE', iconColor: '#F44336' },
  { id: '3', name: 'Eye', icon: 'eye', color: '#E3F2FD', iconColor: '#2196F3' },
  { id: '4', name: 'Brain', icon: 'brain', color: '#F3E5F5', iconColor: '#9C27B0' },
  { id: '5', name: 'Bone', icon: 'bone', color: '#FFF3E0', iconColor: '#FF9800' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

export default function HomeScreen({ navigation }: Props) {
  const { unreadCount } = useNotifications();
  const { appointments } = useAppointments();
  const upcomingApt = appointments.length > 0 ? appointments[0] : null;
  const { email } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = topDoctors.filter((doc) => {
    if (!doc.name || !doc.image || !doc.specialty) return false;
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
        
        <HomeHeader 
          userName={email ? email.split('@')[0] : 'Guest'} 
          unreadCount={unreadCount} 
          onNotificationPress={() => navigation.navigate('Notifications')} 
        />

        <SearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />

        {searchQuery.length > 0 ? (
          <SearchResultsView filteredDoctors={filteredDoctors} searchQuery={searchQuery} navigation={navigation} />
        ) : (
          <>
            {upcomingApt && <UpcomingAppointment navigation={navigation} appointment={upcomingApt} />}
            <Categories categories={categories} navigation={navigation} />
            <TopDoctors topDoctors={topDoctors} />
            <QuickActions navigation={navigation} />
            <NearbyBanner navigation={navigation} />
            <ConsultOnline navigation={navigation} />
            <AppLogo />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // was COLORS.backgroundLight
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
