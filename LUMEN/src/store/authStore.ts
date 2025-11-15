import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  userType?: 'consumer' | 'business';
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  userType: 'consumer' | 'business' | null;
  login: (user: User, userType?: 'consumer' | 'business') => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setUserType: (userType: 'consumer' | 'business') => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userType: null,
      login: (user, userType) => set({ user, isAuthenticated: true, userType: userType || user.userType || null }),
      logout: () => set({ user: null, isAuthenticated: false, userType: null }),
      updateUser: (updates) => 
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      setUserType: (userType) => set({ userType }),
    }),
    {
      name: 'lumen-auth-storage',
    }
  )
);
