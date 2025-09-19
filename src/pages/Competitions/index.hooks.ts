import { useState, useMemo } from 'react';
import { competitions } from '@/competition/data';
import { getCompetitionStatus } from '@/+shared/utils';

// Competition Status Types and Hook
export type CompetitionStatus = 'upcoming' | 'live' | 'ended';




export function useCompetitions() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [selectedCategory] = useState('All');

  // Mock 데이터 사용
  const competitionsList = competitions;



  const filteredCompetitions = useMemo(() => {
    return competitionsList.filter(comp => {
      const statusInfo = getCompetitionStatus(comp);
      const matchesTab = selectedTab === 'All' || statusInfo.status === selectedTab.toLowerCase();
      
      const matchesCategory = selectedCategory === 'All' || 
        comp.categories.some(cat => cat === selectedCategory) ||
        comp.categories.includes('All Categories');
      
      return matchesTab && matchesCategory;
    });
  }, [competitionsList, selectedTab, selectedCategory]);

  // 카테고리별 카운트를 위한 데이터 (상태가 미리 계산됨)
  const competitionsWithStatus = useMemo(() => {
    return competitionsList.map(comp => ({
      ...comp,
      status: getCompetitionStatus(comp).status
    }));
  }, [competitionsList]);

  const statusCategories = Array.from(
    new Set(competitionsWithStatus.map(c => c.status))
  );

  const handleCompetitionSelect = (competitionId: string) => {
    setSelectedCompetition(selectedCompetition === competitionId ? null : competitionId);
  };

  return {
    selectedTab,
    setSelectedTab,
    selectedCompetition,
    selectedCategory,
    filteredCompetitions,
    statusCategories,
    handleCompetitionSelect,
    competitionsWithStatus, // CategoryFilter에서 사용 (미리 계산된 상태 포함)
  };
}
