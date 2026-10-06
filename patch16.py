# 1. Update HomeComponents.tsx
comp_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\home\HomeComponents.tsx'
with open(comp_path, 'r', encoding='utf-8') as f:
    comp_content = f.read()

coe_component = '''
export const CentersOfExcellence = () => {
  const centers = [
    { id: '1', name: 'Adyar Cancer Institute', specialty: 'Best for Oncology', icon: 'ribbon', rating: '4.9', bg: COLORS.errorLight, color: COLORS.errorDark },
    { id: '2', name: 'Apollo Hospitals', specialty: 'Best for Cardiology', icon: 'heart-pulse', rating: '4.8', bg: COLORS.infoBackground, color: COLORS.info },
    { id: '3', name: 'MIOT International', specialty: 'Best for Orthopedics', icon: 'bone', rating: '4.7', bg: COLORS.orangeLight, color: COLORS.orangeDark },
    { id: '4', name: 'Neuro Foundation', specialty: 'Best for Neurology', icon: 'brain', rating: '4.8', bg: COLORS.tealLight, color: COLORS.tealDark },
  ];
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Specialty Centers</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
        {centers.map((center) => (
          <View key={center.id} style={[styles.doctorCard, { width: 220 }]}>
            <View style={[styles.categoryIconContainer, { backgroundColor: center.bg, alignSelf: 'flex-start', marginBottom: 12 }]}>
              <MaterialCommunityIcons name={center.icon as any} size={28} color={center.color} />
            </View>
            <View style={{ position: 'absolute', top: 16, right: 16, flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="star" size={14} color={COLORS.star} />
              <Text style={styles.ratingText}>{center.rating}</Text>
            </View>
            <Text style={[styles.doctorCardName, { textAlign: 'left', marginTop: 4 }]} numberOfLines={1}>{center.name}</Text>
            <Text style={[styles.doctorCardSpecialty, { textAlign: 'left' }]}>{center.specialty}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
'''

comp_content = comp_content.replace(
'''export const TopDoctors = ({ topDoctors, navigation }: any) => (''',
coe_component + '\nexport const TopDoctors = ({ topDoctors, navigation }: any) => (')

with open(comp_path, 'w', encoding='utf-8') as f:
    f.write(comp_content)


# 2. Update HomeScreen.tsx
home_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HomeScreen.tsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

home_content = home_content.replace(
'''  Categories, 
  TopDoctors, ''',
'''  Categories, 
  CentersOfExcellence,
  TopDoctors, ''')

home_content = home_content.replace(
'''const categories = [
  { id: '1', name: 'Dental', icon: 'tooth', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '2', name: 'Heart', icon: 'heart-pulse', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '3', name: 'Eye', icon: 'eye', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '4', name: 'Brain', icon: 'brain', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '5', name: 'Bone', icon: 'bone', color: COLORS.primaryLight, iconColor: COLORS.primary },
];''',
'''const categories = [
  { id: '1', name: 'Oncology', icon: 'ribbon', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '2', name: 'Cardiology', icon: 'heart-pulse', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '3', name: 'Neurology', icon: 'brain', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '4', name: 'Orthopedics', icon: 'bone', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '5', name: 'Gynecology', icon: 'gender-female', color: COLORS.primaryLight, iconColor: COLORS.primary },
];''')

home_content = home_content.replace(
'''        <Categories categories={categories} navigation={navigation} />
        
        <TopDoctors topDoctors={topDoctors} navigation={navigation} />''',
'''        <Categories categories={categories} navigation={navigation} />
        
        <CentersOfExcellence />

        <TopDoctors topDoctors={topDoctors} navigation={navigation} />''')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)
