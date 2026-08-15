import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  sendEmailVerification,
  type User,
} from 'firebase/auth';
import { auth } from '../firebase';

const googleProvider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  updateUserProfile: (displayName: string) => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Send verification email after signup
    await sendEmailVerification(userCredential.user);
  };

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  const sendVerificationEmail = async () => {
    if (!user) throw new Error('No user logged in');
    await sendEmailVerification(user);
  };

  const resendVerificationEmail = async () => {
    if (!user) throw new Error('No user logged in');
    await sendEmailVerification(user);
  };

  const updateUserProfile = async (displayName: string) => {
    if (!user) throw new Error('No user logged in');
    await updateProfile(user, { displayName });
  };

  const updateUserPassword = async (currentPassword: string, newPassword: string) => {
    if (!user || !user.email) throw new Error('No user logged in');

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, googleSignIn, resetPassword, sendVerificationEmail, resendVerificationEmail, updateUserProfile, updateUserPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
