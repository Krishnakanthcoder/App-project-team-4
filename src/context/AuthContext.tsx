import React, { createContext, useContext, useEffect, useState } from 'react';
import { dbService, DEMO_USER } from '../services/dbService';
import { UserProfile } from '../types/legal';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (
    fullName: string,
    email: string,
    password: string,
    acceptedDisclaimer: boolean
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  enableDemoMode: () => void;
  updateProfileName: (newName: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'legal_guardian_active_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return user?.is_demo === true;
  });

  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } catch (err) {
        console.warn('Session persistence error:', err);
      }
      setIsDemoMode(user.is_demo === true);
    } else {
      localStorage.removeItem(SESSION_KEY);
      setIsDemoMode(false);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Basic validation
    if (!email.trim() || !password.trim()) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    // Check demo user
    if (email.toLowerCase() === DEMO_USER.email.toLowerCase()) {
      setUser(DEMO_USER);
      return { success: true };
    }

    // Lookup user in DB
    const existing = dbService.getUserByEmail(email);
    if (!existing) {
      return {
        success: false,
        error: 'No account found with this email. Please check your credentials or create an account.'
      };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters.' };
    }

    setUser(existing);
    return { success: true };
  };

  const register = async (
    fullName: string,
    email: string,
    password: string,
    acceptedDisclaimer: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    if (!fullName.trim()) {
      return { success: false, error: 'Full name is required.' };
    }
    if (!email.trim() || !email.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }
    if (!acceptedDisclaimer) {
      return {
        success: false,
        error: 'You must acknowledge the legal awareness disclaimer to proceed.'
      };
    }

    const existing = dbService.getUserByEmail(email);
    if (existing) {
      return {
        success: false,
        error: 'An account with this email already exists. Please log in instead.'
      };
    }

    const newUser = dbService.createUser({
      full_name: fullName.trim(),
      email: email.trim().toLowerCase()
    });

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const enableDemoMode = () => {
    setUser(DEMO_USER);
  };

  const updateProfileName = (newName: string): boolean => {
    if (!user || !newName.trim()) return false;
    const ok = dbService.updateUserName(user.id, newName.trim());
    if (ok) {
      const updated = { ...user, full_name: newName.trim() };
      setUser(updated);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isDemoMode,
        login,
        register,
        logout,
        enableDemoMode,
        updateProfileName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
