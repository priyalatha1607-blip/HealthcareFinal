import re

book_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\BookAppointmentScreen.tsx'
with open(book_path, 'r', encoding='utf-8') as f:
    book_content = f.read()

# 1. Inject the missing state variables
if 'const [modalVisible' not in book_content:
    book_content = book_content.replace(
        '''const [errors, setErrors] = useState<any>({});''',
        '''const [errors, setErrors] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', icon: 'alert-circle', iconColor: COLORS.errorDark, isSuccess: false });'''
    )

# 2. Replace the Error Alert in handleSubmit
error_alert_pattern = r"Alert\.alert\('Error',\s*'Please fill all required fields correctly\.'\);"
error_alert_replacement = "setModalConfig({ title: 'Validation Error', message: 'Please fill all required fields correctly.', icon: 'alert-circle', iconColor: COLORS.errorDark, isSuccess: false }); setModalVisible(true);"
book_content = re.sub(error_alert_pattern, error_alert_replacement, book_content)

# 3. Replace the Success Alert in handleSubmit
success_alert_pattern = r"Alert\.alert\('Success',\s*'Appointment booked successfully!',\s*\[\s*\{\s*text:\s*'OK',\s*onPress:\s*\(\)\s*=>\s*navigation\.goBack\(\)\s*\}\s*\]\);"
success_alert_replacement = "setModalConfig({ title: 'Success', message: 'Appointment booked successfully!', icon: 'check-circle', iconColor: COLORS.success, isSuccess: true }); setModalVisible(true);"
book_content = re.sub(success_alert_pattern, success_alert_replacement, book_content)

with open(book_path, 'w', encoding='utf-8') as f:
    f.write(book_content)
