import re

# 1. Update DoctorProfileScreen.tsx
with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorProfileScreen.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''import { SafeAreaView } from 'react-native-safe-area-context';''',
'''import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';''')

content = content.replace(
'''  const { doctor } = route.params || {};''',
'''  const { doctor } = route.params || {};
  const insets = useSafeAreaInsets();''')

content = content.replace(
'''        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>10+</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>500+</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
        </View>''',
'''        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{doctor.experience || '12+'}</Text>
            <Text style={styles.statLabel}>Years Experience</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{doctor.patients || '730+'}</Text>
            <Text style={styles.statLabel}>Patients</Text>
          </View>
        </View>''')

content = content.replace(
'''      {/* Footer Action */}
      <View style={styles.footer}>''',
'''      {/* Footer Action */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorProfileScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Update HomeScreen.tsx
with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HomeScreen.tsx', 'r', encoding='utf-8') as f:
    home_content = f.read()

home_content = home_content.replace(
'''const topDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', clinic: 'HeartCare Hospital', rating: '4.9', reviews: 120, image: 'https://i.pravatar.cc/150?img=47' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', clinic: 'Kids Wellness Center', rating: '4.7', reviews: 200, image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Richard Lee', specialty: 'General Practitioner', clinic: 'City Health Clinic', rating: '4.6', reviews: 150, image: 'https://i.pravatar.cc/150?img=12' },
];''',
'''const topDoctors = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', clinic: 'HeartCare Hospital', rating: '4.9', reviews: 120, experience: '15+', patients: '1.2k+', image: 'https://i.pravatar.cc/150?img=47' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', clinic: 'Kids Wellness Center', rating: '4.7', reviews: 200, experience: '8+', patients: '850+', image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Richard Lee', specialty: 'General Practitioner', clinic: 'City Health Clinic', rating: '4.6', reviews: 150, experience: '11+', patients: '950+', image: 'https://i.pravatar.cc/150?img=12' },
];''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HomeScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(home_content)

# 3. Update DoctorScreen.tsx
with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx', 'r', encoding='utf-8') as f:
    doc_content = f.read()

doc_content = doc_content.replace(
'''const allDoctors = [
  { id: '1', name: 'Dr. Abu Saifuddin', position: 'Assistant Professor', specialty: 'Neuromedicine', degree: 'MD , M.PHIL, PHD', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop', searchTerms: ['brain', 'neuromedicine', 'neurologist'] },
  { id: '2', name: 'Dr. James Merry', position: 'Assistant Professor', specialty: 'Gynae and Obs', degree: 'MD ,M.PHIL, PHD', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop', searchTerms: ['gynae', 'obstetrics'] },
  { id: '3', name: 'Dr. William Henry', position: 'Assistant Professor', specialty: 'Brain Tumor', degree: 'MD ,M.PHIL, PHD', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop', searchTerms: ['brain', 'tumor'] },
  { id: '4', name: 'Dr. Jane Smith', position: 'Senior Consultant', specialty: 'Cardiologist', degree: 'MBBS, MD', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop', searchTerms: ['heart', 'cardiologist'] },
  { id: '5', name: 'Dr. Michael Brown', position: 'Consultant', specialty: 'Neurologist', degree: 'MBBS, MD, DM', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop', searchTerms: ['brain', 'neurologist'] },
  { id: '6', name: 'Dr. Mark Davis', position: 'Senior Dentist', specialty: 'Dentist', degree: 'BDS, MDS', image: 'https://images.unsplash.com/photo-1582750433449-648ed127d09e?w=150&h=150&fit=crop', searchTerms: ['dental', 'dentist', 'teeth'] },
  { id: '7', name: 'Dr. Emily Chen', position: 'Consultant', specialty: 'Ophthalmologist', degree: 'MBBS, MS', image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop', searchTerms: ['eye', 'ophthalmologist', 'vision'] },
  { id: '8', name: 'Dr. Sarah Wilson', position: 'Orthopedic Surgeon', specialty: 'Orthopedist', degree: 'MBBS, MS Ortho', image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&h=150&fit=crop', searchTerms: ['bone', 'orthopedist', 'ortho'] },
  { id: '9', name: 'Dr. David Lee', position: 'Consultant Dentist', specialty: 'Orthodontist', degree: 'BDS, MDS', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop', searchTerms: ['dental', 'dentist'] },
  { id: '10', name: 'Dr. Robert Taylor', position: 'Senior Cardiologist', specialty: 'Cardiologist', degree: 'MBBS, MD', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop', searchTerms: ['heart', 'cardiologist'] },
];''',
'''const allDoctors = [
  { id: '1', name: 'Dr. Abu Saifuddin', position: 'Assistant Professor', specialty: 'Neuromedicine', degree: 'MD , M.PHIL, PHD', experience: '14+', patients: '1.5k+', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop', searchTerms: ['brain', 'neuromedicine', 'neurologist'] },
  { id: '2', name: 'Dr. James Merry', position: 'Assistant Professor', specialty: 'Gynae and Obs', degree: 'MD ,M.PHIL, PHD', experience: '12+', patients: '900+', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop', searchTerms: ['gynae', 'obstetrics'] },
  { id: '3', name: 'Dr. William Henry', position: 'Assistant Professor', specialty: 'Brain Tumor', degree: 'MD ,M.PHIL, PHD', experience: '20+', patients: '2.1k+', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&h=150&fit=crop', searchTerms: ['brain', 'tumor'] },
  { id: '4', name: 'Dr. Jane Smith', position: 'Senior Consultant', specialty: 'Cardiologist', degree: 'MBBS, MD', experience: '15+', patients: '1.2k+', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop', searchTerms: ['heart', 'cardiologist'] },
  { id: '5', name: 'Dr. Michael Brown', position: 'Consultant', specialty: 'Neurologist', degree: 'MBBS, MD, DM', experience: '8+', patients: '750+', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop', searchTerms: ['brain', 'neurologist'] },
  { id: '6', name: 'Dr. Mark Davis', position: 'Senior Dentist', specialty: 'Dentist', degree: 'BDS, MDS', experience: '18+', patients: '3k+', image: 'https://images.unsplash.com/photo-1582750433449-648ed127d09e?w=150&h=150&fit=crop', searchTerms: ['dental', 'dentist', 'teeth'] },
  { id: '7', name: 'Dr. Emily Chen', position: 'Consultant', specialty: 'Ophthalmologist', degree: 'MBBS, MS', experience: '8+', patients: '850+', image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=150&h=150&fit=crop', searchTerms: ['eye', 'ophthalmologist', 'vision'] },
  { id: '8', name: 'Dr. Sarah Wilson', position: 'Orthopedic Surgeon', specialty: 'Orthopedist', degree: 'MBBS, MS Ortho', experience: '10+', patients: '600+', image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=150&h=150&fit=crop', searchTerms: ['bone', 'orthopedist', 'ortho'] },
  { id: '9', name: 'Dr. David Lee', position: 'Consultant Dentist', specialty: 'Orthodontist', degree: 'BDS, MDS', experience: '5+', patients: '400+', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop', searchTerms: ['dental', 'dentist'] },
  { id: '10', name: 'Dr. Robert Taylor', position: 'Senior Cardiologist', specialty: 'Cardiologist', degree: 'MBBS, MD', experience: '25+', patients: '5k+', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop', searchTerms: ['heart', 'cardiologist'] },
];''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(doc_content)
