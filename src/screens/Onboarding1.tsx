import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../constants/colors';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding1'>;
};

const ONBOARDING_WELCOME_IMAGE_URL = 'https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?w=800&q=80';

export default function Onboarding1({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.centerWrapper}>
        <View style={styles.logoPlaceholder}>
          <MaterialCommunityIcons name="hand-heart" size={56} color={COLORS.primary} />
        </View>
        <Text style={styles.title}>Healthcare</Text>
        <Image 
          source={{ uri: ONBOARDING_WELCOME_IMAGE_URL }} 
          style={{ width: 220, height: 220, resizeMode: 'contain', marginTop: 30 }} 
        />
        <CustomButton 
          title="Next" 
          onPress={() => navigation.navigate('Onboarding2')} 
          style={{ marginTop: 40, width: '100%' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    padding: 24,
  },
  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.tealLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
});
