import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Challenge, 
  mockCompetition, 
  mockChallenges,
} from '@/challenge/data';
import {
  calculateScore,
  getSolvedCount,
  getProgressPercentage
} from '@/challenge/utils';

export function useChallenges() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [_user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  const filteredChallenges = useMemo(() => {
    return mockChallenges.filter(challenge => {
      const matchesCategory = selectedCategory === 'All' || challenge.category.name === selectedCategory;
      const matchesSearch = challenge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const solvedCount = getSolvedCount(mockChallenges);
  const totalPoints = calculateScore(mockChallenges);
  const progressPercentage = getProgressPercentage(solvedCount, mockChallenges.length);

  const categories = useMemo(() => {
    return mockChallenges.map(challenge => challenge.category.name)
      .filter((category, index, self) => self.indexOf(category) === index);
  }, []);

  const handleLeaderboardClick = () => {
    navigate('leaderboard');
  };

  const handleChallengeClick = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleCloseModal = () => {
    setSelectedChallenge(null);
  };

  return {
    // State
    selectedCategory,
    setSelectedCategory,
    selectedChallenge,
    searchQuery,
    setSearchQuery,
    user: _user,
    
    // Data
    competition: mockCompetition,
    filteredChallenges,
    categories,
    
    // Stats
    solvedCount,
    totalPoints,
    progressPercentage,
    
    // Handlers
    handleLeaderboardClick,
    handleChallengeClick,
    handleCloseModal,
  };
}
