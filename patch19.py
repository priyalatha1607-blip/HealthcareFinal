# 1. Update HomeComponents.tsx to make CentersOfExcellence clickable
comp_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\home\HomeComponents.tsx'
with open(comp_path, 'r', encoding='utf-8') as f:
    comp_content = f.read()

comp_content = comp_content.replace(
'''export const CentersOfExcellence = () => {''',
'''export const CentersOfExcellence = ({ onCenterPress }: { onCenterPress?: (center: any) => void }) => {''')

comp_content = comp_content.replace(
'''        {centers.map((center) => (
          <View key={center.id} style={[styles.doctorCard, { width: 220 }]}>''',
'''        {centers.map((center) => (
          <TouchableOpacity 
            key={center.id} 
            style={[styles.doctorCard, { width: 220 }]}
            onPress={() => onCenterPress && onCenterPress(center)}
          >''')

comp_content = comp_content.replace(
'''            <Text style={[styles.doctorCardSpecialty, { textAlign: 'left' }]}>{center.specialty}</Text>
          </View>
        ))}''',
'''            <Text style={[styles.doctorCardSpecialty, { textAlign: 'left' }]}>{center.specialty}</Text>
          </TouchableOpacity>
        ))}''')

with open(comp_path, 'w', encoding='utf-8') as f:
    f.write(comp_content)


# 2. Update HomeScreen.tsx to handle Center click and show modal
home_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HomeScreen.tsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

if 'CustomModal' not in home_content:
    home_content = home_content.replace(
        '''import { COLORS } from '../constants/colors';''',
        '''import { COLORS } from '../constants/colors';\nimport CustomModal from '../components/CustomModal';'''
    )

home_content = home_content.replace(
'''  const [searchQuery, setSearchQuery] = useState('');''',
'''  const [searchQuery, setSearchQuery] = useState('');
  const [coeModalVisible, setCoeModalVisible] = useState(false);
  const [selectedCoe, setSelectedCoe] = useState<any>(null);''')

home_content = home_content.replace(
'''            <CentersOfExcellence />''',
'''            <CentersOfExcellence onCenterPress={(center) => {
              setSelectedCoe(center);
              setCoeModalVisible(true);
            }} />''')

home_content = home_content.replace(
'''    </SafeAreaView>''',
'''      <CustomModal 
        visible={coeModalVisible} 
        title={selectedCoe?.name || ''} 
        message={Specialty: \n\nAddress: No. 12, Main Road, Chennai.\nContact: 044-12345678} 
        icon="hospital-building" 
        iconColor={selectedCoe?.color || COLORS.primary} 
        onConfirm={() => setCoeModalVisible(false)} 
        confirmText="Close"
      />
    </SafeAreaView>''')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)
