import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export type AuthState = {
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  accessToken: string | null;
  competitionId: string | null;
  login: (token: string) => void;
  setCompetitionId: (id: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      competitionId: null,
      isAuthenticated: false,
      login: (token: string) => {
        localStorage.setItem('accessToken', token);
        set({accessToken: token, isLoggedIn: true, isAuthenticated: true});
      },
      setCompetitionId: (id: string) => {
        localStorage.setItem('competitionId', id);
        set({competitionId: id});
      },
      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('competitionId');
        set({accessToken: null, isLoggedIn: false, competitionId: null, isAuthenticated: false});
        localStorage.removeItem('user-storage');
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export default useAuthStore;
