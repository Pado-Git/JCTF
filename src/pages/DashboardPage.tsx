import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/data-display/card';
import { Badge } from '@/components/feedback/badge';
import { Progress } from '@/components/feedback/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/data-display/tabs';
import { MaxWidthContainer } from '@/components/layout/MaxWidthContainer';
import { IcoTrophyFilled, IcoChallengeFilled, IcoStarFilled, IcoCrownFilled, IcoLogoutFilled, IcoTimerLined1 } from '@/assets/icons';
import {
  Shield, 
  Target, 
  Users, 
  Clock, 
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/layout/Header';

// Props interface removed - using React Router now

interface CompetitionEntry {
  id: string;
  name: string;
  status: 'running' | 'upcoming' | 'ended';
  myRank: number;
  totalTeams: number;
  myScore: number;
  maxScore: number;
  solvedChallenges: number;
  totalChallenges: number;
  timeLeft?: string;
  team?: {
    name: string;
    rank: number;
  };
}

interface RecentActivity {
  id: string;
  type: 'solve' | 'join' | 'rank_up';
  challengeName?: string;
  competitionName: string;
  points?: number;
  timestamp: string;
  isFirstBlood?: boolean;
}

interface UserStats {
  totalCompetitions: number;
  totalSolved: number;
  totalPoints: number;
  averageRank: number;
  firstBloods: number;
}

const dashboardMocks = [
  {
    id: 'competitions',
    value: 15,
    label: 'Competitions',
    icon: IcoTrophyFilled,
  },
  {
    id: 'solved',
    value: 127,
    label: 'Challenges Solved',
    icon: IcoChallengeFilled,
  },
  {
    id: 'points',
    value: 18650,
    label: 'Total Points',
    icon: IcoStarFilled,
  },
  {
    id: 'firstbloods',
    value: 12,
    label: 'First Bloods',
    icon: IcoCrownFilled,
    }
];

const mockCompetitions: CompetitionEntry[] = [
  {
    id: 'comp-001',
    name: 'Winter CTF 2024',
    status: 'running',
    myRank: 12,
    totalTeams: 87,
    myScore: 1250,
    maxScore: 2500,
    solvedChallenges: 8,
    totalChallenges: 25,
    timeLeft: '1d 5h 23m',
    team: {
      name: 'CyberNinjas',
      rank: 12
    }
  },
  {
    id: 'comp-002',
    name: 'Crypto Challenge Series',
    status: 'ended',
    myRank: 3,
    totalTeams: 45,
    myScore: 2100,
    maxScore: 2500,
    solvedChallenges: 12,
    totalChallenges: 15
  },
  {
    id: 'comp-003',
    name: 'Advanced Pwning Tournament',
    status: 'upcoming',
    myRank: 0,
    totalTeams: 0,
    myScore: 0,
    maxScore: 3000,
    solvedChallenges: 0,
    totalChallenges: 20,
    timeLeft: '3d 12h 45m'
  }
];

const mockActivities: RecentActivity[] = [
  {
    id: 'act-001',
    type: 'solve',
    challengeName: 'SQL Injection Master',
    competitionName: 'Winter CTF 2024',
    points: 450,
    timestamp: '2 hours ago',
    isFirstBlood: true
  },
  {
    id: 'act-002',
    type: 'rank_up',
    competitionName: 'Winter CTF 2024',
    timestamp: '3 hours ago'
  },
  {
    id: 'act-003',
    type: 'solve',
    challengeName: 'Buffer Overflow Basics',
    competitionName: 'Winter CTF 2024',
    points: 200,
    timestamp: '1 day ago'
  },
  {
    id: 'act-004',
    type: 'join',
    competitionName: 'Advanced Pwning Tournament',
    timestamp: '2 days ago'
  }
];

const mockStats: UserStats = {
  totalCompetitions: 15,
  totalSolved: 127,
  totalPoints: 18650,
  averageRank: 8.3,
  firstBloods: 12
};

export function DashboardPage() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    navigate('/');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'solve':
        return <Target className="h-4 w-4" />;
      case 'join':
        return <Users className="h-4 w-4" />;
      case 'rank_up':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'solve':
        return 'text-accent';
      case 'join':
        return 'text-primary';
      case 'rank_up':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">JCTF</span>
              </div>
              <div className="hidden md:flex items-center gap-16">
                <Button 
                  variant="text"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="text" 
                  onClick={() => navigate('/competitions')}
                >
                  Competitions
                </Button>
                <Button 
                  variant="text" 
                  onClick={() => navigate('/leaderboard')}
                >
                  Leaderboard
                </Button>
                <Button 
                  variant="text" 
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </Button>
                <Button 
                  variant="text" 
                  onClick={() => navigate('/teams')}
                >
                  Teams
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="secondary" 
                onClick={handleLogout}
                className="text-body-small text-bold text-primary"
              >
                <IcoLogoutFilled />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Stats Section with Background */}
      <section 
        className="py-20 relative"
        style={{
          background: 'url(/images/background.png) no-repeat center center'
        }}
      >
        <MaxWidthContainer className="relative z-10">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-heading-large text-primary-50 mb-2">
              Welcome back, <span className="text-primary">{user.nickname || user.email}</span>
            </h1>
            <p className="text-primary-100 text-body-medium">
              Ready to hack some challenges? Let's see what's new.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardMocks.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <Card key={stat.id} className="bg-neutral-900/50 backdrop-blur-sm border border-primary-900 rounded-3xl p-10">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className={`text-primary text-heading-large`}>
                          {stat.value}
                        </p>
                        <p className={`text-primary-200 text-heading-xsmall`}>
                          {stat.label}
                        </p>
                      </div>
                      <div className="w-14 h-14 flex items-center justify-center">
                        <IconComponent 
                          className="w-14 h-14" 
                          style={{
                            background: 'linear-gradient(135deg, #3730A3 2%, #1E1B4B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            fill: 'url(#icon-gradient)'
                          }}
                        />
                        <svg width="0" height="0" className="absolute">
                          <defs>
                            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="2%" stopColor="#3730A3" />
                              <stop offset="100%" stopColor="#1E1B4B" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                </Card>
              );
            })}
          </div>
        </MaxWidthContainer>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <MaxWidthContainer>
          <Tabs defaultValue="competitions" className="space-y-6">
          <TabsList className="bg-card/50 backdrop-blur-sm">
            <TabsTrigger value="competitions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              My Competitions
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              Recent Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="competitions" className="space-y-6">
            <div className="grid gap-6">
              {mockCompetitions.map((comp) => (
                <Card key={comp.id} className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-accent transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl text-foreground">{comp.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {comp.team ? `Team: ${comp.team.name}` : 'Individual Competition'}
                        </CardDescription>
                      </div>
                      <Badge 
                        variant={comp.status === 'running' ? 'default' : comp.status === 'ended' ? 'secondary' : 'outline'}
                        className={
                          comp.status === 'running' 
                            ? 'bg-accent text-accent-foreground' 
                            : comp.status === 'ended'
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-warning text-warning-foreground'
                        }
                      >
                        {comp.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Rank & Score */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Current Rank</p>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-3xl font-bold text-primary">
                              {comp.myRank || '-'}
                            </span>
                            <span className="text-muted-foreground">
                              / {comp.totalTeams || '-'}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Score</p>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-accent">
                              {comp.myScore.toLocaleString()}
                            </span>
                            <span className="text-muted-foreground">
                              / {comp.maxScore.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Challenges</span>
                            <span className="text-foreground">
                              {comp.solvedChallenges} / {comp.totalChallenges}
                            </span>
                          </div>
                          <Progress 
                            value={(comp.solvedChallenges / comp.totalChallenges) * 100} 
                            className="h-2"
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Score Progress</span>
                            <span className="text-foreground">
                              {Math.round((comp.myScore / comp.maxScore) * 100)}%
                            </span>
                          </div>
                          <Progress 
                            value={(comp.myScore / comp.maxScore) * 100} 
                            className="h-2"
                          />
                        </div>
                      </div>

                      {/* Time & Actions */}
                      <div className="space-y-4">
                        {comp.timeLeft && (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {comp.status === 'running' ? 'Time Left' : 'Starts In'}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-warning" />
                              <span className="text-warning font-semibold">
                                {comp.timeLeft}
                              </span>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex flex-col space-y-2">
                          <Button 
                            className="bg-primary hover:bg-primary/80 text-primary-foreground"
                            onClick={() => navigate('/challenges')}
                            disabled={comp.status === 'ended'}
                          >
                            {comp.status === 'running' ? 'Continue' : comp.status === 'upcoming' ? 'View Details' : 'View Results'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          
                          {comp.status === 'running' && (
                            <Button 
                              variant="secondary"
                              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                              onClick={() => navigate('/leaderboard')}
                            >
                              Leaderboard
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <IcoTimerLined1 className='text-primary size-6' />
              <span className='text-primary-200 text-heading-medium'>Recent Activity</span>
            </CardTitle>
            <CardDescription className="text-primary-100 text-body-medium">
              Your latest achievements and competition updates
            </CardDescription>
          </CardHeader>

          <TabsContent value="activity" className="space-y-6">
            <Card className="border-neutral-600 bg-neutral-900">
              <CardContent>
                <div className="grid grid-cols-1 gap-4 p-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center bg-neutral-800 rounded-2xl border-neutral-700 p-8 gap-4">
                      <div className={`p-2 rounded-full bg-card ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {activity.type === 'solve' && (
                            <>
                              <span className="text-foreground font-semibold">
                                Solved "{activity.challengeName}"
                              </span>
                              {activity.isFirstBlood && (
                                <Badge className="bg-primary text-neutral-0 text-body-xsmall">
                                  FIRST BLOOD
                                </Badge>
                              )}
                            </>
                          )}
                          {activity.type === 'join' && (
                            <span className="text-foreground font-semibold">
                              Joined {activity.competitionName}
                            </span>
                          )}
                          {activity.type === 'rank_up' && (
                            <span className="text-foreground font-semibold">
                              Rank improved in {activity.competitionName}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                          <span>{activity.competitionName}</span>
                          {activity.points && (
                            <span className="text-accent">+{activity.points} pts</span>
                          )}
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </MaxWidthContainer>
      </section>
    </div>
  );
}