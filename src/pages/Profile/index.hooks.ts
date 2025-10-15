import { useAuthStore, useUserStore } from '@/+shared';
import { fetcher } from '@/+shared/libs';
import { competitions } from '@/competition/data';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export interface UserProfile {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  bio: string;
  country: string;
  university?: string;
  joinDate: string;
  avatar?: string;
  stats: {
    totalCompetitions: number;
    totalSolved: number;
    totalPoints: number;
    averageRank: number;
    firstBloods: number;
    bestRank: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    earnedDate: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'solve' | 'join' | 'rank_up';
    challengeName?: string;
    competitionName: string;
    timestamp: string;
    points?: number;
    isFirstBlood?: boolean;
  }>;
  currentTeam?: {
    id: string;
    name: string;
    role: 'leader' | 'member';
    members: number;
  };
}

const mockProfile: UserProfile = {
  email: 'user@example.com',
  nickname: 'CyberNinja',
  firstName: 'Alex',
  lastName: 'Smith',
  bio: 'Passionate cybersecurity enthusiast with a focus on web exploitation and reverse engineering. Love solving complex puzzles and learning new attack vectors.',
  country: 'South Korea',
  university: 'KAIST',
  joinDate: '2023-03-15',
  stats: {
    totalCompetitions: 15,
    totalSolved: 127,
    totalPoints: 18650,
    averageRank: 8.3,
    firstBloods: 12,
    bestRank: 2
  },
  achievements: [
    {
      id: 'ach-001',
      title: 'First Blood Hunter',
      description: 'Achieved 10+ first bloods',
      icon: '🏆',
      color: 'text-first-blood',
      earnedDate: '2024-01-10'
    },
    {
      id: 'ach-002',
      title: 'Web Master',
      description: 'Solved 50+ web challenges',
      icon: '🕸️',
      color: 'text-accent',
      earnedDate: '2023-12-20'
    },
    {
      id: 'ach-003',
      title: 'Top Performer',
      description: 'Finished in top 5 in a major CTF',
      icon: '⭐',
      color: 'text-warning',
      earnedDate: '2023-11-15'
    },
    {
      id: 'ach-004',
      title: 'Team Player',
      description: 'Participated in 10+ team competitions',
      icon: '👥',
      color: 'text-primary',
      earnedDate: '2023-10-30'
    }
  ],
  recentActivity: [
    {
      id: 'act-001',
      type: 'solve',
      challengeName: 'SQL Injection Master',
      competitionName: 'Winter CTF 2024',
      timestamp: "2025-09-23T09:21:14+00:00",
      points: 450,
      isFirstBlood: true
    },
    {
      id: 'act-002',
      type: 'rank_up',
      competitionName: 'Winter CTF 2024',
      timestamp: "2025-09-23T07:32:05+00:00"
    },
    {
      id: 'act-003',
      type: 'solve',
      challengeName: 'Buffer Overflow Basics',
      competitionName: 'Winter CTF 2024',
      timestamp: "2025-09-23T09:21:14+00:00",
      points: 200
    },
    {
      id: 'act-004',
      type: 'join',
      competitionName: 'Advanced Pwning Tournament',
      timestamp: "2025-09-23T09:21:14+00:00"
    }
  ],
  currentTeam: {
    id: 'team-001',
    name: 'CyberNinjas',
    role: 'leader',
    members: 4
  }
};

export function useProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Overview');

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProfile(editedProfile);
    setIsEditing(false);
    setIsLoading(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleProfileChange = (field: string, value: string) => {
    setEditedProfile({...editedProfile, [field]: value});
  };

  // CategoryFilter를 위한 데이터 - 표시할 이름을 id로 사용
  const profileTabs = [
    { id: 'overview', name: 'Overview' },
    // { id: 'achievements', name: 'Achievements' },
    { id: 'activity', name: 'Activity' },
    // { id: 'edit', name: 'Edit Profile' },
    // { id: 'invitations', name: 'Team Invitations' },
  ];

  return {
    // State
    isEditing,
    profile,
    editedProfile,
    isLoading,
    selectedTab,
    profileTabs,

    // Actions
    setIsEditing,
    setSelectedTab,
    handleSave,
    handleCancel,
    handleProfileChange,
    navigate
  };
}
