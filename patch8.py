# 1. Update ProfileScreen.tsx
profile_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\ProfileScreen.tsx'
with open(profile_path, 'r', encoding='utf-8') as f:
    profile_content = f.read()

profile_content = profile_content.replace(
'''<View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Hello {userDetails.name ? userDetails.name.split(' ')[0] : 'User'}</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color={COLORS.primary} style={{ marginLeft: 4 }} />
        </View>''',
'''<View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Hello {userDetails.name ? userDetails.name.split(' ')[0] : 'User'}</Text>
        </View>''')

with open(profile_path, 'w', encoding='utf-8') as f:
    f.write(profile_content)

# 2. Update HomeScreen.tsx
home_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HomeScreen.tsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

home_content = home_content.replace(
'''  const { email } = useAuth();''',
'''  const { email, userProfile } = useAuth();''')

home_content = home_content.replace(
'''        <HomeHeader 
          userName={email ? email.split('@')[0] : 'Guest'} 
          unreadCount={unreadCount} ''',
'''        <HomeHeader 
          userName={userProfile?.name ? userProfile.name.split(' ')[0] : (email ? email.split('@')[0] : 'Guest')} 
          unreadCount={unreadCount} ''')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)

