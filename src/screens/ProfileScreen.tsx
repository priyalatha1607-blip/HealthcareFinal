import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const userDetails = {
    name: 'priya',
    email: 'priya@gmail.com',
    phone: '91-8525084862',
    age: '29',
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: () => navigation.replace('SignIn')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.editHeaderButton} onPress={() => navigation.navigate('EditProfile')}>
          <MaterialCommunityIcons name="square-edit-outline" size={24} color="#00796B" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <MaterialCommunityIcons name="account" size={60} color="#00796B" />
            <TouchableOpacity style={styles.editAvatarButton} onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name="camera" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <Text style={styles.userEmailHeader}>{userDetails.email}</Text>
          
          <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="account-outline" size={24} color="#666" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{userDetails.name}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email-outline" size={24} color="#666" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email ID</Text>
              <Text style={styles.infoValue}>{userDetails.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="phone-outline" size={24} color="#666" style={styles.infoIcon} />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>{userDetails.phone}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="calendar-account-outline" size={24} color="#666" style={styles.infoIcon} />
            <View style={[styles.infoContent, { borderBottomWidth: 0 }]}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{userDetails.age} Years</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionMenu} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.actionMenuLeft}>
              <MaterialCommunityIcons name="cog-outline" size={24} color="#555" />
              <Text style={styles.actionMenuText}>Settings</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionMenu} onPress={() => navigation.navigate('HelpSupport')}>
            <View style={styles.actionMenuLeft}>
              <MaterialCommunityIcons name="help-circle-outline" size={24} color="#555" />
              <Text style={styles.actionMenuText}>Help & Support</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionMenu, { borderBottomWidth: 0 }]} onPress={handleLogout}>
            <View style={styles.actionMenuLeft}>
              <MaterialCommunityIcons name="logout" size={24} color="#E53935" />
              <Text style={[styles.actionMenuText, { color: '#E53935' }]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  editHeaderButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0f2f1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#00796B',
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#00796B',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmailHeader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  editProfileButton: {
    backgroundColor: '#00796B',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 16,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 12,
  },
  infoContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  actionMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionMenuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionMenuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    fontWeight: '500',
  },
});
