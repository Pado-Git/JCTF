import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/+shared/stores';
import { LINKS } from '@/+shared/constants';

export function ProtectedRoute() {
  const { accessToken, isAuthenticated } = useAuthStore();
  
  // 토큰이 없으면 로그인 페이지로 리다이렉트
  if (!accessToken || !isAuthenticated) {
    return <Navigate to={LINKS.home} replace />;
  }
  
  return <Outlet />;
}
