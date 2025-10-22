import { showToast, useAuthStore, useUserStore } from '@/+shared';
import { fetcher } from '@/+shared/libs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export function useProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  const [editedProfile, setEditedProfile] = useState<UserProfile>({} as UserProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Overview');
  const [error, setError] = useState<string | null>(null);
  const [myTeam, setMyTeam] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);

  const competitionId = useAuthStore(state => state.competitionId);

  // 프로필 정보 가져오기
  useEffect(() => {
    const fetchData = async () => {
      if (!competitionId) {
        setMyTeam(null);
        setActivity([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // 두 API를 동시에 호출
        const [profileResponse, activityResponse] = await Promise.all([
          fetcher<any>({
            url: `/participant/teams/${competitionId}/my-team`,
            method: 'get',
            query: { competitionId: competitionId }
          }),
          fetcher<any>({
            url: '/participant/submissions/my',
            method: 'get',
            query: { competitionId: competitionId }
          })
        ]);

        // 프로필 데이터 처리
        if (profileResponse.resultCode === 200 && profileResponse.result?.data) {
          setMyTeam(profileResponse.result.data);
        } else {
          console.warn('Failed to fetch my team:', profileResponse);
        }

        // 액티비티 데이터 처리
        if (activityResponse.resultCode === 200 && activityResponse.result?.data) {
          setActivity(activityResponse.result.data);
        } else {
          console.warn('Failed to fetch activity:', activityResponse);
          setActivity([]); // 빈 배열로 초기화
        }

      } catch (err) {
        setError('Failed to fetch profile data');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [competitionId]);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProfile(editedProfile);
    setIsEditing(false);
    setIsLoading(false);
    showToast('Profile updated successfully!', 'active');
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

  const user = useUserStore(state => state.user);

  return {
    // State
    isEditing,
    profile,
    editedProfile,
    isLoading,
    selectedTab,
    profileTabs,
    myTeam,
    user,
    activity,
    error,

    // Actions
    setIsEditing,
    setSelectedTab,
    handleSave,
    handleCancel,
    handleProfileChange,
    navigate
  };
}
