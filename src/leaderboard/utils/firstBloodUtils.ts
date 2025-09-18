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