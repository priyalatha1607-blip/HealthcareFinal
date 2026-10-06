ns_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\services\notificationService.tsx'
with open(ns_path, 'r', encoding='utf-8') as f:
    ns_content = f.read()

import re

# Remove Alert.alert lines
ns_content = re.sub(r'^\s*Alert\.alert\(.*?\);\s*$', '', ns_content, flags=re.MULTILINE)

with open(ns_path, 'w', encoding='utf-8') as f:
    f.write(ns_content)
