import { useState } from 'react';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CompetitionsPage } from '@/pages/CompetitionsPage';
import { ChallengesPage } from '@/pages/ChallengesPage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { TeamsPage } from '@/pages/TeamsPage';
import { Toaster } from '@/components/feedback/sonner';

type Page = 'home' | 'login' | 'register' | 'dashboard' | 'competitions' | 'challenges' | 'leaderboard' | 'profile' | 'teams';

interface User {
  email: string;
  nickname?: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app, this would be an API call
    console.log('Login attempt:', { email, password });
    setUser({ email });
    setCurrentPage('dashboard');
  };

  const handleRegister = (email: string, password: string) => {
    // Mock registration - in real app, this would be an API call
    console.log('Register attempt:', { email, password });
    setUser({ email });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            onNavigate={setCurrentPage}
            user={user}
            onLogout={handleLogout}
          />
        );
      
      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      
      case 'register':
        return (
          <RegisterPage
            onRegister={handleRegister}
            onBack={() => setCurrentPage('home')}
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        );
      
      case 'dashboard':
        return user ? (
          <DashboardPage
            user={user}
            onNavigate={setCurrentPage}
            onLogout={handleLogout}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      
      case 'competitions':
        return user ? (
          <CompetitionsPage
            user={user}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      
      case 'challenges':
        return user ? (
          <ChallengesPage
            user={user}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      
      case 'leaderboard':
        return (
          <LeaderboardPage
            user={user}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage(user ? 'dashboard' : 'home')}
          />
        );
      
      case 'profile':
        return user ? (
          <ProfilePage
            user={user}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      
      case 'teams':
        return user ? (
          <TeamsPage
            user={user}
            onNavigate={setCurrentPage}
            onBack={() => setCurrentPage('dashboard')}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onBack={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );
      

      default:
        return (
          <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">
                Page Under Construction
              </h1>
              <p className="text-muted-foreground mb-8">
                This page is being built. Check back soon!
              </p>
              <button
                onClick={() => setCurrentPage('home')}
                className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2 rounded-lg"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="size-full">
      {renderPage()}
      <Toaster />
    </div>
  );
}