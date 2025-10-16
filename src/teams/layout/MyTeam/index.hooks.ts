import { useState, useMemo, useEffect } from 'react';
import { useAuthStore } from '@/+shared/stores/useAuthStore';
import { showToast, useUserStore } from '@/+shared';
import { fetcher } from '@/+shared/libs';

// interface StatItem {
//   value: string;
//   label: string;
// }

export function useMyTeam(team?: any) {
  const { user } = useAuthStore();
  const userData = useUserStore(state => state.user?.data);
  const [myTeam, setMyTeam] = useState<any | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const currentTeam = team || myTeam;

  // 통계 데이터를 훅에서 생성
  // const teamStats: StatItem[] = useMemo(() => {
  //   if (!currentTeam) return [];

  //   return [
  //     {
  //       value: currentTeam.stats.totalPoints.toLocaleString(),
  //       label: 'Total Points'
  //     },
  //     {
  //       value: currentTeam.stats.totalCompetitions.toString(),
  //       label: 'Competitions'
  //     },
  //     {
  //       value: currentTeam.stats.bestRank.toString(),
  //       label: 'Best Rank'
  //     },
  //     {
  //       value: Math.round(currentTeam.stats.averageRank).toString(),
  //       label: 'Avg Rank'
  //     }
  //   ];
  // }, [currentTeam]);

  const handleEditTeam = () => {
    if (isEditing) {
      // 편집 모드 종료
      setIsEditing(false);
      setEditedDescription('');
    } else {
      // 편집 모드 시작
      setIsEditing(true);
      setEditedDescription(currentTeam?.description || '');
    }
  };

  const handleSaveDescription = async () => {
    if (!currentTeam?.id) {
      console.error('No team ID available');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetcher({
        url: `/participant/teams/${currentTeam.id}`,
        method: 'patch',
        body: {
          description: editedDescription
        }
      });

      if (response.resultCode === 200) {
        // 성공 시 팀 정보 업데이트
        if (team) {
          team.description = editedDescription;
        }
        setIsEditing(false);
        setEditedDescription('');
        showToast('Team description updated successfully', 'active');
      } else {
        console.error('Failed to update team description:', response);
        showToast('Failed to update team description', 'error');
      }
    } catch (error) {
      console.error('Error updating team description:', error);
      showToast('Error updating team description', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Profile Overview와 동일한 로직 사용
  const isTeamLeader = (() => {
    const userEmail = userData?.email;
    
    if (!userEmail || !currentTeam?.members) {
      return false;
    }
    
    const matchingMember = currentTeam.members.find((member: any) => {
      return member.participant?.user?.email === userEmail;
    });
    
    const isLeader = matchingMember?.role === 'LEADER';
    
    return isLeader;
  })();

  console.log(isTeamLeader);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedDescription('');
  };

  // const handleCopyInviteCode = (inviteCode: string) => {
  //   navigator.clipboard.writeText(inviteCode);
  //   showToast('Invite code copied successfully', 'active');
  // };

  return {
    myTeam,
    setMyTeam,
    isTeamLeader,
    // teamStats,
    isEditing,
    editedDescription,
    isLoading,
    handleEditTeam,
    handleSaveDescription,
    handleCancelEdit,
    // handleCopyInviteCode,
    setEditedDescription,
  };
}
