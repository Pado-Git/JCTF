import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/+shared/stores/authStore';

export const useHeaderLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuthStore();

  const currentPath = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // 현재 경로에 따른 헤더 설정 가져오기
  const getHeaderConfig = () => {
    const configs: Record<string, { title: string; subtitle?: string }> = {
      '/competitions': {
        title: 'Competitions',
        subtitle: 'Join CTF competitions and test your skills'
      },
      '/leaderboard': {
        title: 'Leaderboard',
        subtitle: 'See how you rank against other teams'
      },
      '/profile': {
        title: 'Profile',
        subtitle: 'Manage your account and preferences'
      },
      '/teams': {
        title: 'Teams',
        subtitle: 'Manage your team and collaborate with others'
      }
    };

    return configs[currentPath] || { title: 'JCTF' };
  };

  return {
    user,
    isAuthenticated,
    currentPath,
    handleLogout,
    handleBack,
    handleNavigation,
    getHeaderConfig,
  };
};
