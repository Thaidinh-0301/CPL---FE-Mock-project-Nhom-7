import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean;
    userRole: string | null;
    username: string | null;
    login: (user: { isAuthenticated: boolean; userRole: string; username: string }) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userRole: null,
  username: null,
  login: (user) => set(() => ({ ...user })),
  logout: () => set({ isAuthenticated: false, userRole: null, username: null }),
}));