import { IcoCodeLined, IcoCryptoLined, IcoGlobalLined, IcoSearchLined, IcoShield } from '@/+shared/assets';
import { Puzzle } from 'lucide-react';

// 아이콘 배열 (순서대로 배치)
const categoryIcons = [
  IcoGlobalLined,
  IcoCryptoLined,
  IcoShield,
  IcoCodeLined,
  IcoSearchLined,
  Puzzle,
];

// 카테고리 이름을 인덱스로 변환하는 함수
const getCategoryIndex = (categoryName: string, allCategories: string[]): number => {
  const index = allCategories.indexOf(categoryName);
  return index >= 0 ? index : 0; // 찾지 못하면 0번 인덱스 사용
};

// 인덱스 기반 아이콘 매핑
export const getCategoryIcon = (categoryName: string, allCategories: string[] = []) => {
  const index = getCategoryIndex(categoryName, allCategories);
  return categoryIcons[index % categoryIcons.length]; // 순환 처리
};

// 지원되는 카테고리 목록 (참고용)
export const supportedCategories = [
  'Web',
  'Crypto', 
  'Pwn',
  'Reverse',
  'Forensics',
  'Misc'
] as const;
