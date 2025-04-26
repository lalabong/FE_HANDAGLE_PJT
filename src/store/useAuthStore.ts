import { LoginResponse, postLogin } from '@/api/user/postLogin';
import { postLogout } from '@/api/user/postLogout';
import { Tokens, User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (loginId: string, password: string) => Promise<void>;
  setLoginData: (data: LoginResponse) => void;
  setUser: (user: User) => void;
  setTokens: (tokens: Tokens) => void;
  updateAccessToken: (newToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,

      login: async (loginId: string, password: string) => {
        try {
          const data = await postLogin(loginId, password);
          set({ isAuthenticated: true });
          get().setLoginData(data);
        } catch (error: any) {
          set({ isAuthenticated: false });
          throw error;
        }
      },

      setLoginData: (data) =>
        set({
          user: data.user,
          accessToken: data.tokens.accessToken,
          refreshToken: data.tokens.refreshToken,
        }),

      setTokens: (tokens) => set({ ...tokens, isAuthenticated: true }),

      setUser: (user) => set({ user }),

      updateAccessToken: (newToken) => set({ accessToken: newToken }),

      logout: async () => {
        try {
          if (get().refreshToken) {
            await postLogout(get().refreshToken);
          }
        } catch (error) {
          throw error;
        } finally {
          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isAuthenticated: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
