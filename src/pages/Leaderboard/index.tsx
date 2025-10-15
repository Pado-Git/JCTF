import { Button } from '@/+shared/components';
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

  // 로딩 중이거나 에러가 있을 때
  if (loading && leaderboardData.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="typo-body-medium text-primary-200">리더보드 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error && leaderboardData.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="typo-body-medium text-red-400 mb-4">{error}</p>
          <Button onClick={handleRefresh} variant="primary">
            다시 시도
          </Button>
        </div>
      </div>
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
      <LeaderboardSection leaderboardData={leaderboardData} />

      {/* First Blood Section */}
      {/* <FirstBloodSection /> */}
    </div>
  );
}

export default LeaderboardPage;