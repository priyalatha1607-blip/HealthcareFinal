import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../components/navigation/types';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConsultDoctor'>;
  route: RouteProp<RootStackParamList, 'ConsultDoctor'>;
};

const languages = ['English', 'Tamil', 'Hindi', 'Malayalam', 'Telugu'];

const healthIssuesList = [
  { id: '1', name: 'General Physician', icon: 'stethoscope', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '2', name: 'Orthopedist', icon: 'bone', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '3', name: 'Dermatologist', icon: 'face-man-shimmer', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '4', name: 'ENT Specialist', icon: 'ear-hearing', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '5', name: 'Pediatrician', icon: 'baby-bottle-outline', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '6', name: 'Cardiologist', icon: 'heart-pulse', color: COLORS.primaryLight, iconColor: COLORS.primary },
];

const getDoctorForIssue = (issueName: string) => {
  switch(issueName) {
    case 'General Physician': return { name: 'Dr. Richard Lee', exp: '15 Years', img: 'https://i.pravatar.cc/150?img=12' };
    case 'Orthopedist': return { name: 'Dr. Sarah Johnson', exp: '10 Years', img: 'https://i.pravatar.cc/150?img=47' };
    case 'Dermatologist': return { name: 'Dr. Michael Chen', exp: '8 Years', img: 'https://i.pravatar.cc/150?img=11' };
    case 'ENT Specialist': return { name: 'Dr. Emily Davis', exp: '12 Years', img: 'https://i.pravatar.cc/150?img=5' };
    case 'Pediatrician': return { name: 'Dr. Emily Chen', exp: '10 Years', img: 'https://i.pravatar.cc/150?img=32' };
    case 'Cardiologist': return { name: 'Dr. Jane Smith', exp: '18 Years', img: 'https://i.pravatar.cc/150?img=44' };
    default: return { name: 'Dr. Abu Saifuddin', exp: '15 Years', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop' };
  }
};
export default function ConsultDoctorScreen({ navigation, route }: Props) {
  const { issue } = route.params;
  const isGenericConsult = issue === 'Video Consult' || issue === 'Audio Consult';
  
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedSpecificIssue, setSelectedSpecificIssue] = useState<string | null>(isGenericConsult ? null : issue);

  const doctor = selectedSpecificIssue ? getDoctorForIssue(selectedSpecificIssue) : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => {
          if (isGenericConsult && selectedSpecificIssue) {
            setSelectedSpecificIssue(null);
          } else {
            navigation.goBack();
          }
        }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{isGenericConsult && !selectedSpecificIssue ? `${issue}` : `${selectedSpecificIssue || issue} Consultation`}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {isGenericConsult && !selectedSpecificIssue ? (
          <View style={styles.healthIssueSection}>
            <Text style={styles.sectionTitle}>What's your health issue?</Text>
            <View style={styles.issueGrid}>
              {healthIssuesList.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.issueSelectCard}
                  onPress={() => setSelectedSpecificIssue(item.name)}
                >
                  <View style={[styles.issueIconContainer, { backgroundColor: item.color }]}>
                    <MaterialCommunityIcons name={item.icon as any} size={32} color={item.iconColor} />
                  </View>
                  <Text style={styles.issueSelectName}>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <>
            <View style={styles.doctorSection}>
              <Text style={styles.sectionTitle}>Available Specialist</Text>
              <View style={styles.doctorCard}>
                <Image 
                  source={{ uri: doctor?.img || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop' }} 
                  style={styles.doctorImage} 
                />
                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>{doctor?.name || 'Dr. Abu Saifuddin'}</Text>
                  <Text style={styles.doctorSpecialty}>{selectedSpecificIssue}</Text>
                  <View style={styles.ratingRow}>
                    <MaterialCommunityIcons name="star" size={16} color={COLORS.warning} />
                    <Text style={styles.ratingText}>4.9 (120+ reviews)</Text>
                  </View>
                  <Text style={styles.experienceText}>{doctor?.exp || '15 Years'} Experience</Text>
                </View>
              </View>
            </View>
            <View style={styles.languageSection}>
              <Text style={styles.sectionTitle}>Select Preferred Language</Text>
              <Text style={styles.sectionSubtitle}>The doctor will consult you in this language</Text>
              
              <View style={styles.languageGrid}>
                {languages.map((lang) => (
                  <TouchableOpacity
                    key={lang}
                    style={[
                      styles.languageChip,
                      selectedLanguage === lang && styles.languageChipActive
                    ]}
                    onPress={() => setSelectedLanguage(lang)}
                  >
                    <Text style={[
                      styles.languageText,
                      selectedLanguage === lang && styles.languageTextActive
                    ]}>
                      {lang}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.detailsSection}>
              <Text style={styles.sectionTitle}>Consultation Details</Text>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="clock-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.detailText}>Wait time: ~5 mins</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name={issue === 'Video Consult' ? 'video-outline' : 'phone-outline'} size={20} color={COLORS.textLight} />
                <Text style={styles.detailText}>Secure & Private {issue === 'Video Consult' ? 'Video' : 'Audio'} Consultation</Text>
              </View>
              <View style={styles.detailRow}>
                <MaterialCommunityIcons name="file-document-outline" size={20} color={COLORS.textLight} />
                <Text style={styles.detailText}>Get valid digital prescription</Text>
              </View>
            </View>
            
            <View style={{ height: 100 }} />
          </>
        )}
      </ScrollView>
      
      {(!isGenericConsult || selectedSpecificIssue) && (
        <View style={styles.footer}>
          <View style={styles.feeContainer}>
            <Text style={styles.feeLabel}>Consultation Fee</Text>
            <Text style={styles.feeAmount}>₹499</Text>
          </View>
          <TouchableOpacity 
            style={styles.payButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.payButtonText}>Pay & Consult</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryDark,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  doctorSection: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundLight,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  experienceText: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  languageSection: {
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: -8,
    marginBottom: 16,
  },
  languageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  languageChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
  },
  languageChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  languageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  languageTextActive: {
    color: COLORS.white,
  },
  detailsSection: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  feeContainer: {
    flex: 1,
  },
  feeLabel: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  feeAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  healthIssueSection: {
    padding: 20,
    backgroundColor: COLORS.white,
  },
  issueGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  issueSelectCard: {
    width: '48%',
    backgroundColor: COLORS.backgroundCard,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  issueIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  issueSelectName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
  },
});
