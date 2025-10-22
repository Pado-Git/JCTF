import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ProfilePage, ChallengesPage, DashboardPage, Competitions, LeaderboardPage, TeamsPage, NoticesPage } from '@/pages';
import { RootLayout } from '@/+shared/components';
import { LINKS } from '@/+shared/constants';
import { ProtectedRoute, PublicRoute } from '@/auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      {/* 공개 페이지 (로그인/회원가입) */}
      <Route element={<PublicRoute />}>
        <Route index element={<HomePage />} />
        <Route path={LINKS.home} element={<HomePage />} />
        <Route path={LINKS.login} element={<LoginPage />} />
        <Route path={LINKS.register} element={<RegisterPage />} />
      </Route>
      
      {/* 보호된 페이지 (로그인 필요) */}
      <Route element={<ProtectedRoute />}>
        <Route path={LINKS.profile} element={<ProfilePage />} />
        <Route path={LINKS.challenges} element={<ChallengesPage />} />
        <Route path={LINKS.dashboard} element={<DashboardPage />} />
        <Route path={LINKS.competitions} element={<Competitions />} />
        <Route path={LINKS.teams} element={<TeamsPage />} />
        <Route path={LINKS.leaderboard} element={<LeaderboardPage />} />
        <Route path={LINKS.notices} element={<NoticesPage />} />
      </Route>
    </Route>
  ),
  { 
    basename: '/',
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;