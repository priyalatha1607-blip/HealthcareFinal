import re

# 1. Update HealthDetailsScreen.tsx
hd_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\HealthDetailsScreen.tsx'
with open(hd_path, 'r', encoding='utf-8') as f:
    hd_content = f.read()

import_stmt = '''import CustomModal from '../components/CustomModal';\n'''
if 'CustomModal' not in hd_content:
    hd_content = hd_content.replace(
        '''import CustomButton from '../components/CustomButton';''',
        '''import CustomButton from '../components/CustomButton';\nimport CustomModal from '../components/CustomModal';'''
    )

hd_content = hd_content.replace(
'''  const [medicalHistory, setMedicalHistory] = useState(userProfile.healthDetails?.medicalHistory || '');''',
'''  const [medicalHistory, setMedicalHistory] = useState(userProfile.healthDetails?.medicalHistory || '');
  const [modalVisible, setModalVisible] = useState(false);''')

hd_content = hd_content.replace(
'''    Alert.alert("Success", "Health details have been saved successfully.");''',
'''    setModalVisible(true);''')

hd_content = hd_content.replace(
'''    </SafeAreaView>''',
'''      <CustomModal 
        visible={modalVisible} 
        title="Success" 
        message="Health details have been saved successfully." 
        icon="check-circle" 
        iconColor={COLORS.success} 
        onConfirm={() => setModalVisible(false)} 
      />
    </SafeAreaView>''')

with open(hd_path, 'w', encoding='utf-8') as f:
    f.write(hd_content)


# 2. Update FeedbackScreen.tsx
fb_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\FeedbackScreen.tsx'
with open(fb_path, 'r', encoding='utf-8') as f:
    fb_content = f.read()

if 'CustomModal' not in fb_content:
    fb_content = fb_content.replace(
        '''import { COLORS } from '../constants/colors';''',
        '''import { COLORS } from '../constants/colors';\nimport CustomModal from '../components/CustomModal';'''
    )

fb_content = fb_content.replace(
'''  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');''',
'''  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', icon: '', type: 'success' });

  const showModal = (title: string, message: string, icon: string, type: string) => {
    setModalConfig({ title, message, icon, type });
    setModalVisible(true);
  };''')

fb_content = fb_content.replace(
'''    if (rating === 0) {
      Alert.alert('Rating Required', 'Please select a star rating.');
      return;
    }
    if (!feedbackText.trim()) {
      Alert.alert('Feedback Required', 'Please write your feedback before submitting.');
      return;
    }''',
'''    if (rating === 0) {
      showModal('Rating Required', 'Please select a star rating.', 'alert-circle', 'error');
      return;
    }
    if (!feedbackText.trim()) {
      showModal('Feedback Required', 'Please write your feedback before submitting.', 'alert-circle', 'error');
      return;
    }''')

fb_content = fb_content.replace(
'''    Alert.alert('Thank You!', 'Your feedback has been submitted successfully.');''',
'''    showModal('Thank You!', 'Your feedback has been submitted successfully.', 'check-circle', 'success');''')

fb_content = fb_content.replace(
'''    </SafeAreaView>''',
'''      <CustomModal 
        visible={modalVisible} 
        title={modalConfig.title} 
        message={modalConfig.message} 
        icon={modalConfig.icon} 
        iconColor={modalConfig.type === 'error' ? COLORS.errorDark : COLORS.success} 
        onConfirm={() => setModalVisible(false)} 
      />
    </SafeAreaView>''')

with open(fb_path, 'w', encoding='utf-8') as f:
    f.write(fb_content)

