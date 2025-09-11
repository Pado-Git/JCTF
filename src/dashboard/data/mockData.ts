import { IcoTrophyFilled, IcoChallengeFilled, IcoStarFilled, IcoCrownFilled } from '@/+shared/assets/icons';
import { CompetitionEntry, RecentActivity, UserStats, StatCard, HeaderInfo } from '@/dashboard/types';

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
    status: 'live',
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