# Patch AuthContext
with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\context\AuthContext.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''type UserProfile = {
  name: string;
  email: string;
  phone: string;
  age: string;
  avatar: string | null;
};''',
'''export type HealthDetails = {
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  age: string;
  avatar: string | null;
  healthDetails?: HealthDetails;
};''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\context\AuthContext.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Patch EditProfileScreen
with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\EditProfileScreen.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''  const handleSave = () => {
    setUserProfile({
      name,
      email,
      phone,
      age,
      avatar,
    });
    navigation.goBack();
  };''',
'''  const handleSave = () => {
    setUserProfile({
      ...userProfile,
      name,
      email,
      phone,
      age,
      avatar,
    });
    navigation.goBack();
  };''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\EditProfileScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# Patch HealthDetailsScreen
with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HealthDetailsScreen.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''import CustomButton from '../components/CustomButton';''',
'''import CustomButton from '../components/CustomButton';
import { useAuth } from '../context/AuthContext';''')

content = content.replace(
'''export default function HealthDetailsScreen({ navigation }: Props) {
  const [bloodGroup, setBloodGroup] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  const handleSave = () => {
    // In a real app, you would save this to the backend or context here.
    Alert.alert("Success", "Health details have been saved successfully.", [
      { text: "OK", onPress: () => navigation.goBack() }
    ]);
  };''',
'''export default function HealthDetailsScreen({ navigation }: Props) {
  const { userProfile, setUserProfile } = useAuth();
  
  const [bloodGroup, setBloodGroup] = useState(userProfile.healthDetails?.bloodGroup || '');
  const [height, setHeight] = useState(userProfile.healthDetails?.height || '');
  const [weight, setWeight] = useState(userProfile.healthDetails?.weight || '');
  const [allergies, setAllergies] = useState(userProfile.healthDetails?.allergies || '');
  const [medications, setMedications] = useState(userProfile.healthDetails?.medications || '');
  const [medicalHistory, setMedicalHistory] = useState(userProfile.healthDetails?.medicalHistory || '');

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
    Alert.alert("Success", "Health details have been saved successfully.");
  };''')

content = content.replace(
'''          <CustomButton title="Save Details" onPress={handleSave} style={styles.saveButton} />

        </ScrollView>''',
'''          <CustomButton title="Save Details" onPress={handleSave} style={styles.saveButton} />

          {userProfile.healthDetails && (
            <View style={[styles.card, { marginTop: 20, backgroundColor: '#E8F5E9', borderColor: '#C8E6C9', borderWidth: 1 }]}>
              <Text style={[styles.cardTitle, { color: '#2E7D32', borderBottomWidth: 1, borderBottomColor: '#C8E6C9', paddingBottom: 8 }]}>Saved Health Details</Text>
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

        </ScrollView>''')

content = content.replace(
'''  saveButton: {
    marginTop: 8,
  }
});''',
'''  saveButton: {
    marginTop: 8,
  },
  savedText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  }
});''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HealthDetailsScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

