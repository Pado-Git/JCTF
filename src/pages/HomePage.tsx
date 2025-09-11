import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/+shared/stores/authStore';
import { Button } from '@/+shared/components';
import { Shield } from 'lucide-react';
import { IcoLogin } from '@/+shared/assets/icons';
import Footer from '@/+shared/components/layout/Footer';

import { HeroSection, CurrentCompetitions, Statics, HowItWorks } from '@/home/layout';

export function HomePage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">JCTF</span>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome, <span className="text-accent">{user.email}</span>
                  </span>
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={logout}
                    className="neon-border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="text" 
                    onClick={() => navigate('/login')}
                    className="text-primary hover:text-primary/80"
                  >
                    <IcoLogin />
                    Login
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/register')}
                    className="border border-primary text-primary"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />
      <CurrentCompetitions />
      <Statics />
      <HowItWorks />


      {/* Footer */}
      <Footer />
    </div>
  );
}