consult_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ConsultDoctorScreen.tsx'
with open(consult_path, 'r', encoding='utf-8') as f:
    consult_content = f.read()

# Make sure useSafeAreaInsets is imported from react-native-safe-area-context
if 'useSafeAreaInsets' not in consult_content:
    consult_content = consult_content.replace(
        '''import { SafeAreaView } from 'react-native-safe-area-context';''',
        '''import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';'''
    )

# Get insets inside the component
consult_content = consult_content.replace(
'''export default function ConsultDoctorScreen({ route, navigation }: Props) {
  const { doctor } = route.params;''',
'''export default function ConsultDoctorScreen({ route, navigation }: Props) {
  const { doctor } = route.params;
  const insets = useSafeAreaInsets();''')

# Apply bottom padding to the footer
consult_content = consult_content.replace(
'''      {/* Bottom Action */}
      <View style={styles.footer}>''',
'''      {/* Bottom Action */}
      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>''')

with open(consult_path, 'w', encoding='utf-8') as f:
    f.write(consult_content)
