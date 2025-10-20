import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  calculateScore,
  getSolvedCount,
  getProgressPercentage
} from '@/challenge/utils';
import { fetcher } from '@/+shared/libs';
import { useAuthStore, useUserStore } from '@/+shared/stores';
import { LINKS } from '@/+shared/constants';

export function useChallenges() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [challengesList, setChallengesList] = useState<any[]>([]);
  const competitionId = useAuthStore(state => state.competitionId);
  const [competitionName, setCompetitionName] = useState('');
  const [myTeam, setMyTeam] = useState<any[]>([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      if (!competitionId) {
        setChallengesList([]);
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetcher<any>({
          url: `/participant/competitions/${competitionId}/challenges`,
          method: 'get',
          query: {
            competitionId: competitionId
          }
        });

        if (response.resultCode === 200 && response.result?.success) {
          setChallengesList(response.result.data || []);
        } else {
          setError('Failed to fetch challenges');
        }
      } catch (err) {
        setError('Failed to fetch challenges');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [competitionId]);

  useEffect(() => {
    const fetchMyTeam = async () => {
      if (!competitionId) {
        setMyTeam([]);
        return;
      }
      
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

        if (response.resultCode === 200 && response.result?.success) {
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
  }, [competitionId]);

  const filteredChallenges = useMemo(() => {
    return challengesList
      .filter(challenge => {
        // 대소문자 구분 없이 카테고리 비교
        const matchesCategory = selectedCategory === 'All' || 
          challenge.category.name.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch = challenge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             challenge.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => a.name.localeCompare(b.name)); // ABC 순서로 정렬
  }, [challengesList, selectedCategory, searchQuery]);

  const solvedCount = getSolvedCount(filteredChallenges);
  const totalPoints = calculateScore(filteredChallenges);
  const progressPercentage = getProgressPercentage(solvedCount, filteredChallenges.length);

  const categories = useMemo(() => {
    const uniqueCategories = challengesList.map(challenge => challenge.category.name)
      .filter((category, index, self) => self.indexOf(category) === index);
    return [...uniqueCategories];
  }, [challengesList]);

  const handleLeaderboardClick = () => {
    // navigate(LINKS.leaderboard.replace(':competitionId', competitionId || ''));
    navigate(LINKS.leaderboard);
  };

  const handleChallengeClick = (challenge: any) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseModal = () => {
    setSelectedChallenge(null);
  };

  const user = useUserStore((state) => state.user);

  return {
    // State
    selectedCategory,
    setSelectedCategory,
    selectedChallenge,
    searchQuery,
    setSearchQuery,
    user,
    
    // Data
    competitionName,
    myTeam,
    filteredChallenges,
    categories,
    
    // Stats
    solvedCount,
    totalPoints,
    progressPercentage,
    
    // API 상태
    isLoading,
    error,
    challengesList,
    
    // Handlers
    handleLeaderboardClick,
    handleChallengeClick,
    handleCloseModal,
  };
}
