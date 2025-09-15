import { IcoTrophyFilled, IcoChallengeFilled, IcoStarFilled, IcoCrownFilled } from '@/+shared/assets/icons';
import { CompetitionEntry, RecentActivity, UserStats, StatCard, HeaderInfo } from '@/dashboard/types';
import { ChallengeBg1, ChallengeBg2, ChallengeBg3 } from '@/dashboard/assets';

export const dashboardMocks: StatCard[] = [
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

export const mockCompetitions: CompetitionEntry[] = [
  {
    id: 'comp-001',
    name: 'Winter CTF 2024',
    backgroundImg: ChallengeBg1,
    description: 'Test your skills in web exploitation, cryptography, and reverse engineering',
    status: 'live',
    startTime: '2024-01-15T09:00:00Z',
    endTime: '2024-01-17T21:00:00Z',
    participants: 234,
    challenges: 25,
    type: 'team',
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
    name: 'Beginner Crypto Challenge',
    backgroundImg: ChallengeBg2,
    description: 'Perfect for newcomers to cryptography',
    status: 'upcoming',
    startTime: '2024-01-20T10:00:00Z',
    endTime: '2024-01-20T18:00:00Z',
    participants: 89,
    challenges: 15,
    type: 'individual',
    myRank: 0,
    totalTeams: 0,
    myScore: 0,
    maxScore: 1500,
    solvedChallenges: 0,
    totalChallenges: 15,
    timeLeft: '5d 2h 15m'
  },
  {
    id: 'comp-003',
    name: 'Advanced Pwning Tournament',
    backgroundImg: ChallengeBg3,
    description: 'Binary exploitation and reverse engineering challenges',
    status: 'upcoming',
    startTime: '2024-01-25T14:00:00Z',
    endTime: '2024-01-27T14:00:00Z',
    participants: 156,
    challenges: 20,
    type: 'team',
    myRank: 0,
    totalTeams: 0,
    myScore: 0,
    maxScore: 3000,
    solvedChallenges: 0,
    totalChallenges: 20,
    timeLeft: '3d 12h 45m'
  }
];

export const mockActivities: RecentActivity[] = [
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

export const mockStats: UserStats = {
  totalCompetitions: 15,
  totalSolved: 127,
  totalPoints: 18650,
  averageRank: 8.3,
  firstBloods: 12
};

export const headerInfo: HeaderInfo[] = [
  {
    id: 'time',
    value: '1d 5h 23m',
    label: 'Time Left'
  },
  {
    id: 'teams',
    value: 89,
    label: 'Teams'
  },
  {
    id: 'challenges',
    value: 25,
    label: 'Challenges'
  }
];