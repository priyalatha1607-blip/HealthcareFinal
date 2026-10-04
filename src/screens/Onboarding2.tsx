import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding2'>;
};

const ONBOARDING_SPECIALIST_IMAGE_URL = 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80';

export default function Onboarding2({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="hand-heart" size={32} color={COLORS.primary} style={{ marginRight: 8 }} />
        <Text style={styles.title}>Healthcare</Text>
      </View>
      
      <View style={styles.content}>
        <Image 
          source={{ uri: ONBOARDING_SPECIALIST_IMAGE_URL }} 
          style={styles.doctorImage} 
        />
        <Text style={styles.subtitle}>Find your specialist and book an appointment with ease</Text>
      </View>

      <View style={styles.footer}>
        <CustomButton 
          title="Sign In" 
          onPress={() => navigation.navigate('SignIn')} 
        />
        
        <CustomButton 
          title="Sign Up" 
          variant="outline"
          onPress={() => navigation.navigate('SignUp')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    marginBottom: 32,
    gap: 16,
  },
});
