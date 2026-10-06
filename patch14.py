# 1. Update ProfileScreen.tsx
profile_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ProfileScreen.tsx'
with open(profile_path, 'r', encoding='utf-8') as f:
    profile_content = f.read()

import_stmt = '''import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Share, Linking } from 'react-native';'''

profile_content = profile_content.replace(
'''import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, Share } from 'react-native';''',
import_stmt)

profile_content = profile_content.replace(
'''          <AccordionMenu icon="phone-in-talk" label="Contact Us">
            <View style={styles.subMenuItem}>
              <MaterialCommunityIcons name="cellphone" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>1800 309 0309</Text>
            </View>
            <View style={styles.subMenuItem}>
              <MaterialCommunityIcons name="email" size={20} color={ COLORS.infoSecondary } style={styles.subMenuIcon} />
              <Text style={styles.subMenuLabel}>feedback@healthcare.org</Text>
            </View>
          </AccordionMenu>''',
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
          />''')

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_content)
