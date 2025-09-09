import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/data-display/card';
import { Badge } from '@/components/feedback/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/data-display/tabs';
import { Switch } from '@/components/form/switch';
import { Label } from '@/components/form/label';
import { 
  Shield, 
  Trophy, 
  Crown, 
  Medal,
  TrendingUp, 
  TrendingDown,
  Minus,
  Users, 
  Target,
  RefreshCw,
  ArrowLeft,
} from 'lucide-react';

// Props interface removed - using React Router now

interface TeamEntry {
  rank: number;
  previousRank: number;
  teamName: string;
  score: number;
  solvedCount: number;
  lastSolvedAt: string;
  members: {
    nickname: string;
    score: number;
    contribution: number;
  }[];
  rankChange: number; // positive = up, negative = down, 0 = no change
  isMyTeam?: boolean;
}

interface FirstBloodEntry {
  challengeName: string;
  category: string;
  teamName: string;
  user: string;
  timestamp: string;
  points: number;
}

interface CompetitionInfo {
  name: string;
  timeLeft: string;
  totalTeams: number;
  totalChallenges: number;
  lastUpdated: string;
}

const mockCompetition: CompetitionInfo = {
  name: 'Winter CTF 2024',
  timeLeft: '1d 5h 23m',
  totalTeams: 89,
  totalChallenges: 25,
  lastUpdated: '2 minutes ago'
};

const mockLeaderboard: TeamEntry[] = [
  {
    rank: 1,
    previousRank: 1,
    teamName: 'CyberWarriors',
    score: 3250,
    solvedCount: 18,
    lastSolvedAt: '5 minutes ago',
    members: [
      { nickname: 'Alice', score: 1500, contribution: 46.2 },
      { nickname: 'Bob', score: 1000, contribution: 30.8 },
      { nickname: 'Charlie', score: 750, contribution: 23.1 }
    ],
    rankChange: 0
  },
  {
    rank: 2,
    previousRank: 3,
    teamName: 'Binary Ninjas',
    score: 2980,
    solvedCount: 16,
    lastSolvedAt: '12 minutes ago',
    members: [
      { nickname: 'Dave', score: 1200, contribution: 40.3 },
      { nickname: 'Eve', score: 980, contribution: 32.9 },
      { nickname: 'Frank', score: 800, contribution: 26.8 }
    ],
    rankChange: 1
  },
  {
    rank: 3,
    previousRank: 2,
    teamName: 'Hack The Planet',
    score: 2850,
    solvedCount: 15,
    lastSolvedAt: '18 minutes ago',
    members: [
      { nickname: 'Grace', score: 1100, contribution: 38.6 },
      { nickname: 'Henry', score: 950, contribution: 33.3 },
      { nickname: 'Ivy', score: 800, contribution: 28.1 }
    ],
    rankChange: -1
  },
  // ... more teams
  {
    rank: 12,
    previousRank: 14,
    teamName: 'CyberNinjas',
    score: 1250,
    solvedCount: 8,
    lastSolvedAt: '2 hours ago',
    members: [
      { nickname: 'User123', score: 650, contribution: 52.0 },
      { nickname: 'TeamMate1', score: 400, contribution: 32.0 },
      { nickname: 'TeamMate2', score: 200, contribution: 16.0 }
    ],
    rankChange: 2,
    isMyTeam: true
  }
];

const mockFirstBloods: FirstBloodEntry[] = [
  {
    challengeName: 'Advanced Crypto Challenge',
    category: 'Crypto',
    teamName: 'CyberWarriors',
    user: 'Alice',
    timestamp: '5 minutes ago',
    points: 750
  },
  {
    challengeName: 'Buffer Overflow Master',
    category: 'Pwn',
    teamName: 'Binary Ninjas',
    user: 'Dave',
    timestamp: '23 minutes ago',
    points: 650
  },
  {
    challengeName: 'SQL Injection Pro',
    category: 'Web',
    teamName: 'Hack The Planet',
    user: 'Grace',
    timestamp: '1 hour ago',
    points: 500
  },
  {
    challengeName: 'Reverse Engineering Hell',
    category: 'Reverse',
    teamName: 'Code Breakers',
    user: 'John',
    timestamp: '2 hours ago',
    points: 900
  },
  {
    challengeName: 'Forensics Mystery',
    category: 'Forensics',
    teamName: 'Digital Detectives',
    user: 'Sarah',
    timestamp: '3 hours ago',
    points: 600
  }
];

function RankIcon({ rank, change }: { rank: number; change: number }) {
  if (rank === 1) {
    return <Crown className="h-6 w-6 text-first-blood" />;
  }
  if (rank === 2) {
    return <Medal className="h-6 w-6 text-muted-foreground" />;
  }
  if (rank === 3) {
    return <Medal className="h-6 w-6 text-warning" />;
  }
  
  // Rank change indicator
  if (change > 0) {
    return <TrendingUp className="h-4 w-4 text-accent" />;
  }
  if (change < 0) {
    return <TrendingDown className="h-4 w-4 text-destructive" />;
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function TeamCard({ team, showDetails }: { team: TeamEntry; showDetails: boolean }) {
  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-first-blood/10 border-first-blood/50';
    if (rank === 2) return 'bg-muted/10 border-muted/50';
    if (rank === 3) return 'bg-warning/10 border-warning/50';
    return team.isMyTeam ? 'bg-primary/10 border-primary/50' : 'bg-card/50 border-border';
  };

  return (
    <Card className={`backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getRankStyle(team.rank)}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RankIcon rank={team.rank} change={team.rankChange} />
              <span className="text-3xl font-bold text-foreground">
                #{team.rank}
              </span>
              {team.rankChange !== 0 && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${
                    team.rankChange > 0 ? 'text-accent' : 'text-destructive'
                  }`}
                >
                  {team.rankChange > 0 ? '+' : ''}{team.rankChange}
                </Badge>
              )}
            </div>
            
            <div>
              <h3 className={`text-xl font-bold ${team.isMyTeam ? 'text-primary' : 'text-foreground'}`}>
                {team.teamName}
                {team.isMyTeam && (
                  <Badge className="ml-2 bg-primary text-primary-foreground text-xs">
                    YOU
                  </Badge>
                )}
              </h3>
              <p className="text-sm text-muted-foreground">
                Last solved: {team.lastSolvedAt}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-accent">
              {team.score.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {team.solvedCount} challenges
            </div>
          </div>
        </div>
        
        {showDetails && (
          <div className="space-y-3 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground">Team Members</h4>
            <div className="grid gap-2">
              {team.members.map((member) => (
                <div key={member.nickname} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm text-foreground">{member.nickname}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="text-muted-foreground">
                      {member.contribution.toFixed(1)}%
                    </span>
                    <span className="text-accent font-semibold">
                      {member.score.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function LeaderboardPage() {
  const navigate = useNavigate();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // In a real app, this would fetch new data
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = () => {
    setLastUpdate(new Date());
    // In a real app, this would trigger a data refresh
  };

  const myTeam = mockLeaderboard.find(team => team.isMyTeam);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="text"
                onClick={() => navigate('/dashboard') || (() => navigate?.('home'))}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">JCTF</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {mockCompetition.timeLeft}
                </div>
                <div className="text-xs text-muted-foreground">Time Remaining</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {mockCompetition.totalTeams}
                </div>
                <div className="text-xs text-muted-foreground">Teams</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">
                  {mockCompetition.totalChallenges}
                </div>
                <div className="text-xs text-muted-foreground">Challenges</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <Trophy className="inline h-10 w-10 text-first-blood mr-3" />
            {mockCompetition.name} <span className="text-accent">Leaderboard</span>
          </h1>
          <p className="text-muted-foreground">
            Live rankings updated every 30 seconds
          </p>
        </div>

        {/* My Team Highlight */}
        {myTeam && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Team</h2>
            <TeamCard team={myTeam} showDetails={true} />
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
              <Label htmlFor="auto-refresh" className="text-sm text-foreground">
                Auto-refresh (30s)
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="show-details"
                checked={showDetails}
                onCheckedChange={setShowDetails}
              />
              <Label htmlFor="show-details" className="text-sm text-foreground">
                Show team details
              </Label>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Last updated: {mockCompetition.lastUpdated}
            </div>
            <Button
              variant="secondary"
              size="small"
              onClick={handleRefresh}
              className="border-primary/30 text-primary hover:bg-primary/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="bg-card/50 backdrop-blur-sm">
            <TabsTrigger 
              value="leaderboard" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger 
              value="first-bloods" 
              className="data-[state=active]:bg-first-blood data-[state=active]:text-first-blood-foreground"
            >
              <Crown className="h-4 w-4 mr-2" />
              First Bloods
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="grid gap-4">
              {mockLeaderboard.map((team) => (
                <TeamCard key={team.teamName} team={team} showDetails={showDetails} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="first-bloods" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-first-blood/30">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Crown className="h-6 w-6 text-first-blood mr-2" />
                  First Blood Hall of Fame
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Teams and users who solved challenges first
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFirstBloods.map((firstBlood, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-first-blood/5 border border-first-blood/20">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <Crown className="h-5 w-5 text-first-blood" />
                          <Badge 
                            style={{ backgroundColor: getCategoryColor(firstBlood.category) }}
                            className="text-black font-semibold"
                          >
                            {firstBlood.category}
                          </Badge>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {firstBlood.challengeName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            <span className="text-first-blood font-semibold">{firstBlood.user}</span>
                            {' from '}
                            <span className="text-accent">{firstBlood.teamName}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-first-blood">
                          +{firstBlood.points}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {firstBlood.timestamp}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30 text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-primary">
                {mockCompetition.totalTeams}
              </div>
              <p className="text-sm text-muted-foreground">Competing Teams</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-accent/30 text-center">
            <CardContent className="p-6">
              <Target className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-accent">
                {mockLeaderboard.reduce((sum, team) => sum + team.solvedCount, 0)}
              </div>
              <p className="text-sm text-muted-foreground">Total Solves</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card/50 backdrop-blur-sm border-first-blood/30 text-center">
            <CardContent className="p-6">
              <Crown className="h-8 w-8 text-first-blood mx-auto mb-3" />
              <div className="text-2xl font-bold text-first-blood">
                {mockFirstBloods.length}
              </div>
              <p className="text-sm text-muted-foreground">First Bloods</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    'Web': '#FF6B6B',
    'Crypto': '#4ECDC4',
    'Pwn': '#45B7D1',
    'Reverse': '#96CEB4',
    'Forensics': '#FFEAA7',
    'Misc': '#DDA0DD'
  };
  return colors[category] || '#FFFFFF';
}