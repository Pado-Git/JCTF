import { Button } from '@/+shared/components/form/button';
import { AcdcLogo, IcoArrowLeftLined, IcoLoginLined, IcoLogoutLined, Logo } from '@/+shared/assets';
import { useHeaderLogic } from './index.hooks';
import { MaxWidthContainer } from '@/+shared/components';
import { LINKS } from '@/+shared/constants/links';

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
      return null;
      // return (
      //   <div className="flex items-center justify-between">
      //     <div className="flex items-center space-x-2">
      //       <span className="text-2xl font-bold text-primary">JCTF</span>
      //     </div>
      //     <AcdcLogo className='w-50' />
      //     <div className="flex items-center space-x-4">
      //       <Button 
      //         variant="secondary" 
      //         onClick={() => handleNavigation('/login')}
      //       >
      //         <IcoLoginLined />
      //         Login
      //       </Button>
      //       <Button 
      //         variant="primary"
      //         onClick={() => handleNavigation('/register')}
      //       >
      //         Register
      //       </Button>
      //     </div>
      //   </div>
      // );
    }

    // 대시보드 페이지
    // if (currentPath === '/dashboard') {
      return (
        <MaxWidthContainer className="flex items-center justify-between py-6" innerProps={{ className: "flex items-center justify-between" }}>
          <div className="w-full flex items-center justify-between">
            {/* <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('/dashboard')}>
              <Logo />
            </div> */}
            <AcdcLogo className='w-50' />
            <div className="flex items-center gap-10">
              <Button 
                variant="text"
                size="small"
                onClick={() => handleNavigation(LINKS.challenges)}
                className={isActivePath('/challenges') ? 'text-primary' : 'text-primary-100'}
              >
                Challenges
              </Button>
              <Button 
                variant="text" 
                size="small"
                onClick={() => handleNavigation(LINKS.leaderboard)}
                className={isActivePath('/leaderboard') ? 'text-primary' : 'text-primary-100'}
              >
                Leaderboard
              </Button>
              <Button 
                variant="text" 
                size="small"
                onClick={() => handleNavigation(LINKS.notices)}
                className={isActivePath('/notices') ? 'text-primary' : 'text-primary-100'}
              >
                Notices
              </Button>
              <Button 
                variant="text" 
                size="small"
                onClick={() => handleNavigation('/profile')}
                className={isActivePath('/profile') ? 'text-primary' : 'text-primary-100'}
              >
                Profile
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="secondary" 
                size="small"
                onClick={handleLogout}
              >
                <IcoLogoutLined />
                Logout
              </Button>
            </div>
          </div>
        </MaxWidthContainer>
      );
    // }

    // 기타 페이지들 (프로필, 팀, 리더보드 등)
    // return (
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center gap-4">
    //       <Button
    //         variant="text"
    //         size="small"
    //         onClick={() => handleBack()}
    //         className='text-neutral-100'
    //       >
    //         <IcoArrowLeftLined />
    //         Back
    //       </Button>
    //       <div>
    //         <h1 className="typo-heading-small text-primary-200">{headerConfig.title}</h1>
    //         {headerConfig.subtitle && <p className="typo-body-xsmall text-neutral-200">{headerConfig.subtitle}</p>}
    //       </div>
    //     </div>
    //     <div className="flex items-center gap-4">
    //       {user && (
    //         <div className="text-right">
    //           <p className="typo-body-small text-neutral-200">Welcome back</p>
    //           <p className="font-medium text-neutral-200">{user.nickname || user.email}</p>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // );
  };

  return (
    <>
    {currentPath !== '/login' && (
      <nav className={`bg-black/60 top-0 z-50 ${className || ''}`}>
        <div className="container mx-auto px-6">
          {renderHeaderContent()}
        </div>
      </nav>
    )}
    </>
  );
}

export default Header;