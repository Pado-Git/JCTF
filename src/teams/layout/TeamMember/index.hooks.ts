import { useState } from 'react';

export function useTeamMember() {
  const [members, setMembers] = useState<any[]>([]);

  const handleMemberAction = (memberId: string, action: string) => {
    // TODO: 멤버 관련 액션 로직 구현
    console.log(`Member ${memberId} action: ${action}`);
  };

  const getMemberStats = (member: any) => {
    return {
      totalPoints: member.stats?.totalPoints || 0,
      totalSolved: member.stats?.totalSolved || 0,
    };
  };

  const getMemberInitials = (nickname: string) => {
    return nickname.slice(0, 2).toUpperCase();
  };

  return {
    members,
    setMembers,
    handleMemberAction,
    getMemberStats,
    getMemberInitials,
  };
}
