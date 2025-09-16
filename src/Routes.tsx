import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CompetitionsPage } from '@/pages/CompetitionsPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { TeamsPage } from '@/pages/TeamsPage';
import { RootLayout } from '@/+shared/components';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/competitions" element={<CompetitionsPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
    </Route>
  ),
  { basename: '/' }
);

export default router;