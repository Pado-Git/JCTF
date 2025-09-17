import { formatLastSolvedTime } from './timeUtils';

// API 응답 구조
export interface ApiLeaderboardResponse {
  timezone: string;
  data: TeamEntry[];
}

// API 데이터를 그대로 사용 (매핑 없이)
export interface TeamEntry {
  rank: number;
  score: number;
  name: string;
  solvedCount: number;
  lastSolvedAt: string;
  logo: string;
  members: {
    name: string;
    score: number;
  }[];
  isMyTeam?: boolean;
}

// API 데이터를 가져오는 함수
export const fetchLeaderboardData = async (): Promise<ApiLeaderboardResponse> => {
  const response = await fetch('https://php-test.padev.surf/leaderboard/');

  if (!response.ok) {
    console.error('❌ Fetch failed with status:', response.status);
    throw new Error('Failed to fetch leaderboard data');
  }
  
  const data = await response.json();
  console.log('📦 Raw JSON data:', data);
  
  return data;
};

// API 데이터를 그대로 사용 (중복 제거만)
export const transformApiDataToTeamEntry = (apiData: TeamEntry[]): TeamEntry[] => {
  console.log('🔍 Raw API data length:', apiData.length);
  console.log('🔍 First 5 teams:', apiData.slice(0, 5).map(t => ({ rank: t.rank, name: t.name })));
  
  // 중복 제거: name 기준으로 중복 제거
  const uniqueTeams = apiData.reduce((acc, team) => {
    const existingTeam = acc.find(t => t.name === team.name);
    if (!existingTeam) {
      acc.push(team);
    } else {
      console.log('⚠️ Duplicate team found:', team.name, 'rank:', team.rank);
    }
    return acc;
  }, [] as TeamEntry[]);
  
  console.log('✅ After deduplication:', uniqueTeams.length);
  console.log('✅ Top 3 teams:', uniqueTeams.slice(0, 3).map(t => ({ rank: t.rank, name: t.name })));
  
  // API 데이터를 그대로 사용하되, lastSolvedAt만 포맷팅
  return uniqueTeams.map((team) => ({
    ...team,
    lastSolvedAt: formatLastSolvedTime(team.lastSolvedAt),
    isMyTeam: team.name === 'CyberNinjas' // 예시: 특정 팀을 내 팀으로 설정
  }));
};
