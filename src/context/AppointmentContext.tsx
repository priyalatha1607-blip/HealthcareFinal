import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface Appointment {
  id: string;
  doctor: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  problems: string;
  image?: string;
  specialty?: string;
}

interface AppointmentContextType {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);


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


  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, cancelAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};
