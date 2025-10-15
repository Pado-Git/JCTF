import { AnimatedBackgroundHeader, Divider } from '@/+shared/components';
import { useHeaderSection } from './index.hooks';
import { formatLastSolvedTime } from '@/leaderboard/utils';

export interface HeaderSectionProps {}

export function HeaderSection({}: HeaderSectionProps) {
  const { myTeam, myRank } = useHeaderSection();

  return (
    <AnimatedBackgroundHeader 
      title={myTeam?.competition.name || ''}
      coloredTitle="Live Overview" 
      description="Live rankings updated every 30 seconds."
    >
      <>
        <span className='typo-heading-xsmall text-primary-200'>Your Team</span>
        <div className='flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <span className='bg-primary rounded-radius-sm typo-heading-medium text-primary-100 w-10 h-10 flex items-center justify-center'>
              {myRank?.rank || '?'}
            </span>
            <div>
              <div className='flex gap-2 items-center'>
                <span className='typo-heading-medium text-primary-100'>{myTeam?.name || 'No Team'}</span>
              </div>
              <span className='typo-body-xsmall text-neutral-200'>last updated : {formatLastSolvedTime(myTeam?.group.updatedAt) || 'Unknown'}</span>
            </div>
          </div>
          <div className='flex flex-col gap-1 items-end'>
            <span className='typo-heading-medium text-primary'>{myTeam?.totalScore?.toLocaleString() || '0'} pts</span>
            <span className='typo-body-small-bold text-primary-200'>{myRank?.solvedChallenges || '-'} challenges</span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='typo-body-xsmall-bold text-primary'>Team Members</span>
          <div className='flex flex-col gap-2'>
            {myTeam?.members.map((member: { nickname: string; individualScore: number }, index: number) => (
              <div key={index}>
                <div className='flex gap-2 items-center justify-between'>
                  <span className='typo-body-small text-primary-100'>{member.participant.user.nickname}</span>
                  <span className='typo-body-medium-bold text-primary'>{member.individualScore.toLocaleString()}</span>
                </div>
                {index < myTeam?.members.length - 1 && (
                  <Divider className='border-primary-800 mt-2' />
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    </AnimatedBackgroundHeader>
  );
}
