with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

target = '''  useEffect(() => {
    if (route?.params?.category) {
      setSearchQuery(route.params.category);
    }
  }, [route?.params?.category]);'''

replacement = '''  useEffect(() => {
    if (route?.params?.category) {
      setSearchQuery(route.params.category);
    }
  }, [route?.params?.category]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', () => {
      setSearchQuery('');
      navigation.setParams({ category: undefined });
    });
    return unsubscribe;
  }, [navigation]);'''

if target in content:
    content = content.replace(target, replacement)
else:
    # try replacing line by line or ignoring \r
    content = content.replace(target.replace('\n', '\r\n'), replacement.replace('\n', '\r\n'))

with open(r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorScreen.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
