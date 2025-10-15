import { MaxWidthContainer, CategoryFilter } from '@/+shared/components';
import { toast } from 'sonner';
import { 
  ProfileHeader, 
  Overview, 
  EditProfile, 
  AccountSettings, 
  Achievements, 
  RecentActivity,
  TeamInvitation
} from '@/profile/layout';
import { useProfilePage } from './index.hooks';

export function ProfilePage() {
  const {
    isEditing,
    profile,
    editedProfile,
    selectedTab,
    profileTabs,
    myTeam,
    user,
    setSelectedTab,
    handleSave,
    navigate
  } = useProfilePage();

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return <Overview myTeam={myTeam} onNavigate={navigate} />;
      case 'Edit Profile':
        return (
          <div className="flex flex-col gap-20">
            <EditProfile 
              profile={isEditing ? editedProfile : profile} 
              onSave={handleSave}
            />
            <AccountSettings />
          </div>
        );
      case 'Achievements':
        return <Achievements achievements={profile.achievements} />;
      case 'Activity':
        return <RecentActivity activities={profile.recentActivity} />;
      case 'Team Invitations':
        return (
          <TeamInvitation 
            onAccept={(invitationId) => {
              console.log('Accept invitation:', invitationId);
              toast.success('Team invitation accepted!');
            }}
            onDecline={(invitationId) => {
              console.log('Decline invitation:', invitationId);
              toast.success('Team invitation declined.');
            }}
          />
        );
      default:
        return <Overview profile={profile} onNavigate={navigate} />;
    }
  };

  return (
    <>
      <ProfileHeader
        title={myTeam?.name}
        coloredTitle={user?.data?.nickname}
        description={myTeam?.description}
      />

      <MaxWidthContainer innerProps={{ className: 'flex flex-col gap-16 mt-14' }}>
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
      </MaxWidthContainer>
    </>
  );
}