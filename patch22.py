import os

# 1. Update DoctorProfileScreen.tsx experience text
doc_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\screens\DoctorProfileScreen.tsx'
with open(doc_path, 'r', encoding='utf-8') as f:
    doc_content = f.read()

doc_content = doc_content.replace(
'''{doctor.name} is a renowned {doctor.specialty} with over 10 years of experience in treating various conditions. Dedicated to providing the best patient care and utilizing the latest advancements in the field.''',
'''{doctor.name} is a renowned {doctor.specialty} with over {parseInt(doctor.experience) || 12} years of experience in treating various conditions. Dedicated to providing the best patient care and utilizing the latest advancements in the field.''')

with open(doc_path, 'w', encoding='utf-8') as f:
    f.write(doc_content)


# 2. Update AppointmentContext.tsx for AsyncStorage
app_path = r'c:\Users\Priya\Desktop\New folder\Healthcare\src\context\AppointmentContext.tsx'
with open(app_path, 'r', encoding='utf-8') as f:
    app_content = f.read()

import_stmt = '''import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';\n'''

app_content = app_content.replace(
'''import React, { createContext, useState, useContext, ReactNode } from 'react';''',
import_stmt)

new_app_logic = '''
export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const stored = await AsyncStorage.getItem('appointments');
        if (stored) {
          setAppointments(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load appointments", error);
      }
    };
    loadAppointments();
  }, []);

  const saveAppointments = async (newAppointments: Appointment[]) => {
    setAppointments(newAppointments);
    try {
      await AsyncStorage.setItem('appointments', JSON.stringify(newAppointments));
    } catch (error) {
      console.error("Failed to save appointments", error);
    }
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    saveAppointments([...appointments, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    saveAppointments(appointments.filter((app) => app.id !== id));
  };
'''

app_content = app_content.replace(
'''export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
  };''',
new_app_logic)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(app_content)
