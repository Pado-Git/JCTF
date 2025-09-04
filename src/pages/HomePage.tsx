import { useState, useEffect } from 'react';
import { Button } from '../components/ui/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/data-display/card';
import { Badge } from '../components/ui/feedback/badge';
import { Clock, Users, Trophy, Shield, Zap, Target } from 'lucide-react';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

interface Competition {
  id: string;
  name: string;
  description: string;
  status: 'upcoming' | 'running' | 'ended';
  startTime: string;
  endTime: string;
  participants: number;
  challenges: number;
  type: 'individual' | 'team';
}

interface Stats {
  totalCompetitions: number;
  totalParticipants: number;
  totalChallenges: number;
  activeCompetitions: number;
}

const mockCompetitions: Competition[] = [
  {
    id: 'comp-001',
    name: 'Winter CTF 2024',
    description: 'Test your skills in web exploitation, cryptography, and reverse engineering',
    status: 'running',
    startTime: '2024-01-15T09:00:00Z',
    endTime: '2024-01-17T21:00:00Z',
    participants: 234,
    challenges: 25,
    type: 'team'
  },
  {
    id: 'comp-002',
    name: 'Beginner Crypto Challenge',
    description: 'Perfect for newcomers to cryptography',
    status: 'upcoming',
    startTime: '2024-01-20T10:00:00Z',
    endTime: '2024-01-20T18:00:00Z',
    participants: 89,
    challenges: 15,
    type: 'individual'
  },
  {
    id: 'comp-003',
    name: 'Advanced Pwning Tournament',
    description: 'Binary exploitation and reverse engineering challenges',
    status: 'upcoming',
    startTime: '2024-01-25T14:00:00Z',
    endTime: '2024-01-27T14:00:00Z',
    participants: 156,
    challenges: 20,
    type: 'team'
  }
];

const mockStats: Stats = {
  totalCompetitions: 42,
  totalParticipants: 15670,
  totalChallenges: 987,
  activeCompetitions: 3
};

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(end * progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [end, duration]);
  
  return <span>{count.toLocaleString()}</span>;
}

function TimeRemaining({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    const updateTime = () => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      } else {
        setTimeLeft('Ended');
      }
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [endTime]);
  
  return <span>{timeLeft}</span>;
}

interface HomePageProps {
  onNavigate?: (page: string) => void;
  user?: { email: string; nickname?: string } | null;
  onLogout?: () => void;
}

export function HomePage({ onNavigate, user, onLogout }: HomePageProps) {
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
            <div className="hidden md:flex items-center space-x-6">
              <a href="#competitions" className="text-muted-foreground hover:text-primary transition-colors">
                Competitions
              </a>
              <a href="#leaderboard" className="text-muted-foreground hover:text-primary transition-colors">
                Leaderboard
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    Welcome, <span className="text-accent">{user.email}</span>
                  </span>
                  <Button 
                    onClick={() => onNavigate?.('dashboard')}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground"
                  >
                    Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={onLogout}
                    className="neon-border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate?.('login')}
                    className="neon-border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => onNavigate?.('register')}
                    className="border border-primary"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center cyber-grid">
        <div className="absolute inset-0 matrix-bg opacity-90"></div>
        <div className="relative z-10 text-center px-6">
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Capture The Flag!
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Test Your Hacking Skills<br />in the Ultimate Cybersecurity Challenge
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              onClick={() => onNavigate?.(user ? 'competitions' : 'login')}
              className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-4 text-lg"
            >
              <Trophy className="mr-2 h-5 w-5" />
              {user ? 'My Competitions' : 'Join Competition'}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate?.('leaderboard')}
              className="neon-border color-primary hover:text-primary-foreground px-8 py-4 text-lg"
            >
              <Target className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </div>
          
          {/* Floating elements */}
          <div className="hidden md:block absolute top-1/4 left-1/4 animate-pulse">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <div className="hidden md:block absolute top-1/3 right-1/4 animate-pulse delay-500">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
          </div>
          <div className="hidden md:block absolute bottom-1/4 left-1/3 animate-pulse delay-1000">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Current Competitions */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Current Competitions
            </h2>
            <p className="text-xl text-muted-foreground">
              Join ongoing competitions and test your skills
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockCompetitions.slice(0, 3).map((comp) => (
              <Card key={comp.id} className="bg-card/50 backdrop-blur-sm neon-border border-primary/30 hover:border-accent transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {comp.name}
                    </CardTitle>
                    <Badge 
                      variant={comp.status === 'running' ? 'default' : 'secondary'}
                      className={
                        comp.status === 'running' 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-warning text-warning-foreground'
                      }
                    >
                      {comp.status === 'running' ? 'LIVE' : 'UPCOMING'}
                    </Badge>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    {comp.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="mr-2 h-4 w-4" />
                        {comp.status === 'running' ? 'Ends in' : 'Starts in'}
                      </div>
                      <span className="text-accent font-semibold">
                        <TimeRemaining endTime={comp.status === 'running' ? comp.endTime : comp.startTime} />
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Users className="mr-2 h-4 w-4" />
                        Participants
                      </div>
                      <span className="text-primary font-semibold">{comp.participants}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Target className="mr-2 h-4 w-4" />
                        Challenges
                      </div>
                      <span className="text-primary font-semibold">{comp.challenges}</span>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        onClick={() => onNavigate?.(user ? 'competitions' : 'login')}
                        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
                      >
                        {comp.status === 'running' ? 'Join Now' : 'Register'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-6 bg-card/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Platform Statistics
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of security enthusiasts
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm neon-border border-primary/30 text-center">
              <CardContent className="p-8">
                <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={mockStats.totalCompetitions} />
                </div>
                <p className="text-muted-foreground">Total Competitions</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm neon-border border-accent/30 text-center">
              <CardContent className="p-8">
                <Users className="h-12 w-12 mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={mockStats.totalParticipants} />
                </div>
                <p className="text-muted-foreground">Participants</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm neon-border border-warning/30 text-center">
              <CardContent className="p-8">
                <Target className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={mockStats.totalChallenges} />
                </div>
                <p className="text-muted-foreground">Challenges Solved</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm neon-border border-destructive/30 text-center">
              <CardContent className="p-8">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-4xl font-bold text-primary mb-2">
                  <CountUp end={mockStats.activeCompetitions} />
                </div>
                <p className="text-muted-foreground">Active Now</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to start hacking
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-border border-primary">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Join</h3>
              <p className="text-muted-foreground">
                Register for competitions and form teams with other hackers
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-border border-accent">
                <span className="text-3xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Solve</h3>
              <p className="text-muted-foreground">
                Tackle challenges in web, crypto, pwn, reverse, and more
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-first-blood/20 rounded-full flex items-center justify-center mx-auto mb-6 neon-border border-first-blood">
                <span className="text-3xl font-bold text-first-blood">3</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Win</h3>
              <p className="text-muted-foreground">
                Climb the leaderboard and claim victory in epic competitions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-card/50 border-t border-border">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">JCTF</span>
          </div>
          <p className="text-muted-foreground mb-4">
            The ultimate platform for cybersecurity competitions
          </p>
          <p className="text-sm text-muted-foreground">
            © 2024 SURF-LAB JCTF. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}