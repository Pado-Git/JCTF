import { useState, useMemo } from 'react';
import { useAuthStore } from '@/+shared/stores/useAuthStore';
import { type Team } from '@/teams/data';

interface StatItem {
  value: string;
  label: string;
}

export function useMyTeam(team?: Team) {
  const { user } = useAuthStore();
  const [myTeam, setMyTeam] = useState<Team | null>(null);

  const currentTeam = team || myTeam;
  const isTeamLeader = currentTeam?.members.find(m => m.email === user?.email)?.role === 'leader';

  // 통계 데이터를 훅에서 생성
  const teamStats: StatItem[] = useMemo(() => {
    if (!currentTeam) return [];

    return [
      {
        value: currentTeam.stats.totalPoints.toLocaleString(),
        label: 'Total Points'
      },
      {
        value: currentTeam.stats.totalCompetitions.toString(),
        label: 'Competitions'
      },
      {
        value: currentTeam.stats.bestRank.toString(),
        label: 'Best Rank'
      },
      {
        value: Math.round(currentTeam.stats.averageRank).toString(),
        label: 'Avg Rank'
      }
    ];
  }, [currentTeam]);

  const handleEditTeam = () => {
    // TODO: 팀 편집 로직 구현
    console.log('Edit team clicked');
  };

  const handleCopyInviteCode = (inviteCode: string) => {
    navigator.clipboard.writeText(inviteCode);
    // TODO: 토스트 메시지 표시
    console.log('Invite code copied:', inviteCode);
  };

  return {
    myTeam,
    setMyTeam,
    isTeamLeader,
    teamStats,
    handleEditTeam,
    handleCopyInviteCode,
  };
}
