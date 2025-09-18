import { mockFirstBloods } from '@/leaderboard/utils';
import { useState } from 'react';

export const useFirstBloodSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const firstBloodCategories = mockFirstBloods.map(fb => fb.category).filter((category, index, self) => self.indexOf(category) === index);

  const filteredData = selectedCategory === "All"
  ? mockFirstBloods
  : mockFirstBloods.filter(
      (fb) => fb.category === selectedCategory
    );

  return {
    firstBloodCategories,
    selectedCategory,
    setSelectedCategory,
    filteredData
  };
};
