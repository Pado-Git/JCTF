import { Badge } from '@/+shared/components';

type TeamMember = any;

interface TeamMemberBoxProps {
  member: TeamMember;
  getMemberInitials: (nickname: string) => string;
  getMemberStats: (member: TeamMember) => { totalPoints: number; totalSolved: number };
}

export function TeamMemberBox({ member, getMemberInitials, getMemberStats }: TeamMemberBoxProps) {

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-radius-md p-8 flex items-center justify-between">
      {/* Member Info */}
      <div className="flex items-center gap-4">
        {/* Member Avatar */}
        <div className="w-10 h-10 rounded-full gradient-2 flex items-center justify-center">
          <span className="typo-heading-xxsmall text-primary-50">
            {getMemberInitials(member.participant.user.nickname)}
          </span>
        </div>
        
        {/* Member Details */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <h4 className="typo-heading-xsmall">{member.participant.user.nickname}</h4>
            {member.role === 'LEADER' && (
              <div className="px-2 py-1 gradient-2 rounded-radius-xs typo-body-xsmall-bold">
                Team Leader
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 typo-body-xsmall text-primary-300">
            <span>{member.participant.user.email}</span>
            <div className="w-1 h-1 bg-primary-300 rounded-full"></div>
            <span>
              Joined {new Date(member.joinedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Member Stats */}
      <div className="flex items-center gap-4">
        {/* Points */}
        <Badge variant="easy">
          +{member.individualScore} pts
        </Badge>
        
        <Badge variant="greyTag">
          {member.solveCount} solved
        </Badge>
      </div>
    </div>
  );
}

export default TeamMemberBox;