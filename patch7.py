import os

# 1. Update ProfileScreen.tsx
profile_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ProfileScreen.tsx'
with open(profile_path, 'r', encoding='utf-8') as f:
    profile_content = f.read()

profile_content = profile_content.replace(
'''import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';''',
'''import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Share } from 'react-native';''')

profile_content = profile_content.replace(
'''  const handleLogout = () => {
    setLogoutModalVisible(true);
  };''',
'''  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome Healthcare App! Book appointments with top doctors instantly.',
      });
    } catch (error) {}
  };''')

profile_content = profile_content.replace(
'''<AccordionMenu icon="cog" label="Settings">
            <TouchableOpacity style={styles.subMenuItem}>
              <MaterialCommunityIcons name="share-variant" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem}>
              <MaterialCommunityIcons name="clipboard-text" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Terms of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem}>
              <MaterialCommunityIcons name="shield-lock" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem}>
              <MaterialCommunityIcons name="clipboard-check" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Health Records Consent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem}>
              <MaterialCommunityIcons name="information" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>About Us</Text>
            </TouchableOpacity>''',
'''<AccordionMenu icon="cog" label="Settings">
            <TouchableOpacity style={styles.subMenuItem} onPress={handleShare}>
              <MaterialCommunityIcons name="share-variant" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('TermsOfUse')}>
              <MaterialCommunityIcons name="clipboard-text" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Terms of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
              <MaterialCommunityIcons name="shield-lock" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('HealthConsent')}>
              <MaterialCommunityIcons name="clipboard-check" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Health Records Consent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('AboutUs')}>
              <MaterialCommunityIcons name="information" size={20} color="#1565C0" style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>About Us</Text>
            </TouchableOpacity>''')

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_content)

# 2. Update FeedbackScreen.tsx
feedback_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\FeedbackScreen.tsx'
with open(feedback_path, 'r', encoding='utf-8') as f:
    fb_content = f.read()

fb_content = fb_content.replace(
'''const dummyFeedback = [
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
  };''',
'''const initialFeedback = [
  { id: '1', user: 'Ramesh K.', rating: 5, date: 'Oct 02, 2026', text: 'This app is very helpful for booking appointments quickly.', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', user: 'Anita S.', rating: 4, date: 'Sep 28, 2026', text: 'Good experience, but would love more specialists.', avatar: 'https://i.pravatar.cc/150?img=5' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Feedback'>;
};

export default function FeedbackScreen({ navigation }: Props) {
  const [feedbacks, setFeedbacks] = useState(initialFeedback);
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
    
    const newFeedback = {
      id: Math.random().toString(),
      user: 'You',
      rating,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      text: feedbackText,
      avatar: 'https://i.pravatar.cc/150?img=12'
    };
    
    setFeedbacks([newFeedback, ...feedbacks]);
    setRating(0);
    setFeedbackText('');
    
    Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');
  };''')

fb_content = fb_content.replace(
'''{dummyFeedback.map((item) => (''',
'''{feedbacks.map((item) => (''')

with open(feedback_path, 'w', encoding='utf-8') as f:
    f.write(fb_content)

# 3. Create static screens
static_screen_template = '''import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function {ComponentName}({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{Title}</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.bodyText}>{Content}</Text>
      </ScrollView>
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
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  bodyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
    lineHeight: 24,
  }
});
'''

screens_data = [
    {
        'file': r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\TermsOfUseScreen.tsx',
        'component': 'TermsOfUseScreen',
        'title': 'Terms of Use',
        'content': '''Welcome to our Healthcare App.\n\nBy accessing or using our app, you agree to be bound by these terms of use. \n\n1. Use of Service: Our application allows you to book appointments, consult with doctors, and manage your health records.\n2. User Responsibilities: You are responsible for keeping your health information accurate and protecting your login credentials.\n3. Limitation of Liability: We do not guarantee uninterrupted access to our services and are not liable for any medical decisions made solely based on the app without professional consultation.\n\nPlease review these terms periodically as they may change over time.'''
    },
    {
        'file': r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\PrivacyPolicyScreen.tsx',
        'component': 'PrivacyPolicyScreen',
        'title': 'Privacy Policy',
        'content': '''Your privacy is our priority.\n\n1. Information Collection: We collect personal data including your name, contact details, and medical history when you use our services.\n2. Data Usage: Your data is used exclusively to facilitate medical appointments and provide personalized healthcare recommendations.\n3. Data Security: We implement state-of-the-art encryption protocols to ensure that your sensitive health records are stored securely.\n4. Third-Party Sharing: We do not sell your data. We only share information with your chosen healthcare providers.\n\nFor any privacy concerns, contact our support team.'''
    },
    {
        'file': r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HealthConsentScreen.tsx',
        'component': 'HealthConsentScreen',
        'title': 'Health Records Consent',
        'content': '''Health Records Consent Form\n\nI hereby authorize this healthcare application to collect, store, and process my medical records and health details.\n\nI understand that my information will be shared with doctors and medical professionals I choose to consult through this platform.\n\nI retain the right to revoke this consent at any time through the app settings, after which my health data will no longer be shared for new consultations.'''
    },
    {
        'file': r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\AboutUsScreen.tsx',
        'component': 'AboutUsScreen',
        'title': 'About Us',
        'content': '''Healthcare App\nVersion 1.0.0\n\nWe are dedicated to bridging the gap between patients and top-tier healthcare professionals. Our mission is to make healthcare accessible, reliable, and swift for everyone.\n\nOur platform connects you with experienced specialists, enables seamless appointment bookings, and helps you maintain your health records in one secure place.\n\nThank you for trusting us with your healthcare journey.'''
    }
]

for s in screens_data:
    code = static_screen_template.replace('{ComponentName}', s['component']).replace('{Title}', s['title']).replace('{Content}', s['content'])
    with open(s['file'], 'w', encoding='utf-8') as f:
        f.write(code)

# 4. Update types.ts
types_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\navigation\types.ts'
with open(types_path, 'r', encoding='utf-8') as f:
    types_content = f.read()

types_content = types_content.replace(
'''  Feedback: undefined;''',
'''  Feedback: undefined;
  TermsOfUse: undefined;
  PrivacyPolicy: undefined;
  HealthConsent: undefined;''')

with open(types_path, 'w', encoding='utf-8') as f:
    f.write(types_content)

# 5. Update AppNavigator.tsx
nav_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\navigation\AppNavigator.tsx'
with open(nav_path, 'r', encoding='utf-8') as f:
    nav_content = f.read()

nav_content = nav_content.replace(
'''import FeedbackScreen from '../../screens/FeedbackScreen';''',
'''import FeedbackScreen from '../../screens/FeedbackScreen';
import TermsOfUseScreen from '../../screens/TermsOfUseScreen';
import PrivacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import HealthConsentScreen from '../../screens/HealthConsentScreen';
import AboutUsScreen from '../../screens/AboutUsScreen';''')

nav_content = nav_content.replace(
'''      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />''',
'''      <Stack.Screen name="Feedback" component={FeedbackScreen} options={{ headerShown: false }} />
      <Stack.Screen name="TermsOfUse" component={TermsOfUseScreen} options={{ headerShown: false }} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HealthConsent" component={HealthConsentScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AboutUs" component={AboutUsScreen} options={{ headerShown: false }} />''')

with open(nav_path, 'w', encoding='utf-8') as f:
    f.write(nav_content)

