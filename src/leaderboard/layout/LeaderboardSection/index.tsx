import { Button, Card, MaxWidthContainer, Divider } from '@/+shared/components';
import { IcoChart } from '@/+shared/assets/icons';
import { TeamEntry, formatLastSolvedTime, getCardHeight, getGapSize, getIconSize } from '@/leaderboard/utils';
import { useLeaderboardSection } from './index.hooks';

export interface LeaderboardSectionProps {
  leaderboardData: TeamEntry[];
}

export function LeaderboardSection({ leaderboardData }: LeaderboardSectionProps) {
  const { 
    top3Teams, 
    otherTeams, 
    hasMoreTeams, 
    showAllTeams, 
    setShowAllTeams 
  } = useLeaderboardSection({ leaderboardData });

  return (
    <section className="py-16">
      <MaxWidthContainer>
        <div className="flex items-center gap-4 mb-14">
          <IcoChart className="w-6 h-6 text-primary" />
          <h2 className="typo-heading-medium text-primary-200">Leaderboard</h2>
        </div>

        {/* Top 3 Teams */}
        <div className="grid grid-cols-3 gap-6 mb-10 items-end">
          {top3Teams.map((team) => (
            <Card 
              key={team.name} 
              className={`bg-neutral-800 border-2 border-neutral-700 gradient-3-hover rounded-radius-lg p-6 pt-16 relative flex flex-col ${getGapSize(team.rank)} items-center ${getCardHeight(team.rank)} transition-all duration-300 ease-in-out`}
            >
              {/* Rank Badge - Absolute positioned at top center */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 bg-primary rounded-radius-md flex items-center justify-center">
                  <span className="typo-heading-small">{team.rank}</span>
                </div>
              </div>

              {/* 팀 로고 */}
              <div className={`${getIconSize(team.rank)} bg-primary rounded-radius-rounded mx-auto`}>
                <img src={team.logo} alt={team.name} className="w-full h-full object-cover rounded-radius-rounded" />
              </div>

              <div className="flex flex-col gap-2 items-center flex-1">
                <h3 className="typo-heading-medium text-primary-100">{team.name}</h3>
                <div className="typo-heading-medium text-primary">{team.score.toLocaleString()} pts</div>
                <span className="bg-primary-900 text-primary-200 typo-body-small-bold rounded-radius-sm px-4 py-1">
                  {team.solvedCount} challenges
                </span>
                <p className="typo-body-xsmall text-neutral-200">Last solved: {formatLastSolvedTime(team.lastSolvedAt)}</p>
              </div>

              {/* Team Members Section - 맨 아래 고정 */}
              <div className="bg-neutral-700 rounded-radius-md py-4 px-6 w-full flex flex-col gap-4 mt-auto">
                <div className="flex items-center justify-between">
                  <h4 className="typo-body-xsmall-bold text-neutral-300">Team Members</h4>
                </div>
                <div>
                  {(() => {
                    // 3명 이하일 때는 세로 배치
                    if (team.members.length <= 3) {
                      return (
                        <div className="flex flex-col gap-2">
                          {team.members.map((member, memberIndex) => {
                            const isLastItem = memberIndex < team.members.length - 1;
                            
                            return (
                              <div key={member.name}>
                                <div className="flex justify-between items-center">
                                  <span className="typo-body-xsmall text-primary-100">{member.name}</span>
                                  <span className="typo-body-small-bold text-primary">{member.score.toLocaleString()}</span>
                                </div>
                                {isLastItem && <Divider className="border-neutral-500 my-2" />}
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                    
                    // 4명 이상일 때는 2열 그리드
                    return (
                      <div className="flex flex-col gap-2">
                        {Array.from({ length: Math.ceil(team.members.length / 2) }, (_, rowIndex) => {
                          const leftMember = team.members[rowIndex * 2];
                          const rightMember = team.members[rowIndex * 2 + 1];
                          const isLastRow = rowIndex === Math.ceil(team.members.length / 2) - 1;
                          
                          return (
                            <div key={rowIndex}>
                              <div className="grid grid-cols-2 gap-4">
                                {/* 왼쪽 멤버 */}
                                <div className="flex justify-between items-center">
                                  <span className="typo-body-xsmall text-primary-100 truncate pr-2">{leftMember.name}</span>
                                  <span className="typo-body-small-bold text-primary flex-shrink-0">{leftMember.score.toLocaleString()}</span>
                                </div>
                                
                                {/* 오른쪽 멤버 */}
                                <div className="flex justify-between items-center">
                                  {rightMember ? (
                                    <>
                                      <span className="typo-body-xsmall text-primary-100 truncate pr-2">{rightMember.name}</span>
                                      <span className="typo-body-small-bold text-primary flex-shrink-0">{rightMember.score.toLocaleString()}</span>
                                    </>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              </div>
                              
                              {/* 행 사이 구분선 */}
                              {!isLastRow && <Divider className="border-neutral-500 my-2" />}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Other Teams */}
        <div className="flex flex-col gap-4 mb-10">
          {otherTeams.map((team) => (
            <Card key={team.name} className="bg-neutral-800 border-2 border-neutral-700 gradient-3-hover rounded-3xl p-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary-900 rounded-radius-sm flex items-center justify-center">
                    <span className="typo-heading-small text-primary-100">{team.rank}</span>
                  </div>
                  <div>
                    <h3 className="typo-heading-small">{team.name}</h3>
                    <div className="flex items-center gap-2 typo-body-xsmall text-primary-300">
                      <span>{team.solvedCount} challenges</span>
                      <div className="w-1 h-1 bg-primary-500 rounded-full"></div>
                      <span>Last solved: {formatLastSolvedTime(team.lastSolvedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="typo-body-large-bold text-primary">{team.score.toLocaleString()} pts</div>
              </div>
            </Card>
          ))}
        </div>

        {hasMoreTeams && (
          <div className="text-center">
            <Button 
              variant="primary" 
              size="small"
              onClick={() => setShowAllTeams(!showAllTeams)}
            >
              {showAllTeams ? 'Show Less' : `View More (${leaderboardData.length - 10} more teams)`}
            </Button>
          </div>
        )}
      </MaxWidthContainer>
    </section>
  );
}
