import { useState } from 'react';
import { TeamEntry } from '@/leaderboard/utils';

export interface UseLeaderboardSectionProps {
  leaderboardData: TeamEntry[];
}

export const useLeaderboardSection = ({ leaderboardData }: UseLeaderboardSectionProps) => {
  const [showAllTeams, setShowAllTeams] = useState(false);

  // 팀 데이터 분리
  const top3Teams = leaderboardData.slice(0, 3);
  
  // 표시할 팀 수 결정 (Top 3 + Other 팀들로 총 10팀 또는 전체)
  const maxDisplayTeams = showAllTeams ? leaderboardData.length : 10;
  const otherTeams = leaderboardData.slice(3, maxDisplayTeams);
  const hasMoreTeams = leaderboardData.length > 10;

  return {
    top3Teams,
    otherTeams,
    hasMoreTeams,
    showAllTeams,
    setShowAllTeams
  };
};
