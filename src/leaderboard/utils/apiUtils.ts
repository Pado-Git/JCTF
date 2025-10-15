import { fetcher } from "@/+shared";

// API 응답 구조
export interface ApiLeaderboardResponse {
  success: boolean;
  data: {
    data: TeamEntry[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    lastUpdated: string;
  };
}

// API 데이터를 그대로 사용 (매핑 없이)
export interface TeamEntry {
  id: string;
  teamId: string;
  name: string;
  rank: number;
  team: {
    id: string;
    name: string;
  };
  totalScore: number;
  solvedChallenges: number;
  lastSolveAt: string | null;
  members: {
    nickname: string;
    individualScore: number;
  }[];
  timeline: {
    challengeId: string;
    challengeName: string;
    category: string;
    points: number;
    solvedAt: string;
    isFirstBlood: boolean;
  }[];
  isMyTeam?: boolean;
}

// API 데이터를 가져오는 함수
export const fetchLeaderboardData = async (competitionId: string): Promise<ApiLeaderboardResponse> => {
  const response = await fetcher<ApiLeaderboardResponse>({
    url: `/leaderboard/${competitionId}`,
    method: 'get',
    query: {
      competitionId: competitionId
    }
  });

  if (!response.result.success) {
    console.error('❌ Fetch failed:', response.result);
    throw new Error('Failed to fetch leaderboard data');
  }
  
  return response.result;
};

// 내 팀 데이터를 가져오는 함수
export const fetchMyTeamData = async (competitionId: string): Promise<ApiLeaderboardResponse> => {
  const response = await fetcher<ApiLeaderboardResponse>({
    url: `/leaderboard/${competitionId}/my-rank`,
    method: 'get',
    query: {
      competitionId: competitionId
    }
  });

  if (!response.result.success) {
    console.error('❌ Fetch failed:', response.result);
    throw new Error('Failed to fetch my team data');
  }
  return response.result;
}