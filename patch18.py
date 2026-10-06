# 1. Update HomeScreen.tsx
home_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HomeScreen.tsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

home_content = home_content.replace(
'''            <Categories categories={categories} navigation={navigation} />
            <TopDoctors topDoctors={topDoctors} navigation={navigation} />''',
'''            <Categories categories={categories} navigation={navigation} />
            <CentersOfExcellence />
            <TopDoctors topDoctors={topDoctors} navigation={navigation} />''')

home_content = home_content.replace(
'''const categories = [
  { id: '1', name: 'Oncology', icon: 'ribbon', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '2', name: 'Cardiology', icon: 'heart-pulse', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '3', name: 'Neurology', icon: 'brain', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '4', name: 'Orthopedics', icon: 'bone', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '5', name: 'Gynecology', icon: 'gender-female', color: COLORS.primaryLight, iconColor: COLORS.primary },
];''',
'''const categories = [
  { id: '1', name: 'Oncology', icon: 'ribbon', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '2', name: 'Cardiology', icon: 'heart-pulse', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '3', name: 'Neurology', icon: 'brain', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '4', name: 'Orthopedics', icon: 'bone', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '5', name: 'Gynecology', icon: 'gender-female', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '6', name: 'Pediatrics', icon: 'baby-bottle-outline', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '7', name: 'Dermatology', icon: 'face-man', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '8', name: 'Dentistry', icon: 'tooth', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '9', name: 'Ophthalmology', icon: 'eye', color: COLORS.primaryLight, iconColor: COLORS.primary },
  { id: '10', name: 'Psychiatry', icon: 'head-lightbulb', color: COLORS.primaryLight, iconColor: COLORS.primary },
];''')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)


# 2. Update DoctorScreen.tsx
doc_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx'
with open(doc_path, 'r', encoding='utf-8') as f:
    doc_content = f.read()

doc_content = doc_content.replace(
'''searchTerms: ['brain', 'neuromedicine', 'neurologist']''',
'''searchTerms: ['brain', 'neuromedicine', 'neurologist', 'neurology']''')

doc_content = doc_content.replace(
'''searchTerms: ['gynae', 'obstetrics']''',
'''searchTerms: ['gynae', 'obstetrics', 'gynecology', 'women']''')

doc_content = doc_content.replace(
'''searchTerms: ['brain', 'tumor']''',
'''searchTerms: ['brain', 'tumor', 'neurology', 'oncology']''')

doc_content = doc_content.replace(
'''searchTerms: ['heart', 'cardiologist']''',
'''searchTerms: ['heart', 'cardiologist', 'cardiology']''')

doc_content = doc_content.replace(
'''searchTerms: ['brain', 'neurologist']''',
'''searchTerms: ['brain', 'neurologist', 'neurology', 'psychiatry']''')

doc_content = doc_content.replace(
'''searchTerms: ['dental', 'dentist', 'teeth']''',
'''searchTerms: ['dental', 'dentist', 'teeth', 'dentistry']''')

doc_content = doc_content.replace(
'''searchTerms: ['eye', 'ophthalmologist', 'vision']''',
'''searchTerms: ['eye', 'ophthalmologist', 'vision', 'ophthalmology']''')

doc_content = doc_content.replace(
'''searchTerms: ['bone', 'orthopedist', 'ortho']''',
'''searchTerms: ['bone', 'orthopedist', 'ortho', 'orthopedics']''')

doc_content = doc_content.replace(
'''searchTerms: ['dental', 'dentist']''',
'''searchTerms: ['dental', 'dentist', 'pediatrics', 'dermatology']''')

with open(doc_path, 'w', encoding='utf-8') as f:
    f.write(doc_content)
