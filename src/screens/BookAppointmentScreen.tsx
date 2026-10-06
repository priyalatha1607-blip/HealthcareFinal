import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
  FlatList,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/navigation/types';
import { useAppointments } from '../context/AppointmentContext';
import { useNotifications } from '../context/NotificationContext';
import { COLORS } from '../constants/colors';
import CustomModal from '../components/CustomModal';
import DateTimePicker from '@react-native-community/datetimepicker';

const doctorsList = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', image: 'https://i.pravatar.cc/150?img=47' },
  { id: '2', name: 'Dr. Mark Davis', specialty: 'Dentist', image: 'https://i.pravatar.cc/150?img=11' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Richard Lee', specialty: 'General Practitioner', image: 'https://i.pravatar.cc/150?img=12' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BookAppointment'>;
};

export default function BookAppointmentScreen({ navigation, route }: any) {
  const { addAppointment } = useAppointments();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    doctor: route?.params?.doctorName || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    problems: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfig, setModalConfig] = useState({ title: '', message: '', icon: 'alert-circle', iconColor: COLORS.errorDark, isSuccess: false });
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [availableDoctorDates, setAvailableDoctorDates] = useState<string[]>([]);

  const validate = () => {
    let newErrors: any = {};
    if (!form.doctor) newErrors.doctor = 'Please select a doctor';
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) newErrors.email = 'Valid email is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) newErrors.phone = 'Valid 10-digit phone number is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.time) newErrors.time = 'Time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      addAppointment({
        doctor: form.doctor,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: form.time,
        problems: form.problems,
        image: doctorsList.find(d => d.name === form.doctor)?.image,
        specialty: doctorsList.find(d => d.name === form.doctor)?.specialty,
      });

      addNotification(
        'Appointment Booked!',
        `Your appointment with ${form.doctor} on ${form.date} at ${form.time} has been successfully booked.`,
        'booking'
      );

      setModalConfig({ title: 'Success', message: 'Appointment booked successfully!', icon: 'check-circle', iconColor: COLORS.success, isSuccess: true }); setModalVisible(true);
    } else {
      setModalConfig({ title: 'Validation Error', message: 'Please fill all required fields correctly.', icon: 'alert-circle', iconColor: COLORS.errorDark, isSuccess: false }); setModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <TouchableOpacity 
            style={[styles.inputContainer, errors.doctor && styles.inputError]}
            onPress={() => setShowDoctorModal(true)}
          >
            <Text style={[styles.input, { color: form.doctor ? COLORS.text : COLORS.gray }]}>
              {form.doctor || 'Select a Doctor'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color={COLORS.primary} style={styles.inputIcon} />
          </TouchableOpacity>
          {errors.doctor ? <Text style={styles.errorText}>{errors.doctor}</Text> : null}

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

          <View style={styles.labelsContainer}>
            <Text style={styles.labelText}>Available Dates</Text>
          </View>
          <TouchableOpacity 
            style={[styles.inputContainer, errors.date && styles.inputError]}
            onPress={() => setShowDateModal(true)}
          >
            <Text style={[styles.input, { color: form.date ? COLORS.text : COLORS.gray }]}>
              {form.date || 'Select a Date'}
            </Text>
            <MaterialCommunityIcons name="calendar-month" size={20} color={COLORS.primary} style={styles.inputIcon} />
          </TouchableOpacity>
          {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
          
          <View style={styles.labelsContainer}>
            <Text style={styles.labelText}>Available Times</Text>
          </View>
          {form.date ? (
            <View style={styles.timeSlotsContainer}>
              {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'].map((slot) => (
                <TouchableOpacity
                  key={slot}
                  style={[
                    styles.timeSlot,
                    form.time === slot && styles.timeSlotSelected,
                    errors.time && !form.time && styles.inputError
                  ]}
                  onPress={() => setForm({ ...form, time: slot })}
                >
                  <Text style={[
                    styles.timeSlotText,
                    form.time === slot && styles.timeSlotTextSelected
                  ]}>
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text style={styles.infoText}>Please select a date first to view available times.</Text>
          )}
          {errors.time ? <Text style={styles.errorText}>{errors.time}</Text> : null}

          <View style={styles.labelsContainer}>
            <Text style={styles.labelText}>Problems</Text>
          </View>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              placeholder="Describe your problems..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={form.problems}
              onChangeText={(text) => setForm({ ...form, problems: text })}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Doctor Selection Modal */}
      <Modal visible={showDoctorModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Doctor</Text>
              <TouchableOpacity onPress={() => setShowDoctorModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={doctorsList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.modalItem}
                  onPress={() => {
                    // Generate 5 random future available dates for this doctor
                    const dates = [];
                    for(let i=1; i<=14; i++) {
                      if (Math.random() > 0.5 && dates.length < 5) {
                        const d = new Date();
                        d.setDate(d.getDate() + i);
                        dates.push(d.toISOString().split('T')[0]);
                      }
                    }
                    setAvailableDoctorDates(dates.sort());

                    setForm({ 
                      ...form, 
                      doctor: item.name,
                      date: '', // Reset date and time
                      time: ''
                    });
                    setShowDoctorModal(false);
                  }}
                >
                  <Image source={{ uri: item.image }} style={styles.modalItemImage} />
                  <View>
                    <Text style={styles.modalItemName}>{item.name}</Text>
                    <Text style={styles.modalItemSpecialty}>{item.specialty}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      {showDateModal && (
        <DateTimePicker
          value={form.date ? new Date(form.date) : new Date()}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={(event: any, selectedDate?: Date) => {
            setShowDateModal(false);
            if (event.type === 'set' && selectedDate) {
              const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              setForm({ ...form, date: formattedDate });
            }
          }}
        />
      )}
  
      <CustomModal 
        visible={modalVisible}
        title={modalConfig.title}
        message={modalConfig.message}
        icon={modalConfig.icon}
        iconColor={modalConfig.iconColor}
        onConfirm={() => {
          setModalVisible(false);
          if (modalConfig.isSuccess) {
            navigation.goBack();
          }
        }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryDark,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 250, // Added extra padding so user can scroll up when keyboard opens
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: COLORS.white,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  inputError: {
    borderColor: 'red',
  },
  inputIcon: {
    marginLeft: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginTop: -8,
    marginLeft: 4,
  },
  labelsContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  labelText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.white,
    minHeight: 100,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderDivider,
  },
  modalItemImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  modalItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  modalItemSpecialty: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  timeSlot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.borderMedium,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: COLORS.white,
  },
  timeSlotSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: COLORS.text,
  },
  timeSlotTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  infoText: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 12,
    fontStyle: 'italic',
  },
});
