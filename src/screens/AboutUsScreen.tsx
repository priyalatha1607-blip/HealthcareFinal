import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'AboutUs'>;
};

export default function AboutUsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.container} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Who We Are</Text>
          <Text style={styles.cardText}>
            We are a state-of-the-art healthcare facility dedicated to providing comprehensive and compassionate medical services. Founded in 2005, we have been at the forefront of patient care, blending advanced technology with a human touch.
          </Text>
        </View>

        <View style={styles.rowCards}>
          <View style={[styles.card, styles.flexCard]}>
            <MaterialCommunityIcons name="heart-pulse" size={32} color="#008080" style={styles.icon} />
            <Text style={styles.cardTitle}>Our Mission</Text>
            <Text style={styles.cardTextSmall}>
              To improve the health and well-being of the communities we serve through excellence in clinical care and education.
            </Text>
          </View>
          <View style={[styles.card, styles.flexCard]}>
            <MaterialCommunityIcons name="eye-outline" size={32} color="#008080" style={styles.icon} />
            <Text style={styles.cardTitle}>Our Vision</Text>
            <Text style={styles.cardTextSmall}>
              To be the premier healthcare provider in the region, recognized for exceptional patient outcomes.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Working Hours</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Monday - Friday</Text>
            <Text style={styles.rowValue}>08:00 AM - 08:00 PM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Saturday</Text>
            <Text style={styles.rowValue}>09:00 AM - 05:00 PM</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Sunday</Text>
            <Text style={styles.rowValue}>Emergency Only</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Details</Text>
          <View style={styles.contactRow}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#008080" />
            <Text style={styles.contactText}>123 Health Avenue, Medical District, NY 10001</Text>
          </View>
          <View style={styles.contactRow}>
            <MaterialCommunityIcons name="phone" size={20} color="#008080" />
            <Text style={styles.contactText}>+1 (555) 123-4567</Text>
          </View>
          <View style={styles.contactRow}>
            <MaterialCommunityIcons name="email" size={20} color="#008080" />
            <Text style={styles.contactText}>contact@medicare.com</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#008080',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#008080',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rowCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flexCard: {
    flex: 1,
    marginBottom: 0,
    marginHorizontal: 4,
    alignItems: 'center',
    padding: 12,
  },
  icon: {
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardTextSmall: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    color: '#008080',
    fontWeight: '600',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 12,
    flex: 1,
  },
});
