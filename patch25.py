import re

listener_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\components\AppNotificationListener.tsx'
with open(listener_path, 'r', encoding='utf-8') as f:
    listener_content = f.read()

# Change the dependency array
listener_content = listener_content.replace(
'''  }, [addNotification]);''',
'''  }, []);''')

with open(listener_path, 'w', encoding='utf-8') as f:
    f.write(listener_content)
