import { ChallengeBg1, ChallengeBg2, ChallengeBg3, ChallengeBg4 } from "@/dashboard/assets";

export interface Competition {
  id: string;
  name: string;
  backgroundImg: string;
  description: string;
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  difficulty: 'beginner' | 'advanced' | 'expert';
  categories: string[];
  prize: string;
  registered: boolean;
  format: string;
  minMembers: number;
  maxMembers: number;
}

export interface User {
  email: string;
  nickname?: string;
}

export const competitions: Competition[] = [
  {
    id: 'comp-001',
    name: "SURF-LAB Autumn CTF 2025: 진행 중",
    backgroundImg: ChallengeBg1,
    description: "Annual autumn competition featuring advanced cyber security challenges",
    startDate: "2025-09-01T09:00:00Z",
    endDate: "2025-10-30T18:00:00Z",
    participants: 2847,
    maxParticipants: 5000,
    difficulty: "advanced",
    categories: ["Web", "Crypto", "Reverse", "Pwn", "Forensics"],
    prize: "$50,000",
    registered: true,
    format: "Jeopardy Style CTF",
    minMembers: 1,
    maxMembers: 4
  },
  {
    id: 'comp-002',
    name: "Beginner's Challenge: 예정",
    backgroundImg: ChallengeBg2,
    description: "Perfect entry point for newcomers to cybersecurity",
    startDate: "2025-09-20T10:00:00Z",
    endDate: "2025-09-25T20:00:00Z",
    participants: 1203,
    maxParticipants: 2000,
    difficulty: "beginner",
    categories: ["Web", "OSINT", "Crypto"],
    prize: "$5,000",
    registered: false,
    format: "Attack & Defense",
    minMembers: 1,
    maxMembers: 4
  },
  {
    id: 'comp-003',
    name: "Corporate Security Challenge: 예정",
    backgroundImg: ChallengeBg3,
    description: "Real-world corporate security scenarios and incident response",
    startDate: "2025-10-01T08:00:00Z",
    endDate: "2025-10-07T22:00:00Z",
    participants: 456,
    maxParticipants: 1000,
    difficulty: "expert",
    categories: ["Network", "Forensics", "Incident Response"],
    prize: "$25,000",
    registered: true,
    format: "Red Team vs Blue Team",
    minMembers: 1,
    maxMembers: 4
  },
  {
    id: 'comp-004',
    name: "Summer Hacking Marathon: 종료",
    backgroundImg: ChallengeBg4,
    description: "3-day intensive hacking competition with live challenges",
    startDate: "2025-08-15T00:00:00Z",
    endDate: "2025-08-18T23:59:59Z",
    participants: 3241,
    maxParticipants: 4000,
    difficulty: "advanced",
    categories: ["All Categories"],
    prize: "$75,000",
    registered: true,
    format: "King of the Hill",
    minMembers: 1,
    maxMembers: 4
  }
];

export const mockUser: User = {
  email: 'user@example.com',
  nickname: 'CyberHacker'
};
