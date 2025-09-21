import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MaxWidthContainer, CategoryFilter } from '@/+shared/components';
import { toast } from 'sonner';
import { 
  ProfileHeader, 
  Overview, 
  PersonalInfo, 
  AccountSettings, 
  Achievements, 
  RecentActivity 
} from '@/profile/layout';

// Props interface removed - using React Router now

interface UserProfile {
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
    type: 'solve' | 'join' | 'rank_up' | 'first_blood';
    description: string;
    timestamp: string;
    points?: number;
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
      type: 'first_blood',
      description: 'Achieved first blood in "SQL Injection Master"',
      timestamp: '2 hours ago',
      points: 450
    },
    {
      id: 'act-002',
      type: 'rank_up',
      description: 'Moved up to rank #12 in Winter CTF 2024',
      timestamp: '3 hours ago'
    },
    {
      id: 'act-003',
      type: 'solve',
      description: 'Solved "Buffer Overflow Basics"',
      timestamp: '1 day ago',
      points: 200
    },
    {
      id: 'act-004',
      type: 'join',
      description: 'Joined Advanced Pwning Tournament',
      timestamp: '2 days ago'
    }
  ],
  currentTeam: {
    id: 'team-001',
    name: 'CyberNinjas',
    role: 'leader',
    members: 4
  }
};

export function ProfilePage() {
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
    { id: 'achievements', name: 'Achievements' },
    { id: 'activity', name: 'Activity' },
    { id: 'edit', name: 'Edit Profile' },
    { id: 'invitations', name: 'Team Invitations' },
  ];

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return <Overview profile={profile} onNavigate={navigate} />;
      case 'Edit Profile':
        return (
          <div className="grid md:grid-cols-2 gap-6">
            <PersonalInfo 
              profile={isEditing ? editedProfile : profile} 
              isEditing={isEditing}
              onProfileChange={handleProfileChange}
            />
            <AccountSettings onNavigate={navigate} />
          </div>
        );
      case 'Achievements':
        return <Achievements achievements={profile.achievements} />;
      case 'Activity':
        return <RecentActivity activities={profile.recentActivity} />;
      default:
        return <Overview profile={profile} onNavigate={navigate} />;
    }
  };

  return (
    <>
      <ProfileHeader
        title={profile.nickname}
        coloredTitle={profile.nickname}
        description={profile.bio}
      />

      <MaxWidthContainer innerProps={{ className: 'gap-16 mt-14' }}>
        {/* CategoryFilter for tabs */}
        <CategoryFilter
          categories={profileTabs.map((tab) => tab.name)}
          data={profileTabs}
          selected={selectedTab}
          onSelect={setSelectedTab}
          getItemCategory={(tab) => tab.name}
          isAll={false}
          isCountExist={false}
        />

        {/* Content based on selected tab */}
        <>
          {renderContent()}
        </>

        {/* Edit mode buttons */}
        {selectedTab === 'Edit Profile' && (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              disabled={isLoading}
            >
              {isEditing ? (isLoading ? 'Saving...' : 'Save Changes') : 'Edit Profile'}
            </Button>
          </div>
        )}
      </MaxWidthContainer>
    </>
  );
}