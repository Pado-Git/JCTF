import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiLeaderboardResponse } from '@/leaderboard/utils';
import { fetcher } from '@/+shared';

export const useHeaderSection = () => {
  const { competitionId } = useParams();
  const [myTeam, setMyTeam] = useState<any>(null);
  const [myRank, setMyRank] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // 내 팀 정보 가져오기
        const fetchMyTeam = await fetcher<ApiLeaderboardResponse>({
          url: `/participant/teams/${competitionId}/my-team`,
          method: 'get',
          query: {
            competitionId: competitionId
          }
        });
        setMyTeam(fetchMyTeam.result.data);

        // 내 순위 정보 가져오기
        const fetchMyRank = await fetcher<ApiLeaderboardResponse>({
          url: `/leaderboard/${competitionId}/my-rank`,
          method: 'get',
          query: {
            competitionId: competitionId
          }
        });
        setMyRank(fetchMyRank.result.data);

      } catch (error) {
        console.error('Failed to fetch data:', error);
        setMyTeam(null);
        setMyRank(null);
      } finally {
        setLoading(false);
      }
    };

    if (competitionId) {
      fetchData();
    }
  }, [competitionId]);

  return {
    myTeam,
    myRank,
    loading
  };
};
