import { useState, useMemo } from 'react';
import { useCompetitionStatus } from '@/+shared/components';
import { competitions } from '@/competition/data';

export function useCompetitions() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);
  const [selectedCategory] = useState('All');

  const filteredCompetitions = useMemo(() => {
    return competitions.filter(comp => {
      const statusInfo = useCompetitionStatus(comp);
      const matchesTab = selectedTab === 'All' || statusInfo.status === selectedTab.toLowerCase();
      
      const matchesCategory = selectedCategory === 'All' || 
        comp.categories.some(cat => cat === selectedCategory) ||
        comp.categories.includes('All Categories');
      
      return matchesTab && matchesCategory;
    });
  }, [selectedTab, selectedCategory]);

  const statusCategories = ['live', 'upcoming', 'ended'];

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
  };
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const handleRegister = (competitionId: string) => {
  // Mock registration logic
  console.log(`Registering for competition ${competitionId}`);
  // In real app, this would be an API call
};
