import React, { createContext, useContext } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ user: null, profile: null, loading: false, isAdmin: false }}>
      {children}
    </AuthContext.Provider>
  );
};
