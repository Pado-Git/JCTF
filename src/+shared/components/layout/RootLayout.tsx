import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import Footer from './Footer';

interface RootLayoutProps {
  className?: string;
}

export function RootLayout({ 
  className
}: RootLayoutProps) {
  const location = useLocation();
  
  // 페이지 변경 시 스크롤 위치를 맨 위로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  // 로그인/회원가입 페이지에서는 Footer 숨기기
  const shouldShowFooter = !['/login', '/register', '/'].includes(location.pathname);

  return (
    <div className={`min-h-screen bg-background ${className || ''}`}>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
}

export default RootLayout;