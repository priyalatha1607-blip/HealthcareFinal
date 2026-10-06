profile_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ProfileScreen.tsx'
with open(profile_path, 'r', encoding='utf-8') as f:
    profile_content = f.read()

# Add Modal to imports if not there
if ' Modal,' not in profile_content:
    profile_content = profile_content.replace(
        '''import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Share, Linking } from 'react-native';''',
        '''import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Share, Linking, Modal } from 'react-native';'''
    )

# State for emergency modal
profile_content = profile_content.replace(
'''  const { userProfile, logout } = useAuth();''',
'''  const { userProfile, logout } = useAuth();
  const [emergencyModalVisible, setEmergencyModalVisible] = useState(false);''')

# Replace the Emergency Ambulance MenuItem's onPress
profile_content = profile_content.replace(
'''          <MenuItem 
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
          />''',
'''          <MenuItem 
            icon="ambulance" 
            label="Emergency Ambulance" 
            onPress={() => setEmergencyModalVisible(true)} 
          />''')

# Add the custom emergency modal JSX before the closing </SafeAreaView>
emergency_modal_jsx = '''
      {/* Emergency Modal */}
      <Modal visible={emergencyModalVisible} transparent animationType="slide">
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: COLORS.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <MaterialCommunityIcons name="ambulance" size={28} color={COLORS.errorDark} style={{ marginRight: 12 }} />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.text }}>Emergency Services</Text>
              </View>
              <TouchableOpacity onPress={() => setEmergencyModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.emergencyCard} onPress={() => Linking.openURL('tel:108')}>
              <View style={{ flex: 1 }}>
                <Text style={styles.emergencyTitle}>Government Ambulance (108)</Text>
                <Text style={styles.emergencyDesc}>Free emergency service</Text>
              </View>
              <View style={styles.callCircle}>
                <MaterialCommunityIcons name="phone" size={20} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergencyCard} onPress={() => Linking.openURL('tel:04412345678')}>
              <View style={{ flex: 1 }}>
                <Text style={styles.emergencyTitle}>Apollo Emergency Care</Text>
                <Text style={styles.emergencyDesc}>Private Hospital Ambulance</Text>
              </View>
              <View style={styles.callCircle}>
                <MaterialCommunityIcons name="phone" size={20} color={COLORS.white} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.emergencyCard} onPress={() => Linking.openURL('tel:9988776655')}>
              <View style={{ flex: 1 }}>
                <Text style={styles.emergencyTitle}>City Fast Rescue</Text>
                <Text style={styles.emergencyDesc}>24/7 Private Ambulance Service</Text>
              </View>
              <View style={styles.callCircle}>
                <MaterialCommunityIcons name="phone" size={20} color={COLORS.white} />
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
'''

profile_content = profile_content.replace(
'''    </SafeAreaView>''',
emergency_modal_jsx + '\n    </SafeAreaView>')

# Add styles for the new emergency modal
profile_content = profile_content.replace(
'''});''',
'''  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  emergencyDesc: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  callCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
});''')

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_content)
