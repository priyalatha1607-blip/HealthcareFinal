import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Share, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import CustomModal from '../components/CustomModal';

const MenuItem = ({ icon, label, onPress, color = COLORS.infoSecondary }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconContainer}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const AccordionMenu = ({ icon, label, children, color = COLORS.infoSecondary }: any) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.menuItem} onPress={() => setExpanded(!expanded)}>
        <View style={styles.menuIconContainer}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <Text style={styles.menuLabel}>{label}</Text>
        <MaterialCommunityIcons name={expanded ? "chevron-up" : "chevron-down"} size={24} color={COLORS.textLight} />
      </TouchableOpacity>
      {expanded && <View style={styles.accordionContent}>{children}</View>}
    </View>
  );
};

export default function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { userProfile: userDetails } = useAuth();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = () => {
    setLogoutModalVisible(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this awesome Healthcare App! Book appointments with top doctors instantly.',
      });
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Hello {userDetails.name ? userDetails.name.split(' ')[0] : 'User'}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {userDetails.avatar ? <Image source={{ uri: userDetails.avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} /> : <MaterialCommunityIcons name="account" size={60} color={COLORS.primary} />}
            <TouchableOpacity style={styles.editAvatarButton} onPress={() => navigation.navigate('EditProfile')}>
              <MaterialCommunityIcons name="camera" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userDetails.name}</Text>
          <Text style={styles.userEmailHeader}>{userDetails.email}</Text>
        </View>

        <View style={styles.menuSection}>
          <AccordionMenu icon="account-details" label="Personal Details">
            <View style={styles.infoRow}>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Name</Text>
                <Text style={styles.infoValue}>{userDetails.name}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Email ID</Text>
                <Text style={styles.infoValue}>{userDetails.email}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Phone Number</Text>
                <Text style={styles.infoValue}>{userDetails.phone}</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoValue}>{userDetails.age} Years</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('EditProfile')}>
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </AccordionMenu>

          <MenuItem icon="heart-pulse" label="Health Details" onPress={() => navigation.navigate('HealthDetails')} />

          <MenuItem icon="message-star" label="Feedback" onPress={() => navigation.navigate('Feedback')} />
          
          <MenuItem 
            icon="ambulance" 
            label="Emergency Ambulance" 
            onPress={() => {
              Alert.alert(
                "Emergency", 
                "Are you sure you want to call an Ambulance?", 
                [
                  { text: "Cancel", style: "cancel" },
                  { text: "Call Now", style: "destructive", onPress: () => Linking.openURL('tel:108') }
                ]
              );
            }} 
          />

          <AccordionMenu icon="cog" label="Settings">
            <TouchableOpacity style={styles.subMenuItem} onPress={handleShare}>
              <MaterialCommunityIcons name="share-variant" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('TermsOfUse')}>
              <MaterialCommunityIcons name="clipboard-text" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Terms of Use</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
              <MaterialCommunityIcons name="shield-lock" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('HealthConsent')}>
              <MaterialCommunityIcons name="clipboard-check" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>Health Records Consent</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={() => navigation.navigate('AboutUs')}>
              <MaterialCommunityIcons name="information" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>About Us</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subMenuItem} onPress={handleLogout}>
              <MaterialCommunityIcons name="power" size={20} color={ COLORS.errorDark } style={styles.subMenuIcon} />
              <Text style={[styles.subMenuLabel, { color: COLORS.errorDark }]}>Logout</Text>
            </TouchableOpacity>
          </AccordionMenu>
        </View>
      </ScrollView>

      <CustomModal
        visible={logoutModalVisible}
        title="Log Out"
        message="Are you sure you want to log out of your account?"
        icon="logout"
        iconColor={ COLORS.errorDark }
        confirmText="Log Out"
        onConfirm={() => {
          setLogoutModalVisible(false);
          navigation.replace('SignIn');
        }}
        cancelText="Cancel"
        onCancel={() => setLogoutModalVisible(false)}
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
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
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.primary,
    position: 'relative',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  userEmailHeader: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  menuSection: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.infoBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  accordionContainer: {
    // optional bottom border if needed
  },
  accordionContent: {
    paddingLeft: 76,
    paddingRight: 20,
    paddingBottom: 16,
  },
  subMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  subMenuIcon: {
    marginRight: 16,
  },
  subMenuLabel: {
    fontSize: 15,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDivider,
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
  },
  editProfileButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  editProfileButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },
});
