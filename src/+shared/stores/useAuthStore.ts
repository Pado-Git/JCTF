import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      login: (token: string) => {
        localStorage.setItem('accessToken', token);
        set({accessToken: token, isLoggedIn: true});
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({accessToken: null, isLoggedIn: false});
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
