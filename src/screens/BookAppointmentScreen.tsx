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

const doctorsList = [
  { id: '1', name: 'Dr. Jane Smith', specialty: 'Cardiologist', image: 'https://i.pravatar.cc/150?img=47' },
  { id: '2', name: 'Dr. Mark Davis', specialty: 'Dentist', image: 'https://i.pravatar.cc/150?img=11' },
  { id: '3', name: 'Dr. Emily Chen', specialty: 'Pediatrician', image: 'https://i.pravatar.cc/150?img=32' },
  { id: '4', name: 'Dr. Richard Lee', specialty: 'General Practitioner', image: 'https://i.pravatar.cc/150?img=12' },
];

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BookAppointment'>;
};

export default function BookAppointmentScreen({ navigation }: Props) {
  const { addAppointment } = useAppointments();
  const { addNotification } = useNotifications();

  const [form, setForm] = useState({
    doctor: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    problems: ''
  });

  const [errors, setErrors] = useState<any>({});
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

      Alert.alert('Success', 'Appointment booked successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Error', 'Please fill all required fields correctly.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
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
            <Text style={[styles.input, { color: form.doctor ? '#333' : '#a0a0a0' }]}>
              {form.doctor || 'Select a Doctor'}
            </Text>
            <MaterialCommunityIcons name="chevron-down" size={20} color="#008080" style={styles.inputIcon} />
          </TouchableOpacity>
          {errors.doctor ? <Text style={styles.errorText}>{errors.doctor}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.firstName && styles.inputError]}
              placeholder="First Name"
              value={form.firstName}
              onChangeText={(text) => setForm({ ...form, firstName: text })}
            />
          </View>
          {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.lastName && styles.inputError]}
              placeholder="Last Name"
              value={form.lastName}
              onChangeText={(text) => setForm({ ...form, lastName: text })}
            />
          </View>
          {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
          </View>
          {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, errors.phone && styles.inputError]}
              placeholder="Phone"
              keyboardType="phone-pad"
              value={form.phone}
              onChangeText={(text) => setForm({ ...form, phone: text })}
            />
          </View>
          {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

          <View style={styles.labelsContainer}>
            <Text style={styles.labelText}>Available Dates</Text>
          </View>
          <TouchableOpacity 
            style={[styles.inputContainer, errors.date && styles.inputError]}
            onPress={() => {
              if (!form.doctor) {
                Alert.alert('Please select a doctor first.');
                return;
              }
              setShowDateModal(true);
            }}
          >
            <Text style={[styles.input, { color: form.date ? '#333' : '#a0a0a0' }]}>
              {form.date || 'Select a Date'}
            </Text>
            <MaterialCommunityIcons name="calendar-month" size={20} color="#008080" style={styles.inputIcon} />
          </TouchableOpacity>
          {errors.date ? <Text style={styles.errorText}>{errors.date}</Text> : null}
          
          <View style={styles.labelsContainer}>
            <Text style={styles.labelText}>Available Times | Serial No</Text>
          </View>
          <View style={styles.inputContainer}>
             <TextInput
              style={[styles.input, errors.time && styles.inputError]}
              placeholder="HH:MM AM/PM"
              value={form.time}
              onChangeText={(text) => setForm({ ...form, time: text })}
            />
          </View>
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
                <MaterialCommunityIcons name="close" size={24} color="#333" />
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
      {/* Date Selection Modal */}
      <Modal visible={showDateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Available Dates for {form.doctor}</Text>
              <TouchableOpacity onPress={() => setShowDateModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            {availableDoctorDates.length === 0 ? (
              <Text style={{ textAlign: 'center', marginVertical: 20, color: '#666' }}>No dates available.</Text>
            ) : (
              <FlatList
                data={availableDoctorDates}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    style={styles.modalItem}
                    onPress={() => {
                      setForm({ ...form, date: item });
                      setShowDateModal(false);
                    }}
                  >
                    <MaterialCommunityIcons name="calendar-check" size={24} color="#008080" style={{ marginRight: 12 }} />
                    <Text style={styles.modalItemName}>
                      {new Date(item).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#008080',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#008080',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 250, // Added extra padding so user can scroll up when keyboard opens
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 50,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
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
    color: '#008080',
    fontSize: 14,
    fontWeight: '500',
  },
  textAreaContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
    minHeight: 100,
  },
  textArea: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#008080',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
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
    color: '#333',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
    color: '#333',
  },
  modalItemSpecialty: {
    fontSize: 14,
    color: '#666',
  },
});
