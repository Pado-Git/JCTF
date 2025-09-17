import { AnimatedBackgroundHeader, Divider } from '@/+shared/components';
import { TeamEntry } from '@/leaderboard/utils';
import { useHeaderSection } from './index.hooks';

export interface HeaderSectionProps {
  leaderboardData: TeamEntry[];
}

export function HeaderSection({ leaderboardData }: HeaderSectionProps) {
  const { myTeam } = useHeaderSection({ leaderboardData });

  return (
    <AnimatedBackgroundHeader 
      title="현재 참여중인 CTF 이름" 
      coloredTitle="Live Overview" 
      description="Live rankings updated every 30 seconds."
    >
      <>
        <span className='typo-heading-xsmall text-primary-200'>Your Team</span>
        <div className='flex items-center justify-between'>
          <div className='flex gap-4 items-center'>
            <span className='bg-primary rounded-radius-sm typo-heading-medium text-primary-100 w-10 h-10 flex items-center justify-center'>
              {myTeam?.rank || '?'}
            </span>
            <div>
              <div className='flex gap-2 items-center'>
                <span className='typo-heading-medium text-primary-100'>{myTeam?.name || 'No Team'}</span>
              </div>
              <span className='typo-body-xsmall text-neutral-200'>last updated : {myTeam?.lastSolvedAt || 'Unknown'}</span>
            </div>
          </div>
          <div className='flex flex-col gap-1 items-end'>
            <span className='typo-heading-medium text-primary'>{myTeam?.score.toLocaleString() || '0'} pts</span>
            <span className='typo-body-small-bold text-primary-200'>{myTeam?.solvedCount || '0'} challenges</span>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='typo-body-xsmall-bold text-primary'>Team Members</span>
          <div className='flex flex-col gap-2'>
            {myTeam?.members.map((member, index) => (
              <div key={member.name}>
                <div className='flex gap-2 items-center justify-between'>
                  <span className='typo-body-small text-primary-100'>{member.name}</span>
                  <span className='typo-body-medium-bold text-primary'>{member.score.toLocaleString()}</span>
                </div>
                {index < myTeam.members.length - 1 && (
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
