import { useState } from 'react';
import { mockTeams, type Team } from '@/teams/data';

export function useTeamsPage() {
  const [myTeam] = useState<Team | null>(mockTeams[0]);
  const [activeTab, setActiveTab] = useState('Members');

  // 탭 카테고리 정의
  const tabCategories = ['Members', 'Competitions'];

  // 탭 변경 핸들러
  const changeActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return {
    myTeam,
    activeTab,
    tabCategories,
    changeActiveTab,
  };
}
