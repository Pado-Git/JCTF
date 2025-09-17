import { useState, useEffect, useRef } from 'react';
import { 
  fetchLeaderboardData, 
  transformApiDataToTeamEntry, 
  TeamEntry 
} from '@/leaderboard/utils';
import { type ControlsSectionRef } from '@/leaderboard/layout';

export const useLeaderboardPage = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<TeamEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // ControlsSection의 ref
  const controlsSectionRef = useRef<ControlsSectionRef>(null);

  // 데이터 가져오기 함수
  const loadLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiResponse = await fetchLeaderboardData();
      
      const transformedData = transformApiDataToTeamEntry(apiResponse.data);
      
      setLeaderboardData(transformedData);
      
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
    loading,
    error,
    handleRefresh,
    controlsSectionRef
  };
};
