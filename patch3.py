import os

# 1. Create FeedbackScreen.tsx
feedback_code = '''import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { COLORS } from '../constants/colors';

const dummyFeedback = [
  { id: '1', user: 'Ramesh K.', rating: 5, date: 'Oct 02, 2026', text: 'This app is very helpful for booking appointments quickly.', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', user: 'Anita S.', rating: 4, date: 'Sep 28, 2026', text: 'Good experience, but would love more specialists.', avatar: 'https://i.pravatar.cc/150?img=5' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Feedback'>;
};

export default function FeedbackScreen({ navigation }: Props) {
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return;
    }
    if (!feedbackText.trim()) {
      Alert.alert('Feedback Required', 'Please write your feedback before submitting.');
      return;
    }
    Alert.alert('Thank You!', 'Your feedback has been submitted successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>App Feedback</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Submit Feedback Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>How was your experience?</Text>
            <Text style={styles.sectionSubtitle}>Rate your overall experience using our Healthcare app</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <MaterialCommunityIcons 
                    name={star <= rating ? "star" : "star-outline"} 
                    size={40} 
                    color={star <= rating ? "#FFD700" : "#E0E0E0"} 
                    style={styles.starIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Tell us what you liked or how we can improve..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={feedbackText}
                onChangeText={setFeedbackText}
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>

          {/* Existing Feedback Section */}
          <Text style={[styles.sectionTitle, { marginLeft: 4, marginTop: 10, marginBottom: 12 }]}>Recent Reviews</Text>
          
          {dummyFeedback.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: item.avatar }} style={styles.reviewerAvatar} />
                <View style={styles.reviewerInfo}>
                  <Text style={styles.reviewerName}>{item.user}</Text>
                  <Text style={styles.reviewDate}>{item.date}</Text>
                </View>
                <View style={styles.reviewRatingBadge}>
                  <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                  <Text style={styles.reviewRatingText}>{item.rating}</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{item.text}</Text>
            </View>
          ))}
          
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  starIcon: {
    marginHorizontal: 8,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    padding: 4,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    padding: 12,
    fontSize: 15,
    color: COLORS.text,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  reviewRatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRatingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FBC02D',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  }
});
'''

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\FeedbackScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(feedback_code)

# 2. Update types.ts
types_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\navigation\types.ts'
with open(types_path, 'r', encoding='utf-8') as f:
    types_content = f.read()

types_content = types_content.replace(
'''  HealthDetails: undefined;''',
'''  HealthDetails: undefined;
  Feedback: undefined;''')

with open(types_path, 'w', encoding='utf-8') as f:
    f.write(types_content)

# 3. Update AppNavigator.tsx
nav_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\navigation\AppNavigator.tsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = nav_content.replace(
'''import DoctorProfileScreen from '../../screens/DoctorProfileScreen';''',
'''import DoctorProfileScreen from '../../screens/DoctorProfileScreen';
import FeedbackScreen from '../../screens/FeedbackScreen';''')

nav_content = nav_content.replace(
'''      <Stack.Screen name="HealthDetails" component={HealthDetailsScreen} options={{ headerShown: false }} />''',
'''      <Stack.Screen name="HealthDetails" component={HealthDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />''')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

# 4. Update ProfileScreen.tsx
profile_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ProfileScreen.tsx'
with open(profile_path, 'r', encoding='utf-8') as f:
    profile_content = f.read()

profile_content = profile_content.replace(
'''<MenuItem icon="message-star" label="Feedback" onPress={() => {}} />''',
'''<MenuItem icon="message-star" label="Feedback" onPress={() => navigation.navigate('Feedback')} />''')

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_content)

