import { IcoCodeLined, IcoCryptoLined, IcoGlobalLined, IcoSearchLined, IcoShield } from '@/+shared/assets';
import { Puzzle } from 'lucide-react';

// 카테고리별 아이콘 매핑
export const getCategoryIcon = (categoryName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'Web': IcoGlobalLined,
    'Crypto': IcoCryptoLined,
    'Pwn': IcoShield,
    'Reversing': IcoCodeLined,
    'Forensics': IcoSearchLined,
    'Misc': Puzzle,
    // 기본값 (알 수 없는 카테고리)
    'default': Puzzle
  };
  
  return iconMap[categoryName] || iconMap['default'];
};

// 지원되는 카테고리 목록
export const supportedCategories = [
  'Web',
  'Crypto', 
  'Pwn',
  'Reverse',
  'Forensics',
  'Misc'
] as const;
