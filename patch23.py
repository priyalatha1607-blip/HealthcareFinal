# 3. Refactor BookAppointmentScreen.tsx
book_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\BookAppointmentScreen.tsx'
with open(book_path, 'r', encoding='utf-8') as f:
    book_content = f.read()

# Add CustomModal import
if 'CustomModal' not in book_content:
    book_content = book_content.replace(
        '''import { COLORS } from '../constants/colors';''',
        '''import { COLORS } from '../constants/colors';\nimport CustomModal from '../components/CustomModal';'''
    )

# Add Modal State
book_content = book_content.replace(
'''  const [errors, setErrors] = useState<Record<string, string>>({});''',
'''  const [errors, setErrors] = useState<Record<string, string>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', icon: 'alert-circle', iconColor: COLORS.errorDark });''')

# Replace validation alerts
book_content = book_content.replace(
'''Alert.alert('Validation Error', 'Please fix the errors in the form.');''',
'''setModalConfig({ title: 'Validation Error', message: 'Please fix the errors in the form.', icon: 'alert-circle', iconColor: COLORS.errorDark }); setModalVisible(true);''')

# Replace success alert
book_content = book_content.replace(
'''    Alert.alert(
      'Success',
      'Your appointment has been booked successfully.',
      [
        {
          text: 'OK',
          onPress: () => navigation.replace('MainTabs', { screen: 'Appointments' })
        }
      ]
    );''',
'''    setModalConfig({ title: 'Success', message: 'Your appointment has been booked successfully.', icon: 'check-circle', iconColor: COLORS.success });
    setModalVisible(true);''')

# We also need to change the CustomModal onConfirm behavior depending on whether it's success or error.
# If success, navigate. If error, just close.
# Let's add a state isSuccess to handle the navigation in onConfirm.
book_content = book_content.replace(
'''  const [modalConfig, setModalConfig] = useState({ title: '', message: '', icon: 'alert-circle', iconColor: COLORS.errorDark });''',
'''  const [modalConfig, setModalConfig] = useState({ title: '', message: '', icon: 'alert-circle', iconColor: COLORS.errorDark, isSuccess: false });''')

book_content = book_content.replace(
'''setModalConfig({ title: 'Validation Error', message: 'Please fix the errors in the form.', icon: 'alert-circle', iconColor: COLORS.errorDark }); setModalVisible(true);''',
'''setModalConfig({ title: 'Validation Error', message: 'Please fix the errors in the form.', icon: 'alert-circle', iconColor: COLORS.errorDark, isSuccess: false }); setModalVisible(true);''')

book_content = book_content.replace(
'''    setModalConfig({ title: 'Success', message: 'Your appointment has been booked successfully.', icon: 'check-circle', iconColor: COLORS.success });''',
'''    setModalConfig({ title: 'Success', message: 'Your appointment has been booked successfully.', icon: 'check-circle', iconColor: COLORS.success, isSuccess: true });''')


# Extract Inputs into Reusable array
# Replace the big block of TextInputs with a map
inputs_JSX = '''
          {[
            { key: 'firstName', placeholder: 'First Name' },
            { key: 'lastName', placeholder: 'Last Name' },
            { key: 'email', placeholder: 'Email', keyboardType: 'email-address', autoCapitalize: 'none' },
            { key: 'phone', placeholder: 'Phone Number', keyboardType: 'phone-pad' },
          ].map((field) => (
            <React.Fragment key={field.key}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, errors[field.key] && styles.inputError]}
                  placeholder={field.placeholder}
                  keyboardType={field.keyboardType as any || 'default'}
                  autoCapitalize={field.autoCapitalize as any || 'sentences'}
                  value={(form as any)[field.key]}
                  onChangeText={(text) => setForm({ ...form, [field.key]: text })}
                />
              </View>
              {errors[field.key] ? <Text style={styles.errorText}>{errors[field.key]}</Text> : null}
            </React.Fragment>
          ))}
'''

import re
# Regex to match the block from the first TextInput (First Name) to the end of Phone Number block
pattern = re.compile(r'<View style=\{styles\.inputContainer\}>\s*<TextInput\s*style=\{\[styles\.input, errors\.firstName && styles\.inputError\]\}.*?\{errors\.phone \? <Text style=\{styles\.errorText\}>\{errors\.phone\}</Text> : null\}', re.DOTALL)

book_content = pattern.sub(inputs_JSX.strip(), book_content)


# Add CustomModal JSX at the end before SafeAreaView
custom_modal_jsx = '''
      <CustomModal 
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        icon={modalConfig.icon}
        iconColor={modalConfig.iconColor}
        onConfirm={() => {
          setModalVisible(false);
          if (modalConfig.isSuccess) {
            navigation.replace('MainTabs', { screen: 'Appointments' });
          }
        }}
      />
'''

book_content = book_content.replace(
'''    </SafeAreaView>''',
custom_modal_jsx + '\n    </SafeAreaView>')

with open(book_path, 'w', encoding='utf-8') as f:
    f.write(book_content)
