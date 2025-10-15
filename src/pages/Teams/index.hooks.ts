import { useEffect, useState } from 'react';
import { fetcher } from '@/+shared/libs/fetch';
import { useAuthStore } from '@/+shared';

export function useTeamsPage() {
  const [myTeam, setMyTeam] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState('Members');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const competitionId = useAuthStore(state => state.competitionId);

  // 탭 카테고리 정의
  // const tabCategories = ['Members', 'Competitions'];
  const tabCategories = ['Members'];

  // 탭 변경 핸들러
  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchMyTeam = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetcher<any>({
          url: `/participant/teams/${competitionId}/my-team`,
          method: 'get',
          query: {
            competitionId: competitionId
          }
        });

        if (response.resultCode === 200 && response.result?.data) {
          setMyTeam(response.result.data);
        } else {
          setError('Failed to fetch my team');
        }
      } catch (err) {
        setError('Failed to fetch my team');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyTeam();
  }, []);

  return {
    myTeam,
    activeTab,
    tabCategories,
    changeActiveTab,
    isLoading,
    error,
  };
}
