import React, { createContext, useState, useContext, ReactNode } from 'react';

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

  const addAppointment = (appointmentData: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
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
