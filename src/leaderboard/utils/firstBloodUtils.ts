// First Blood 관련 타입과 데이터

export interface FirstBloodEntry {
  challengeName: string;
  category: string;
  teamName: string;
  user: string;
  timestamp: string;
  points: number;
}

export const mockFirstBloods: FirstBloodEntry[] = [
  {
    challengeName: 'Advanced Crypto Challenge',
    category: 'Crypto',
    teamName: 'CyberWarriors',
    user: 'Alice',
    timestamp: '5 minutes ago',
    points: 750
  },
  {
    challengeName: 'Buffer Overflow Master',
    category: 'Pwn',
    teamName: 'Binary Ninjas',
    user: 'Dave',
    timestamp: '23 minutes ago',
    points: 650
  },
  {
    challengeName: 'SQL Injection Pro',
    category: 'Web',
    teamName: 'Hack The Planet',
    user: 'Grace',
    timestamp: '1 hour ago',
    points: 500
  },
  {
    challengeName: 'Reverse Engineering Hell',
    category: 'Reverse',
    teamName: 'Code Breakers',
    user: 'John',
    timestamp: '2 hours ago',
    points: 900
  },
  {
    challengeName: 'Forensics Mystery',
    category: 'Forensics',
    teamName: 'Digital Detectives',
    user: 'Sarah',
    timestamp: '3 hours ago',
    points: 600
  }
];

// First Blood 카테고리 필터 생성
export const generateFirstBloodCategories = (firstBloods: FirstBloodEntry[]) => {
  return [
    { name: 'All', count: firstBloods.length },
    { name: 'Crypto', count: firstBloods.filter(fb => fb.category === 'Crypto').length },
    { name: 'Pwn', count: firstBloods.filter(fb => fb.category === 'Pwn').length },
    { name: 'Web', count: firstBloods.filter(fb => fb.category === 'Web').length },
    { name: 'Reverse', count: firstBloods.filter(fb => fb.category === 'Reverse').length },
    { name: 'Forensics', count: firstBloods.filter(fb => fb.category === 'Forensics').length }
  ].filter(cat => cat.count > 0); // 카운트가 0인 카테고리는 제외
};
