import { LoginRequest, LoginResponse, postLogin } from '@/api/user/postLogin';
import { postLogout } from '@/api/user/postLogout';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  loginId: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;

  login: (loginRequest: LoginRequest) => Promise<void>;
  setLoginData: (data: LoginResponse) => void;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
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

      login: async (loginRequest: LoginRequest) => {
        try {
          const data = await postLogin(loginRequest);
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

      setTokens: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken, isAuthenticated: true }),

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
