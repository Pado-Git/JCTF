import { useState, useMemo } from 'react';
import { TeamEntry } from '@/leaderboard/utils';
import { useNow } from '@/+shared/hooks';

export interface UseLeaderboardSectionProps {
  leaderboardData: TeamEntry[];
}

export const useLeaderboardSection = ({ leaderboardData }: UseLeaderboardSectionProps) => {
  const [showAllTeams, setShowAllTeams] = useState(false);

  // 1분마다 현재 시간 업데이트
  const now = useNow(60000);

  // 팀 데이터 분리 + 실시간 시간 포맷팅
  const { top3Teams, otherTeams, hasMoreTeams } = useMemo(() => {
    const top3 = leaderboardData.slice(0, 3);
    const maxDisplayTeams = showAllTeams ? leaderboardData.length : 10;
    const others = leaderboardData.slice(3, maxDisplayTeams);
    const hasMore = leaderboardData.length > 10;

    return {
      top3Teams: top3,
      otherTeams: others,
      hasMoreTeams: hasMore
    };
  }, [leaderboardData, showAllTeams, now]);

  return {
    top3Teams,
    otherTeams,
    hasMoreTeams,
    showAllTeams,
    setShowAllTeams
  };
};