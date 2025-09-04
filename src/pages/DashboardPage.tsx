import { useState, useEffect } from 'react';
import { Button } from '../components/ui/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/data-display/card';
import { Badge } from '../components/ui/feedback/badge';
import { Progress } from '../components/ui/feedback/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/data-display/tabs';
import { 
  Shield, 
  Trophy, 
  Target, 
  Users, 
  Clock, 
  Zap, 
  Calendar,
  TrendingUp,
  Award,
  Activity,
  ArrowRight,
  Settings
} from 'lucide-react';

interface DashboardPageProps {
  user: { email: string; nickname?: string };
  onNavigate?: (page: string) => void;
  onLogout?: () => void;
}

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

export function DashboardPage({ user, onNavigate, onLogout }: DashboardPageProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
              <div className="hidden md:flex items-center space-x-6">
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate?.('dashboard')}
                  className="text-primary"
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate?.('competitions')}
                  className="text-muted-foreground hover:text-accent"
                >
                  Competitions
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate?.('leaderboard')}
                  className="text-muted-foreground hover:text-accent"
                >
                  Leaderboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate?.('profile')}
                  className="text-muted-foreground hover:text-accent"
                >
                  Profile
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => onNavigate?.('teams')}
                  className="text-muted-foreground hover:text-accent"
                >
                  Teams
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {currentTime.toLocaleTimeString()}
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate?.('profile')}
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Welcome back, <span className="text-accent">{user.nickname || user.email}</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Ready to hack some challenges? Let's see what's new.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Competitions</p>
                  <p className="text-3xl font-bold text-primary">
                    {mockStats.totalCompetitions}
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-accent/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Challenges Solved</p>
                  <p className="text-3xl font-bold text-accent">
                    {mockStats.totalSolved}
                  </p>
                </div>
                <Target className="h-8 w-8 text-accent/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-3xl font-bold text-warning">
                    {mockStats.totalPoints.toLocaleString()}
                  </p>
                </div>
                <Zap className="h-8 w-8 text-warning/50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-first-blood/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">First Bloods</p>
                  <p className="text-3xl font-bold text-first-blood">
                    {mockStats.firstBloods}
                  </p>
                </div>
                <Award className="h-8 w-8 text-first-blood/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
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
                            onClick={() => onNavigate?.('challenges')}
                            disabled={comp.status === 'ended'}
                          >
                            {comp.status === 'running' ? 'Continue' : comp.status === 'upcoming' ? 'View Details' : 'View Results'}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          
                          {comp.status === 'running' && (
                            <Button 
                              variant="outline"
                              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                              onClick={() => onNavigate?.('leaderboard')}
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

          <TabsContent value="activity" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your latest achievements and competition updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 border border-border">
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
                                <Badge className="bg-first-blood text-first-blood-foreground text-xs">
                                  FIRST BLOOD!
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
      </div>
    </div>
  );
}