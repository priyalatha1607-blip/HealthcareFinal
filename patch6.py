with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
'''placeholder="Doctors, Clinics, Labs"''',
'''placeholder="Doctors, Clinics"''')

content = content.replace(
'''<MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />''',
'''<MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.text} />''')

content = content.replace(
'''  safeArea: {
    flex: 1,
    backgroundColor: '#009688', // Teal color for header area
  },''',
'''  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },''')

content = content.replace(
'''  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#009688',
  },''',
'''  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },''')

content = content.replace(
'''  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },''',
'''  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
  },''')

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
