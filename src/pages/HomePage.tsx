import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/form/button';
import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, } from '@/components/data-display/card';
import { Trophy, Shield } from 'lucide-react';
import Galaxy from '@/components/background/Galaxy/Galaxy';
import { IcoArrowRightSLined, IcoChallengeFilled, IcoLightFilled, IcoLogin, IcoTeamFilled, IcoTrophyFilled } from '@/assets/icons';
import { ImageJoin, ImageSolve, ImageWin } from '@/assets/images';
import MaxWidthContainer from '@/components/layout/MaxWidthContainer';
import Footer from '@/components/layout/Footer';
import FaultyTerminal from '@/components/background/FaultyTerminal/FaultyTerminal';

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

interface StatCard {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: number;
  label: string;
}

interface Step {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  circleBg: string;
  circleText: string;
  cardText: string;
  image: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const steps: Step[] = [
  {
    id: 'step-1',
    number: 1,
    title: 'Join',
    subtitle: 'Register, connect, and build your team',
    description: 'Create your hacker profile and explore upcoming competitions.\nMeet players from around the world and start your journey together.',
    gradientFrom: 'from-primary-500/20',
    gradientTo: 'to-primary-700/30',
    circleBg: 'bg-primary',
    circleText: 'text-primary-foreground',
    cardText: 'text-primary-foreground',
    image: ImageJoin
  },
  {
    id: 'step-2',
    number: 2,
    title: 'Solve',
    subtitle: 'Tackle challenges, learn, and grow your skills',
    description: 'Face real-world problems across web, crypto, pwn, and reverse.\nSharpen your creativity and technical expertise with every solve.',
    gradientFrom: 'from-accent/20',
    gradientTo: 'to-accent/30',
    circleBg: 'bg-accent',
    circleText: 'text-accent-foreground',
    cardText: 'text-accent-foreground',
    image: ImageSolve
  },
  {
    id: 'step-3',
    number: 3,
    title: 'Win',
    subtitle: 'Capture flags, climb the leaderboard, and celebrate victory',
    description: 'Showcase your talent against global competitors under pressure.\nEarn recognition, grow with your team, and enjoy the thrill of success.',
    gradientFrom: 'from-first-blood/20',
    gradientTo: 'to-first-blood/30',
    circleBg: 'bg-first-blood',
    circleText: 'text-first-blood-foreground',
    cardText: 'text-first-blood-foreground',
    image: ImageWin
  }
];

const statCards: StatCard[] = [
  {
    id: 'stat-1',
    icon: IcoTrophyFilled,
    value: 0, // Will be updated with mockStats.totalCompetitions
    label: 'Total Competitions',
  },
  {
    id: 'stat-2',
    icon: IcoTeamFilled,
    value: 0, // Will be updated with mockStats.totalParticipants
    label: 'Participants',
  },
  {
    id: 'stat-3',
    icon: IcoChallengeFilled,
    value: 0, // Will be updated with mockStats.totalChallenges
    label: 'Challenges Solved',
  },
  {
    id: 'stat-4',
    icon: IcoLightFilled,
    value: 0, // Will be updated with mockStats.activeCompetitions
    label: 'Active Now',
  }
];

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


function getContestStatusMessage(comp: Competition) {
  const now = new Date().getTime();
  const start = new Date(comp.startTime).getTime();
  const end = new Date(comp.endTime).getTime();
  
  if (now < start) {
    // 시작 전
    const hoursUntilStart = Math.ceil((start - now) / (1000 * 60 * 60));
    return `Starts in ${hoursUntilStart} hours`;
  } else if (now >= start && now < end) {
    // 진행 중
    const hoursUntilEnd = Math.ceil((end - now) / (1000 * 60 * 60));
    return `Ends in ${hoursUntilEnd} hours`;
  } else {
    // 종료됨
    return 'The contest has ended';
  }
}

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="absolute inset-0">
          <Galaxy 
            mouseInteraction={false}
            mouseRepulsion={true}
            density={0.5}
            glowIntensity={0.1}
            saturation={0.2}
            hueShift={250}
            twinkleIntensity={0.2}
            rotationSpeed={0.05}
            repulsionStrength={1.5}
            autoCenterRepulsion={0}
            starSpeed={0.3}
            speed={0.6}
            transparent={false}
          />
        </div>
        <MaxWidthContainer className="relative z-20 text-center">
          <div className="mb-8">
            <h2 className="text-[80px] font-bold mb-4" style={{
              background: 'linear-gradient(180deg, #6366F1 2%, #1E1B4B 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0px 0px 24px rgba(30, 27, 75, 1)',
              lineHeight: '1.3em'
            }}>
              Capture The Flag!
            </h2>
            <p className="text-[24px] font-bold text-primary-50 mb-8 max-w-2xl mx-auto" style={{
              lineHeight: '1.5em'
            }}>
              Test Your Hacking Skills<br />in the Ultimate Cybersecurity Challenge
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="large" 
              onClick={() => navigate(isAuthenticated ? '/competitions' : '/login')}
              className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-3 text-[17px] font-bold h-12"
              style={{
                boxShadow: '0px 0px 16px rgba(99, 102, 241, 1)',
                lineHeight: '1.3em'
              }}
            >
              <Trophy className="mr-2 h-6 w-6" fill="currentColor" />
              {user ? 'My Competitions' : 'Join Competition'}
            </Button>
          </div>
        </MaxWidthContainer>
      </section>

      {/* Current Competitions */}
      <section className="py-20">
        <MaxWidthContainer>
          <div className="mb-12">
            <h2 className="text-heading-large text-primary-200 mb-4">
              Current Competitions
            </h2>
            <p className="text-body-medium text-primary-50">
              Join ongoing competitions and test your skills
            </p>
          </div>
          
          <div className="flex gap-8">
            {mockCompetitions.slice(0, 3).map((comp) => (
              <Card key={comp.id} className="w-[430px] h-[480px] bg-primary-900/70 border border-primary-800 rounded-3xl p-8 flex flex-col justify-between group hover:border-primary-500 transition-all duration-300">
                {/* Header Section */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-heading-medium text-primary-100">
                      {comp.name}
                    </h3>
                    <div className={`px-2 py-1 rounded-xs text-body-xsmall font-bold w-fit ${
                      comp.status === 'running' 
                        ? 'bg-accent text-accent-foreground' 
                        : 'bg-warning text-warning-foreground'
                    }`}>
                      {comp.status === 'running' ? 'Live' : 'Upcoming'}
                    </div>
                    <p className="text-body-medium text-primary-50 mt-4 h-12 flex items-start">
                      {comp.description}
                    </p>
                  </div>
                  
                  {/* Stats Section */}
                  <div className="flex gap-6">
                    <div className="flex items-center gap-4 flex-1">
                      <IcoTeamFilled />
                      <div className="flex flex-col">
                        <span className="text-body-large font-bold text-primary-50">
                          {comp.participants}
                        </span>
                        <span className="text-body-xsmall text-primary-100">
                          Participants
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 flex-1">
                      <IcoChallengeFilled />
                      <div className="flex flex-col">
                        <span className="text-body-large font-bold text-primary-50">
                          {comp.challenges}
                        </span>
                        <span className="text-body-xsmall text-primary-100">
                          Challenges
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Footer Section */}
                <div className="flex flex-col gap-4">
                  <p className="text-body-small text-primary-200">
                    {getContestStatusMessage(comp)}
                  </p>
                  <Button 
                    onClick={() => navigate(isAuthenticated ? '/competitions' : '/login')}
                    className="w-full bg-primary hover:bg-primary/80 text-primary-foreground h-10 text-[15px]"
                  >
                    {comp.status === 'running' ? 'Join now' : 'Register'}
                  </Button>
                </div>
              </Card>

            ))}
          </div>
          <Button variant="secondary" className="w-fit h-12 px-6 text-primary mt-14">
            View All Competitions
            <IcoArrowRightSLined />
          </Button>
        </MaxWidthContainer>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-card/20 relative">
        <div className="absolute inset-0">
          <FaultyTerminal
            scale={2.4}
            digitSize={2.7}
            gridMul={[7, 2]}
            timeScale={1}
            scanlineIntensity={0.3}
            noiseAmp={0.9}
            chromaticAberration={0}
            dither={0}
            curvature={0}
            tint="#ffffff"
            mouseReact={false}
            mouseStrength={0.3}
            pageLoadAnimation={false}
            brightness={0.1}
          />
        </div>
        <MaxWidthContainer className="relative z-10">
          <div className="flex items-center justify-between gap-14">
            <div className="mb-12 w-[350px]">
              <h2 className="text-heading-large text-primary-200 mb-4">
                Platform Statistics
              </h2>
              <p className="text-body-medium text-primary-50">
                Join thousands of security enthusiasts
              </p>
            </div>
          
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 w-full">
              {statCards.map((stat, index) => {
                const values = [
                  mockStats.totalCompetitions,
                  mockStats.totalParticipants,
                  mockStats.totalChallenges,
                  mockStats.activeCompetitions
                ];
                
                return (
                  <Card key={stat.id} className="bg-neutral-0/50 border border-primary-900 text-center py-11">
                    <CardContent className="p-8">
                      <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" fill="primary-500" />
                      <div className="text-heading-large text-primary mb-2">
                        <CountUp end={values[index]} />
                      </div>
                      <p className="text-primary-200 text-heading-small">{stat.label}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </MaxWidthContainer>
      </section>

      {/* How It Works */}
      <section className="py-32 gradient-3">
        <MaxWidthContainer>
          {/* Header */}
          <div className="flex items-start gap-14 mb-12">
            <div className="flex-1 max-w-[350px]">
              <h2 className="text-heading-large text-primary-200 mb-4">
                How It Works
              </h2>
              <p className="text-body-medium text-primary-50">
                Three simple steps to start hacking
              </p>
            </div>
            <div className="flex-1">
              {steps.map((step) => (
                <div key={step.id}>
                  <div className="flex items-center gap-20 mb-12">
                    {/* Step Card */}
                    <div className="text-center">
                      <div className="w-[250px] h-[220px] mx-auto mb-4 flex items-center justify-center">
                        <step.image className="w-full h-full" />
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-6">
                        <span className="text-heading-large text-primary">{step.number}</span>
                        <h3 className="text-heading-large text-primary-50">{step.title}</h3>
                      </div>
                      <h4 className="text-body-large text-primary-50 font-bold">
                        {step.subtitle}
                      </h4>
                      <p className="text-body-medium text-primary-100">
                        {step.description.split('\n').map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < step.description.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Steps */}


        </MaxWidthContainer>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}