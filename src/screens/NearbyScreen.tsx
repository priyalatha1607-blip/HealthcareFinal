import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Nearby'>;
};

const nearbyData = [
  { id: '1', name: 'City Central Hospital', type: 'Hospital', distance: '1.2 km', open: true, rating: 4.8 },
  { id: '2', name: 'Apollo Pharmacy', type: 'Pharmacy', distance: '0.5 km', open: true, rating: 4.5 },
  { id: '3', name: 'Sunrise Dental Clinic', type: 'Hospital', distance: '2.0 km', open: false, rating: 4.2 },
  { id: '4', name: 'MedPlus Pharmacy', type: 'Pharmacy', distance: '1.8 km', open: true, rating: 4.3 },
  { id: '5', name: 'Carewell Multi-Specialty', type: 'Hospital', distance: '3.5 km', open: true, rating: 4.9 },
  { id: '6', name: 'Health & Glow Pharmacy', type: 'Pharmacy', distance: '2.1 km', open: false, rating: 4.1 },
];

export default function NearbyScreen({ navigation }: Props) {
  const [filter, setFilter] = useState('All');

  const filteredData = nearbyData.filter((item) => {
    if (filter === 'All') return true;
    if (filter === 'Hospitals') return item.type === 'Hospital';
    if (filter === 'Pharmacies') return item.type === 'Pharmacy';
    return true;
  });

  const renderFilterButton = (title: string) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === title && styles.filterButtonActive]}
      onPress={() => setFilter(title)}
    >
      <Text style={[styles.filterText, filter === title && styles.filterTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }: any) => {
    const isHospital = item.type === 'Hospital';
    const iconName = isHospital ? 'hospital-box' : 'pill';
    const iconColor = isHospital ? '#E53935' : '#00897B';
    const bgColor = isHospital ? '#FFEBEE' : COLORS.primaryLight;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
            <MaterialCommunityIcons name={iconName} size={28} color={iconColor} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.nameText} numberOfLines={1}>{item.name}</Text>
            <View style={styles.subInfoRow}>
              <Text style={styles.typeText}>{item.type}</Text>
              <View style={styles.dot} />
              <Text style={styles.distanceText}>
                <MaterialCommunityIcons name="map-marker" size={12} color="#888" /> {item.distance}
              </Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
             <Text style={[styles.statusText, { color: item.open ? '#43A047' : '#E53935' }]}>
               {item.open ? 'Open' : 'Closed'}
             </Text>
             <View style={styles.ratingRow}>
               <MaterialCommunityIcons name="star" size={14} color="#FBC02D" />
               <Text style={styles.ratingText}>{item.rating}</Text>
             </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => Linking.openURL(`tel:18001234567`)}
          >
            <MaterialCommunityIcons name="phone-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionButtonText}>Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryActionButton]}
            onPress={() => {
              const url = Platform.select({
                ios: `maps:0,0?q=${item.name}`,
                android: `geo:0,0?q=${item.name}`,
                default: `https://www.google.com/maps/search/?api=1&query=${item.name}`
              });
              Linking.openURL(url as string);
            }}
          >
            <MaterialCommunityIcons name="directions" size={20} color={COLORS.white} />
            <Text style={styles.primaryActionButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Care</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.filterContainer}>
        {renderFilterButton('All')}
        {renderFilterButton('Hospitals')}
        {renderFilterButton('Pharmacies')}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.inputBackground,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.white,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  subInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  distanceText: {
    fontSize: 12,
    color: '#888',
  },
  statusContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.inputBackground,
    marginRight: 8,
  },
  primaryActionButton: {
    backgroundColor: COLORS.primary,
    marginRight: 0,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: 6,
  },
  primaryActionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.white,
    marginLeft: 6,
  },
});
