import { Button } from '@/+shared/components/form/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { IcoLoginLined, IcoLogoutLined } from '@/+shared/assets';
import { useHeaderLogic } from './index.hooks';

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const { user, isAuthenticated, handleLogout, handleBack, handleNavigation, currentPath, getHeaderConfig } = useHeaderLogic();

  // 현재 경로에 따른 헤더 설정 가져오기
  const headerConfig = getHeaderConfig();

  // 네비게이션 메뉴 활성 상태 확인 함수
  const isActivePath = (path: string): boolean => {
    return currentPath === path;
  };

  const renderHeaderContent = () => {
    // 홈페이지 (인증되지 않은 상태)
    if (currentPath === '/' && !isAuthenticated) {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">JCTF</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="secondary" 
              onClick={() => handleNavigation('/login')}
            >
              <IcoLoginLined />
              Login
            </Button>
            <Button 
              variant="primary"
              onClick={() => handleNavigation('/register')}
            >
              Register
            </Button>
          </div>
        </div>
      );
    }

    // 대시보드 페이지
    if (currentPath === '/dashboard') {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">JCTF</span>
            </div>
            <div className="hidden md:flex items-center gap-16">
              <Button 
                variant="text"
                onClick={() => handleNavigation('/dashboard')}
                className={isActivePath('/dashboard') ? 'text-primary' : 'text-muted-foreground'}
              >
                Dashboard
              </Button>
              <Button 
                variant="text" 
                onClick={() => handleNavigation('/competitions')}
                className={isActivePath('/competitions') ? 'text-primary' : 'text-muted-foreground'}
              >
                Competitions
              </Button>
              <Button 
                variant="text" 
                onClick={() => handleNavigation('/leaderboard')}
                className={isActivePath('/leaderboard') ? 'text-primary' : 'text-muted-foreground'}
              >
                Leaderboard
              </Button>
              <Button 
                variant="text" 
                onClick={() => handleNavigation('/profile')}
                className={isActivePath('/profile') ? 'text-primary' : 'text-muted-foreground'}
              >
                Profile
              </Button>
              <Button 
                variant="text" 
                onClick={() => handleNavigation('/teams')}
                className={isActivePath('/teams') ? 'text-primary' : 'text-muted-foreground'}
              >
                Teams
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="secondary" 
              onClick={handleLogout}
              className="typo-body-small"
            >
              <IcoLogoutLined />
              Logout
            </Button>
          </div>
        </div>
      );
    }

    // 챌린지 페이지 (경쟁 중인 페이지)
    if (currentPath.startsWith('/challenges')) {
      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="text"
              onClick={() => handleBack('/dashboard')}
              className="text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">JCTF</span>
            </div>
          </div>
        </div>
      );
    }

    // 기타 페이지들 (프로필, 팀, 리더보드 등)
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="text"
            size="small"
            onClick={() => handleBack('/dashboard')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-primary">{headerConfig.title}</h1>
            {headerConfig.subtitle && <p className="text-muted-foreground">{headerConfig.subtitle}</p>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <p className="font-medium text-foreground">{user.nickname || user.email}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <nav className={`bg-black/60 top-0 z-50 ${className || ''}`}>
      <div className="container mx-auto px-6 py-4">
        {renderHeaderContent()}
      </div>
    </nav>
  );
}

export default Header;