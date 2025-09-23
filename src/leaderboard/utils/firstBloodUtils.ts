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
    timestamp: "2025-09-11T09:21:14+00:00",
    points: 750
  },
  {
    challengeName: 'Buffer Overflow Master',
    category: 'Pwn',
    teamName: 'Binary Ninjas',
    user: 'Dave',
    timestamp: "2025-09-25T09:41:14+00:00",
    points: 650
  },
  {
    challengeName: 'SQL Injection Pro',
    category: 'Web',
    teamName: 'Hack The Planet',
    user: 'Grace',
    timestamp: "2025-01-11T09:21:14+00:00",
    points: 500
  },
  {
    challengeName: 'Reverse Engineering Hell',
    category: 'Reverse',
    teamName: 'Code Breakers',
    user: 'John',
    timestamp: "2025-09-23T09:21:14+00:00",
    points: 900
  },
  {
    challengeName: 'Forensics Mystery',
    category: 'Forensics',
    teamName: 'Digital Detectives',
    user: 'Sarah',
    timestamp: "2025-06-13T09:11:14+00:00",
    points: 600
  }
];