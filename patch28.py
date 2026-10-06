profile_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ProfileScreen.tsx'
with open(profile_path, 'r', encoding='utf-8') as f:
    profile_content = f.read()

# Insert styles for emergency modal before the last '});'
styles_to_insert = '''  editProfileButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },
  emergencyCard: {
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
  },'''

profile_content = profile_content.replace(
'''  editProfileButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 15,
  },''',
styles_to_insert)

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_content)
