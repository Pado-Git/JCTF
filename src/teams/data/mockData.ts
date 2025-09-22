export interface Team {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  inviteCode?: string;
  createdDate: string;
  leader: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  members: Array<{
    id: string;
    nickname: string;
    email: string;
    role: 'leader' | 'member';
    joinDate: string;
    avatar?: string;
    stats: {
      totalPoints: number;
      totalSolved: number;
    };
  }>;
  stats: {
    totalCompetitions: number;
    totalPoints: number;
    bestRank: number;
    averageRank: number;
  };
  recentCompetitions: Array<{
    id: string;
    name: string;
    rank: number;
    totalTeams: number;
    points: number;
    date: string;
  }>;
}

export interface PublicTeam {
  id: string;
  name: string;
  description: string;
  members: number;
  isRecruiting: boolean;
  tags: string[];
  stats: {
    totalPoints: number;
    averageRank: number;
  };
}

export const mockTeams: Team[] = [
  {
    id: 'team-001',
    name: 'CyberNinjas',
    description: 'Elite team focused on web exploitation and cryptography challenges. We participate in major international CTFs.',
    isPublic: true,
    inviteCode: 'NINJA2024',
    createdDate: '2023-09-15',
    leader: {
      id: 'user-001',
      nickname: 'CyberNinja',
      avatar: undefined
    },
    members: [
      {
        id: 'user-001',
        nickname: 'CyberNinja',
        email: 'user@example.com',
        role: 'leader',
        joinDate: '2023-09-15',
        stats: { totalPoints: 18650, totalSolved: 127 }
      },
      {
        id: 'user-002',
        nickname: 'WebMaster',
        email: 'web@example.com',
        role: 'member',
        joinDate: '2023-10-01',
        stats: { totalPoints: 14200, totalSolved: 98 }
      },
      {
        id: 'user-003',
        nickname: 'CryptoKing',
        email: 'crypto@example.com',
        role: 'member',
        joinDate: '2023-10-15',
        stats: { totalPoints: 16800, totalSolved: 112 }
      },
      {
        id: 'user-004',
        nickname: 'PwnMaster',
        email: 'pwn@example.com',
        role: 'member',
        joinDate: '2023-11-01',
        stats: { totalPoints: 15900, totalSolved: 89 }
      }
    ],
    stats: {
      totalCompetitions: 12,
      totalPoints: 65550,
      bestRank: 2,
      averageRank: 8.5
    },
    recentCompetitions: [
      {
        id: 'comp-001',
        name: 'Winter CTF 2024',
        rank: 12,
        totalTeams: 87,
        points: 4250,
        date: '2024-01-15'
      },
      {
        id: 'comp-002',
        name: 'Global Cyber Challenge',
        rank: 3,
        totalTeams: 156,
        points: 8900,
        date: '2023-12-20'
      },
      {
        id: 'comp-003',
        name: 'University CTF',
        rank: 1,
        totalTeams: 45,
        points: 9500,
        date: '2023-11-25'
      }
    ]
  }
];

export const mockPublicTeams: PublicTeam[] = [
  {
    id: 'team-004',
    name: 'Binary Breakers',
    description: 'Specializing in binary exploitation and reverse engineering',
    members: 3,
    isRecruiting: true,
    tags: ['pwn', 'reverse', 'binary'],
    stats: { totalPoints: 45600, averageRank: 15.2 }
  },
  {
    id: 'team-005',
    name: 'Web Warriors',
    description: 'Web application security experts',
    members: 4,
    isRecruiting: true,
    tags: ['web', 'xss', 'sqli'],
    stats: { totalPoints: 38900, averageRank: 22.1 }
  },
  {
    id: 'team-006',
    name: 'Crypto Crusaders',
    description: 'Mathematical cryptography challenges',
    members: 2,
    isRecruiting: true,
    tags: ['crypto', 'math', 'rsa'],
    stats: { totalPoints: 52100, averageRank: 8.7 }
  }
];
