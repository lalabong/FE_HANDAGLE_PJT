import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Tokens, User } from '@/types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  tokens: Tokens | null;

  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  updateAccessToken: (newToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      tokens: null,

      setUser: (user) => set({ user }),

      setTokens: (tokens) =>
        set({
          tokens,
          isAuthenticated: true,
        }),

      updateAccessToken: (newToken) =>
        set((state) => ({
          tokens: state.tokens ? { ...state.tokens, accessToken: newToken } : null,
        })),

      clearAuth: () =>
        set({
          user: null,
          isAuthenticated: false,
          tokens: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        tokens: state.tokens,
      }),
    },
  ),
);
