import React, { createContext, useState, useContext } from 'react';

type UserProfile = {
  name: string;
  email: string;
  phone: string;
  age: string;
  avatar: string | null;
};

type AuthContextType = {
  email: string | null;
  setEmail: (email: string | null) => void;
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile) => void;
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
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);

  return (
    <AuthContext.Provider value={{ email, setEmail, userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
