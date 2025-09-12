export interface Challenge {
  id: string;
  name: string;
  description: string;
  category: {
    name: string;
    color: string;
  };
  tags: string[];
  scoreType: 'FIXED' | 'DYNAMIC';
  score: number;
  baseScore?: number;
  currentScore?: number;
  solved: boolean;
  isFirstBlood: boolean;
  solveCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  files?: string[];
  server?: string;
  hint?: string;
  firstBlood?: {
    user: string;
    time: string;
  };
  recentSolvers?: string[];
}

export interface Competition {
  id: string;
  name: string;
  timeLeft: string;
  myTeam: {
    name: string;
    rank: number;
    score: number;
  };
}

export const categories = [
  { name: 'All', color: '#FFFFFF' },
  { name: 'Web', color: '#FF6B6B' },
  { name: 'Crypto', color: '#4ECDC4' },
  { name: 'Pwn', color: '#45B7D1' },
  { name: 'Reverse', color: '#96CEB4' },
  { name: 'Forensics', color: '#FFEAA7' },
  { name: 'Misc', color: '#DDA0DD' }
];

export const mockCompetition: Competition = {
  id: 'comp-001',
  name: 'Winter CTF 2024',
  timeLeft: '1d 5h 23m',
  myTeam: {
    name: 'CyberNinjas',
    rank: 12,
    score: 1250
  }
};

export const mockChallenges: Challenge[] = [
  {
    id: 'chal-001',
    name: "Baby's First SQL",
    description: "A simple SQL injection challenge for beginners. Can you find the flag in the database?\n\n```sql\nSELECT * FROM users WHERE username = '$input'\n```\n\nThe flag is hidden somewhere in the database structure.",
    category: { name: 'Web', color: '#FF6B6B' },
    tags: ['sql', 'beginner', 'injection'],
    scoreType: 'FIXED',
    score: 100,
    solved: true,
    isFirstBlood: false,
    solveCount: 45,
    difficulty: 'Easy',
    server: 'nc chall.jctf.pro 1337',
    firstBlood: {
      user: 'l33th4x0r',
      time: '2 hours ago'
    },
    recentSolvers: ['Alice', 'Bob', 'Charlie', 'David', 'Eve']
  },
  {
    id: 'chal-002',
    name: 'Crypto Madness',
    description: "A challenging RSA cryptography problem. You have the public key and ciphertext.\n\n**Files provided:**\n- `public.pem` - RSA public key\n- `encrypted.txt` - Encrypted flag\n\nHint: Sometimes the parameters aren't as secure as they seem...",
    category: { name: 'Crypto', color: '#4ECDC4' },
    tags: ['rsa', 'intermediate', 'factorization'],
    scoreType: 'DYNAMIC',
    score: 387,
    baseScore: 500,
    currentScore: 387,
    solved: false,
    isFirstBlood: false,
    solveCount: 12,
    difficulty: 'Medium',
    files: ['public.pem', 'encrypted.txt'],
    hint: 'Check if the modulus has been generated correctly',
    firstBlood: {
      user: 'CryptoMaster',
      time: '1 day ago'
    },
    recentSolvers: ['CryptoMaster', 'MathWiz', 'NumberCruncher']
  },
  {
    id: 'chal-003',
    name: 'Buffer Overflow Championship',
    description: "Advanced buffer overflow exploitation challenge.\n\n```c\n#include <stdio.h>\n#include <string.h>\n\nvoid vulnerable_function(char *input) {\n    char buffer[64];\n    strcpy(buffer, input);\n    printf(\"Input: %s\\n\", buffer);\n}\n```\n\nExploit the binary to get a shell and read the flag.",
    category: { name: 'Pwn', color: '#45B7D1' },
    tags: ['buffer-overflow', 'binary-exploitation', 'advanced'],
    scoreType: 'DYNAMIC',
    score: 750,
    baseScore: 800,
    currentScore: 750,
    solved: false,
    isFirstBlood: false,
    solveCount: 3,
    difficulty: 'Hard',
    files: ['vuln_binary', 'source.c'],
    server: 'nc pwn.jctf.pro 9999',
    hint: 'ASLR is disabled, but NX is enabled',
    firstBlood: {
      user: 'PwnMaster',
      time: '3 hours ago'
    },
    recentSolvers: ['PwnMaster', 'BinaryNinja']
  },
  {
    id: 'chal-004',
    name: 'Reverse Engineering Nightmare',
    description: "A heavily obfuscated binary that requires advanced reverse engineering skills.\n\nThe binary uses custom packing, anti-debugging, and code obfuscation techniques.\n\nYour goal is to understand the algorithm and find the correct input that produces the flag.",
    category: { name: 'Reverse', color: '#96CEB4' },
    tags: ['reverse-engineering', 'obfuscation', 'expert'],
    scoreType: 'FIXED',
    score: 900,
    solved: false,
    isFirstBlood: false,
    solveCount: 1,
    difficulty: 'Insane',
    files: ['nightmare.exe'],
    hint: 'The packer is a custom variant of UPX',
    firstBlood: {
      user: 'ReverseGod',
      time: '5 hours ago'
    },
    recentSolvers: ['ReverseGod']
  },
  {
    id: 'chal-005',
    name: 'Digital Forensics Mystery',
    description: "A disk image contains evidence of a cyber attack. Analyze the image and find all the flags.\n\nThere are multiple flags hidden throughout the filesystem, network traffic, and deleted files.\n\n**Flags to find:** 3 total",
    category: { name: 'Forensics', color: '#FFEAA7' },
    tags: ['forensics', 'disk-analysis', 'multiple-flags'],
    scoreType: 'FIXED',
    score: 600,
    solved: false,
    isFirstBlood: false,
    solveCount: 8,
    difficulty: 'Medium',
    files: ['evidence.img', 'network.pcap'],
    hint: 'Check the deleted files and network traffic for suspicious activity',
    recentSolvers: ['ForensicsExpert', 'CyberDetective', 'DataHunter']
  }
];

