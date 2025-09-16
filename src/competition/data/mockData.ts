export interface Competition {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'upcoming' | 'ended';
  startDate: string;
  endDate: string;
  participants: number;
  maxParticipants: number;
  difficulty: 'Beginner' | 'Advanced' | 'Expert';
  categories: string[];
  prize: string;
  registered: boolean;
}

export interface User {
  email: string;
  nickname?: string;
}

export const competitions: Competition[] = [
  {
    id: 1,
    name: "SURF-LAB Autumn CTF 2025",
    description: "Annual autumn competition featuring advanced cyber security challenges",
    status: "active",
    startDate: "2025-09-01T09:00:00Z",
    endDate: "2025-09-15T18:00:00Z",
    participants: 2847,
    maxParticipants: 5000,
    difficulty: "Advanced",
    categories: ["Web", "Crypto", "Reverse", "Pwn", "Forensics"],
    prize: "$50,000",
    registered: true
  },
  {
    id: 2,
    name: "Beginner's Challenge",
    description: "Perfect entry point for newcomers to cybersecurity",
    status: "upcoming",
    startDate: "2025-09-20T10:00:00Z",
    endDate: "2025-09-25T20:00:00Z",
    participants: 1203,
    maxParticipants: 2000,
    difficulty: "Beginner",
    categories: ["Web", "OSINT", "Crypto"],
    prize: "$5,000",
    registered: false
  },
  {
    id: 3,
    name: "Corporate Security Challenge",
    description: "Real-world corporate security scenarios and incident response",
    status: "upcoming",
    startDate: "2025-10-01T08:00:00Z",
    endDate: "2025-10-07T22:00:00Z",
    participants: 456,
    maxParticipants: 1000,
    difficulty: "Expert",
    categories: ["Network", "Forensics", "Incident Response"],
    prize: "$25,000",
    registered: false
  },
  {
    id: 4,
    name: "Summer Hacking Marathon",
    description: "3-day intensive hacking competition with live challenges",
    status: "ended",
    startDate: "2025-08-15T00:00:00Z",
    endDate: "2025-08-18T23:59:59Z",
    participants: 3241,
    maxParticipants: 4000,
    difficulty: "Advanced",
    categories: ["All Categories"],
    prize: "$75,000",
    registered: true
  }
];

export const mockUser: User = {
  email: 'user@example.com',
  nickname: 'CyberHacker'
};
