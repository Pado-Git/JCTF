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

// API 데이터를 score 기준으로 정렬하고 중복 제거
export const transformApiDataToTeamEntry = (apiData: TeamEntry[]): TeamEntry[] => {
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
  
  // Score 기준으로 내림차순 정렬 (높은 점수부터)
  const sortedTeams = uniqueTeams.sort((a, b) => {
    // 1차: score 내림차순
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    // 2차: solvedCount 내림차순 (score가 같으면 solvedCount로)
    if (b.solvedCount !== a.solvedCount) {
      return b.solvedCount - a.solvedCount;
    }
    // 3차: lastSolvedAt 오름차순 (score, solvedCount가 같으면 마지막 해결 시간이 빠른 순)
    return new Date(a.lastSolvedAt).getTime() - new Date(b.lastSolvedAt).getTime();
  });
  
  // 정렬 후 rank 재할당
  const rankedTeams = sortedTeams.map((team, index) => ({
    ...team,
    rank: index + 1
  }));

  // lastSolvedAt 포맷팅 및 내 팀 설정
  return rankedTeams.map((team) => ({
    ...team,
    isMyTeam: team.name === 'CyberNinjas' // 예시: 특정 팀을 내 팀으로 설정
  }));
};
