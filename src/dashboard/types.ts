export interface CompetitionEntry {
  id: string;
  name: string;
  backgroundImg: string;
  description?: string;
  status?: 'live' | 'upcoming' | 'ended'; // optional since it's calculated
  startDate: string;
  endDate: string;
  participants?: number;
  challenges?: number;
  type?: 'team' | 'individual';
  myRank: number;
  totalTeams: number;
  myScore: number;
  maxScore: number;
  solvedChallenges: number;
  totalChallenges: number;
  team?: {
    name: string;
    rank: number;
  };
}

export interface RecentActivity {
  id: string;
  type: 'solve' | 'join' | 'rank_up';
  challengeName?: string;
  competitionName: string;
  points?: number;
  timestamp: string;
  isFirstBlood?: boolean;
}

export interface UserStats {
  totalCompetitions: number;
  totalSolved: number;
  totalPoints: number;
  averageRank: number;
  firstBloods: number;
}

export interface StatCard {
  id: string;
  value: number;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export interface HeaderInfo {
  id: string;
  value: string | number;
  label: string;
}