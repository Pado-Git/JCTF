import { useState, useMemo, useEffect } from 'react';
import { fetcher } from '@/+shared/libs';

export function useCompetitions() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedCategory] = useState('All');
  const [competitionsList, setCompetitionsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetcher<any>({
          url: '/participant/competitions',
          method: 'get',
          query: {}
        });

        if (response.resultCode === 200 && response.result?.success) {
          setCompetitionsList(response.result.data);
        } else {
          setError('Failed to fetch competitions');
        }
      } catch (err) {
        setError('Failed to fetch competitions');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  const filteredCompetitions = useMemo(() => {
    return competitionsList.filter(comp => {
      // 상태별 필터링
      const matchesStatus = selectedTab === 'All' || comp.status.toLowerCase() === selectedTab.toLowerCase();

      return matchesStatus;
    });
  }, [competitionsList, selectedTab, selectedCategory]);

  const competitionsWithStatus = useMemo(() => {
    return competitionsList.map(comp => ({
      ...comp,
      status: comp.status.toLowerCase()
    }));
  }, [competitionsList]);

  const statusCategories = Array.from(
    new Set(competitionsWithStatus.map(c => c.status))
  );

  return {
    selectedTab,
    setSelectedTab,
    selectedCategory,
    filteredCompetitions,
    statusCategories,
    competitionsWithStatus,
    isLoading,
    error,
  };
}
