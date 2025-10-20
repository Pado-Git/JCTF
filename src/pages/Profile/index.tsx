import { MaxWidthContainer, CategoryFilter } from '@/+shared/components';
import { IcoIndividualLined } from '@/+shared/assets';
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
    isLoading,
    selectedTab,
    profileTabs,
    myTeam,
    user,
    activity,
    error,
    setSelectedTab,
    handleSave,
    navigate
  } = useProfilePage();

  // 로딩 상태
  if (isLoading && !myTeam) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </MaxWidthContainer>
    );
  }

  // 에러 상태
  if (error && !myTeam) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
            <IcoIndividualLined className="w-8 h-8 text-neutral-500" />
          </div>
          <div className="text-center">
            <h3 className="typo-heading-small text-neutral-300 mb-2">Profile Unavailable</h3>
            <p className="typo-body-medium text-neutral-500">
              Unable to load profile information. Please try again later.
            </p>
          </div>
        </div>
      </MaxWidthContainer>
    );
  }

  // 데이터가 없을 때
  if (!isLoading && !error && !myTeam) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
            <IcoIndividualLined className="w-8 h-8 text-neutral-500" />
          </div>
          <div className="text-center">
            <h3 className="typo-heading-small text-neutral-300 mb-2">No Profile Data</h3>
            <p className="typo-body-medium text-neutral-500">
              No team information available. Please join a team to view your profile.
            </p>
          </div>
        </div>
      </MaxWidthContainer>
    );
  }

  const renderContent = () => {
    switch (selectedTab) {
      case 'Overview':
        return <Overview myTeam={myTeam} isLoading={isLoading} onNavigate={navigate} />;
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
        return <RecentActivity activities={activity} />;
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
        return <Overview myTeam={myTeam} isLoading={isLoading} onNavigate={navigate} />;
    }
  };

  return (
    <>
      <ProfileHeader
        title={myTeam?.name}
        coloredTitle={user?.data?.nickname}
        description={myTeam?.description}
      />

      <MaxWidthContainer innerProps={{ className: 'flex flex-col gap-16 my-14' }}>
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