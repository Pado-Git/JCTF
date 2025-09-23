import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ProfilePage, ChallengesPage, DashboardPage, Competitions, LeaderboardPage, TeamsPage } from '@/pages';
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
  { 
    basename: '/',
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;