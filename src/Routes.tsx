import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { Competitions } from '@/pages/Competitions';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { LeaderboardPage } from '@/pages/Leaderboard';
import { ProfilePage } from '@/pages/ProfilePage';
import { TeamsPage } from '@/pages/TeamsPage';
import { RootLayout } from '@/+shared/components';
import { LINKS } from '@/+shared/constants';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path={LINKS.home} element={<HomePage />} />
      <Route path={LINKS.login} element={<LoginPage />} />
      <Route path={LINKS.register} element={<RegisterPage />} />
      <Route path={LINKS.profile} element={<ProfilePage />} />
      <Route path={LINKS.challenges} element={<ChallengesPage />} />
      <Route path={LINKS.dashboard} element={<DashboardPage />} />
      <Route path={LINKS.competitions} element={<Competitions />} />
      <Route path={LINKS.teams} element={<TeamsPage />} />
      <Route path={LINKS.leaderboard} element={<LeaderboardPage />} />
    </Route>
  ),
  { basename: '/' }
);

export default router;