import { Button, MaxWidthContainer } from '@/+shared/components';
import { IcoTrophyFilled } from '@/+shared/assets';
import { HeaderSection, ControlsSection, LeaderboardSection, FirstBloodSection } from '@/leaderboard/layout';
import { useLeaderboardPage } from './index.hooks';

export function LeaderboardPage() {
  const {
    autoRefresh,
    setAutoRefresh,
    leaderboardData,
    myTeam,
    myRank,
    loading,
    error,
    handleRefresh,
    controlsSectionRef
  } = useLeaderboardPage();

  // 로딩 상태
  if (loading && leaderboardData.length === 0) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading leaderboard...</p>
        </div>
      </MaxWidthContainer>
    );
  }

  // 리더보드 공개되지 않음
  if (error && leaderboardData.length === 0) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
            <IcoTrophyFilled className="w-8 h-8 text-neutral-500" />
          </div>
          <div className="text-center">
            <h3 className="typo-heading-small text-neutral-300 mb-2">Leaderboard Unavailable</h3>
            <p className="typo-body-medium text-neutral-500">
              The leaderboard will be displayed once the competition progresses or when it is made public by the organizers.
            </p>
          </div>
        </div>
      </MaxWidthContainer>
    );
  }

  // 데이터가 없을 때
  if (!loading && !error && leaderboardData.length === 0) {
    return (
      <MaxWidthContainer className="py-20" innerProps={{ className: "gap-8" }}>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
            <IcoTrophyFilled className="w-8 h-8 text-neutral-500" />
          </div>
          <div className="text-center">
            <h3 className="typo-heading-small text-neutral-300 mb-2">No Leaderboard Data</h3>
            <p className="typo-body-medium text-neutral-500">
              There are no teams on the leaderboard yet.
            </p>
          </div>
        </div>
      </MaxWidthContainer>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section - Your Team 정보 */}
      <HeaderSection myTeam={myTeam} myRank={myRank} />

      {/* Controls Section - Auto-refresh, Last updated */}
      <ControlsSection 
        ref={controlsSectionRef}
        autoRefresh={autoRefresh}
        setAutoRefresh={setAutoRefresh}
        onRefresh={handleRefresh}
        loading={loading}
      />

      {/* Leaderboard Section - Top 3 + Other Teams */}
      <LeaderboardSection myGroupName={myTeam?.group?.name} leaderboardData={leaderboardData} />

      {/* First Blood Section */}
      {/* <FirstBloodSection /> */}
    </div>
  );
}

export default LeaderboardPage;