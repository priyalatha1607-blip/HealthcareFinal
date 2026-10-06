import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { COLORS } from '../constants/colors';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CustomModal from '../components/CustomModal';
import { useAuth } from '../context/AuthContext';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HealthDetails'>;
};

export default function HealthDetailsScreen({ navigation }: Props) {
  const { userProfile, setUserProfile } = useAuth();
  
  const [bloodGroup, setBloodGroup] = useState(userProfile.healthDetails?.bloodGroup || '');
  const [height, setHeight] = useState(userProfile.healthDetails?.height || '');
  const [weight, setWeight] = useState(userProfile.healthDetails?.weight || '');
  const [allergies, setAllergies] = useState(userProfile.healthDetails?.allergies || '');
  const [medications, setMedications] = useState(userProfile.healthDetails?.medications || '');
  const [medicalHistory, setMedicalHistory] = useState(userProfile.healthDetails?.medicalHistory || '');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      healthDetails: {
        bloodGroup,
        height,
        weight,
        allergies,
        medications,
        medicalHistory
      }
    });
    setBloodGroup('');
    setHeight('');
    setWeight('');
    setAllergies('');
    setMedications('');
    setMedicalHistory('');
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Health Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Physical Metrics</Text>
            <CustomInput
              label="Blood Group"
              placeholder="e.g. O+, A-, B+"
              value={bloodGroup}
              onChangeText={setBloodGroup}
            />
            
            <View style={styles.row}>
              <View style={styles.halfWidth}>
                <CustomInput
                  label="Height (cm)"
                  placeholder="e.g. 175"
                  value={height}
                  onChangeText={setHeight}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfWidth}>
                <CustomInput
                  label="Weight (kg)"
                  placeholder="e.g. 70"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Medical Information</Text>
            <CustomInput
              label="Known Allergies"
              placeholder="e.g. Peanuts, Penicillin"
              value={allergies}
              onChangeText={setAllergies}
            />
            <CustomInput
              label="Current Medications"
              placeholder="Any ongoing medications..."
              value={medications}
              onChangeText={setMedications}
            />
            <CustomInput
              label="Past Medical History"
              placeholder="Any surgeries or chronic conditions..."
              value={medicalHistory}
              onChangeText={setMedicalHistory}
            />
          </View>

          <CustomButton title="Save Details" onPress={handleSave} style={styles.saveButton} />

          {userProfile.healthDetails && (
            <View style={[styles.card, { marginTop: 20, backgroundColor: COLORS.successLight, borderColor: COLORS.successBorder, borderWidth: 1 }]}>
              <Text style={[styles.cardTitle, { color: COLORS.success, borderBottomWidth: 1, borderBottomColor: COLORS.successBorder, paddingBottom: 8 }]}>Saved Health Details</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.savedText}><Text style={{fontWeight: 'bold'}}>Blood Group:</Text> {userProfile.healthDetails.bloodGroup}</Text>
                <Text style={styles.savedText}><Text style={{fontWeight: 'bold'}}>Height:</Text> {userProfile.healthDetails.height} cm</Text>
                <Text style={styles.savedText}><Text style={{fontWeight: 'bold'}}>Weight:</Text> {userProfile.healthDetails.weight} kg</Text>
                <Text style={styles.savedText}><Text style={{fontWeight: 'bold'}}>Allergies:</Text> {userProfile.healthDetails.allergies}</Text>
                <Text style={styles.savedText}><Text style={{fontWeight: 'bold'}}>Medications:</Text> {userProfile.healthDetails.medications}</Text>
                <Text style={styles.savedText}><Text style={{fontWeight: 'bold'}}>Medical History:</Text> {userProfile.healthDetails.medicalHistory}</Text>
              </View>
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
      <CustomModal 
        visible={modalVisible} 
        title="Success" 
        message="Health details have been saved successfully." 
        icon="check-circle" 
        iconColor={COLORS.success} 
        onConfirm={() => setModalVisible(false)} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    flex: 1,
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
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  saveButton: {
    marginTop: 8,
  },
  savedText: {
    fontSize: 15,
    color: COLORS.text,
    marginBottom: 6,
  }
});
