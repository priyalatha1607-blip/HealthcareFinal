import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MedicalRecords'>;
};

const dummyRecords = [
  {
    id: '1',
    title: 'Complete Blood Count (CBC)',
    doctor: 'Dr. Jane Smith',
    date: '10 Sep 2026',
    type: 'Lab Report',
    icon: 'flask-outline',
    color: '#E57373',
    bgColor: '#FFEBEE',
  },
  {
    id: '2',
    title: 'Dental X-Ray',
    doctor: 'Dr. Mark Davis',
    date: '05 Sep 2026',
    type: 'Scan',
    icon: 'radiology-box',
    color: '#4FC3F7',
    bgColor: '#E1F5FE',
  },
  {
    id: '3',
    title: 'General Checkup Prescription',
    doctor: 'Dr. Emily Chen',
    date: '28 Aug 2026',
    type: 'Prescription',
    icon: 'pill',
    color: '#81C784',
    bgColor: '#E8F5E9',
  },
  {
    id: '4',
    title: 'ECG Report',
    doctor: 'Dr. Robert Taylor',
    date: '15 Aug 2026',
    type: 'Heart Test',
    icon: 'heart-pulse',
    color: '#FFB74D',
    bgColor: '#FFF3E0',
  },
];

export default function MedicalRecordsScreen({ navigation }: Props) {
  const renderRecord = ({ item }: any) => (
    <View style={styles.recordCard}>
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <MaterialCommunityIcons name={item.icon} size={28} color={item.color} />
      </View>
      <View style={styles.recordInfo}>
        <Text style={styles.recordTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.recordDoctor}>{item.doctor}</Text>
        <View style={styles.metaData}>
          <Text style={styles.recordDate}>{item.date}</Text>
          <View style={styles.dot} />
          <Text style={styles.recordType}>{item.type}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <MaterialCommunityIcons name="download-outline" size={24} color="#00796B" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medical Records</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={dummyRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderRecord}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>Recent Documents</Text>
            <Text style={styles.listHeaderSubtitle}>Your medical history and prescriptions</Text>
          </View>
        }
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  listHeader: {
    marginBottom: 20,
  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listHeaderSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  recordInfo: {
    flex: 1,
    marginRight: 12,
  },
  recordTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  recordDoctor: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  metaData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordDate: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginHorizontal: 8,
  },
  recordType: {
    fontSize: 12,
    color: '#00796B',
    fontWeight: '600',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
