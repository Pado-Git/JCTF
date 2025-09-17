import { TeamEntry } from '@/leaderboard/utils';

export interface UseHeaderSectionProps {
  leaderboardData: TeamEntry[];
}

export const useHeaderSection = ({ leaderboardData }: UseHeaderSectionProps) => {
  // 내 팀 정보 찾기
  const myTeam = leaderboardData.find(team => team.isMyTeam);

  return {
    myTeam
  };
};
