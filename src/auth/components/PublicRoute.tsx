import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/+shared/stores';
import { LINKS } from '@/+shared/constants';

export function PublicRoute() {
  const { accessToken, isAuthenticated } = useAuthStore();
  
  // 이미 로그인되어 있으면 challenges 페이지로 리다이렉트
  if (accessToken && isAuthenticated) {
    return <Navigate to={LINKS.challenges} replace />;
  }
  
  return <Outlet />;
}
