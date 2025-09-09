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
import { TeamsPage } from '@/pages/TeamsPage';
import { ProfilePage } from '@/pages/ProfilePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/competitions" element={<CompetitionsPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </>
  )
);

export default router;