import { useState } from 'react';
import { mockFirstBloods, generateFirstBloodCategories } from '@/leaderboard/utils';

export const useFirstBloodSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // First Blood 카테고리 데이터 생성
  const firstBloodCategories = generateFirstBloodCategories(mockFirstBloods);

  // 선택된 카테고리에 따라 필터링된 First Blood 목록
  const filteredFirstBloods = mockFirstBloods.filter(
    firstBlood => selectedCategory === 'All' || firstBlood.category === selectedCategory
  );

  return {
    selectedCategory,
    setSelectedCategory,
    firstBloodCategories,
    filteredFirstBloods
  };
};
