import { useState, useMemo } from 'react';
import { competitions } from '@/competition/data';
import { getCompetitionStatus } from '@/+shared/utils';

export function useCompetitions() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedCategory] = useState('All');

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

  const competitionsWithStatus = useMemo(() => {
    return competitionsList.map(comp => ({
      ...comp,
      status: getCompetitionStatus(comp).status
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
    competitionsWithStatus, // CategoryFilter에서 사용 (미리 계산된 상태 포함)
  };
}
