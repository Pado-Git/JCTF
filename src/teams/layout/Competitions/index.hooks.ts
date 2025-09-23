import { useState } from 'react';

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<any[]>([]);

  const handleCompetitionAction = (competitionId: string, action: string) => {
    // TODO: 경쟁 관련 액션 로직 구현
    console.log(`Competition ${competitionId} action: ${action}`);
  };

  const getCompetitionStats = (competition: any) => {
    return {
      rank: competition.rank || 0,
      totalTeams: competition.totalTeams || 0,
      points: competition.points || 0,
    };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return {
    competitions,
    setCompetitions,
    handleCompetitionAction,
    getCompetitionStats,
    formatDate,
  };
}
