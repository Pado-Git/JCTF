import { useState, useEffect, useRef } from 'react';
import { 
  fetchLeaderboardData, 
  TeamEntry 
} from '@/leaderboard/utils';
import { type ControlsSectionRef } from '@/leaderboard/layout/ControlsSection/index.hooks';
import { useAuthStore } from '@/+shared';
import { fetcher } from '@/+shared/libs';

export const useLeaderboardPage = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [myTeam, setMyTeam] = useState<any>(null);
  const [myRank, setMyRank] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const competitionId = useAuthStore(state => state.competitionId);
  
  // ControlsSection의 ref
  const controlsSectionRef = useRef<ControlsSectionRef>(null);

  // 데이터 가져오기 함수
  const loadLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // 리더보드 데이터 가져오기
      const apiResponse = await fetchLeaderboardData(competitionId || '');
      setLeaderboardData(apiResponse.data.data);
      
      // 내 팀 정보 가져오기
      const fetchMyTeam = await fetcher({
        url: `/participant/teams/${competitionId}/my-team`,
        method: 'get',
        query: { competitionId: competitionId }
      });
      setMyTeam(fetchMyTeam.result.data);

      // 내 순위 정보 가져오기
      const fetchMyRank = await fetcher({
        url: `/leaderboard/${competitionId}/my-rank`,
        method: 'get',
        query: { competitionId: competitionId }
      });
      setMyRank(fetchMyRank.result.data);
      
      // ControlsSection에 마지막 업데이트 시간 전달
      const now = new Date();
      controlsSectionRef.current?.updateLastUpdated(now);
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      console.error('Failed to load leaderboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadLeaderboardData();
  }, []);

  // 자동 새로고침
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadLeaderboardData();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const handleRefresh = () => {
    loadLeaderboardData();
  };

  return {
    autoRefresh,
    setAutoRefresh,
    leaderboardData,
    myTeam,
    myRank,
    loading,
    error,
    handleRefresh,
    controlsSectionRef
  };
};
