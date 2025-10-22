import { TitleWIcon } from '@/+shared/components';
import { useTeamMember } from './index.hooks';
import { TeamMemberBox } from '@/teams/components';

interface TeamMemberProps {
  team: any;
}

export function TeamMember({ team }: TeamMemberProps) {
  const { getMemberStats, getMemberInitials } = useTeamMember();

  return (
    <>
      <TitleWIcon title="Team Members" description="Current team roster and member statistics" />
      
      <div className="flex flex-col gap-4">
        {team.members.map((member: any) => (
          <TeamMemberBox
            key={member.id}
            member={member}
            getMemberInitials={getMemberInitials}
            getMemberStats={getMemberStats}
          />
        ))}
      </div>
    </>
  );
}

export default TeamMember;
