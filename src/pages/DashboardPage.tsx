import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/+shared/components/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/+shared/components/data-display/card';
import { Badge } from '@/+shared/components/feedback/badge';
import { Progress } from '@/+shared/components/feedback/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/+shared/components/data-display/tabs';
import { MaxWidthContainer } from '@/+shared/components/layout/MaxWidthContainer';
import { IcoTrophyFilled, IcoChallengeFilled, IcoStarFilled, IcoCrownFilled, IcoLogoutFilled, IcoTimerLined1, IcoMedalFilled } from '@/+shared/assets/icons';
import {
  Shield, 
  Target, 
  Users, 
  Clock, 
  TrendingUp,
  Activity,
  ArrowRight
} from 'lucide-react';
import { AnimatedBackground } from '@/home/components';
import { leaderBg1, leaderBg2, leaderBg3 } from '@/home/assets';
import { headerInfo } from '@/dashboard/data/mockData';
import { ActivityCard, CompetitionCard, StatCard } from '@/dashboard/components';

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


export function DashboardPage() {
  const navigate = useNavigate();
  const [user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  const handleLogout = () => {
    navigate('/');
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

      <MaxWidthContainer className="relative z-10">
        {/* Welcome Header */}
        <div className="p-4">
          <div className="absolute inset-0 z-0">
            <AnimatedBackground
              images={[leaderBg1, leaderBg2, leaderBg3]}
              interval={400}
              opacity={1}
            />
          </div>
          <div className='relative z-10 mt-20 mb-14 flex items-center justify-between'>
            <div>
              <h1 className="text-heading-large text-primary-50 mb-2">
                Welcome back <span className="text-primary">{user.nickname || user.email}</span>
              </h1>
              <p className="text-primary-100 text-body-medium">
                Ready to hack some challenges? Let's see what's new.
              </p>
            </div>
            <div className='flex items-center gap-10'>
              {headerInfo.map((info) => {
                return (
                  <div className='flex flex-col items-center gap-1'>
                    <span className='text-heading-xsmall text-primary-50'>{info.value}</span>
                    <span className='text-primary-200 text-body-small'>{info.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {dashboardMocks.map((stat) => (
            <StatCard
              key={stat.id}
              id={stat.id}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>
      </MaxWidthContainer>

      {/* Main Content */}
      <section className="py-20">
        <MaxWidthContainer>
          <div className='flex items-center gap-4 mb-10'>
            <IcoMedalFilled className='text-primary size-6' />
            <span className='text-primary-200 text-heading-medium'>My Competitions</span>
          </div>
          <div className="grid gap-6">
            {mockCompetitions.map((comp) => (
              <CompetitionCard
                key={comp.id}
                competition={comp}
              />
            ))}
          </div>
        </MaxWidthContainer>
      </section>

      <section className='py-20 bg-neutral-800'>
        <MaxWidthContainer>
          <div className='flex flex-col gap-2 mb-10'>
            <div className='flex items-center gap-4'>
              <IcoTimerLined1 className='text-primary size-6' />
              <span className='text-primary-200 text-heading-medium'>Recent Activity</span>
            </div>
            <span className='text-primary-100 text-body-medium'>
              Your latest achievements and competition updates
            </span>
          </div>

          <Card className="border-neutral-600 bg-neutral-900">
            <div className="grid grid-cols-1 gap-4 p-4">
              {mockActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </Card>
        </MaxWidthContainer>
      </section>
    </div>
  );
}