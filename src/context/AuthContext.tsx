import React, { createContext, useState, useContext } from 'react';

export type HealthDetails = {
  bloodGroup: string;
  height: string;
  weight: string;
  allergies: string;
  medications: string;
  medicalHistory: string;
};

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  age: string;
  avatar: string | null;
  healthDetails?: HealthDetails;
};

type AuthContextType = {
  email: string | null;
  setEmail: (email: string | null) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
  usersDb: Record<string, string>;
  setUsersDb: (db: Record<string, string>) => void;
};

const defaultProfile: UserProfile = {
  name: 'priya',
  email: 'priya@gmail.com',
  phone: '91-8525084862',
  age: '29',
  avatar: null,
};

const AuthContext = createContext<AuthContextType>({
  email: null,
  setEmail: () => {},
  userProfile: defaultProfile,
  setUserProfile: () => {},
  usersDb: { 'priya@gmail.com': 'Priya' },
  setUsersDb: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);
  const [usersDb, setUsersDb] = useState<Record<string, string>>({ 'priya@gmail.com': 'Priya' });

  return (
    <AuthContext.Provider value={{ email, setEmail, userProfile, setUserProfile, usersDb, setUsersDb }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
