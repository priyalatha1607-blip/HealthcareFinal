# 1. Update notificationService.tsx
ns_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\services\notificationService.tsx'
with open(ns_path, 'r', encoding='utf-8') as f:
    ns_content = f.read()

import_stmt = '''import { Alert, Platform } from 'react-native';\n'''
if 'Alert' not in ns_content:
    ns_content = import_stmt + ns_content

ns_content = ns_content.replace(
'''  if (!Device.isDevice) {
    console.log("Push notifications require a physical device.");
    return;
  }''',
'''  if (!Device.isDevice) {
    console.log("Push notifications require a physical device.");
    Alert.alert("Error", "Push notifications require a physical device. Please test on a real phone.");
    // Allow Android emulators to try anyway (sometimes it works)
    if (Platform.OS === 'ios') return;
  }''')

ns_content = ns_content.replace(
'''  if (finalStatus !== "granted") {
    console.log("Notification permission denied.");
    return;
  }''',
'''  if (finalStatus !== "granted") {
    console.log("Notification permission denied.");
    Alert.alert("Permission Denied", "Push notification permissions are required to get a token.");
    return;
  }''')

ns_content = ns_content.replace(
'''  if (!projectId) {
    console.log("Project ID not found.");
    return;
  }''',
'''  if (!projectId) {
    console.log("Project ID not found.");
    Alert.alert("Error", "EAS Project ID is missing in app.json.");
    return;
  }''')

ns_content = ns_content.replace(
'''  const token = (
    await Notifications.getExpoPushTokenAsync({
      projectId,
    })
  ).data;

  console.log("Expo Push Token:", token);''',
'''  try {
    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;

    console.log("Expo Push Token:", token);
    Alert.alert("Push Token Generated!", token);
    return token;
  } catch (error: any) {
    console.log("Error getting token", error);
    Alert.alert("Error Getting Token", error?.message || "Unknown error occurred while getting push token.");
  }''')

with open(ns_path, 'w', encoding='utf-8') as f:
    f.write(ns_content)

