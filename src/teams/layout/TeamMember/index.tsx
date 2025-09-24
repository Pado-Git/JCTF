import { TitleWIcon } from '@/+shared/components';
import { useTeamMember } from './index.hooks';
import { type Team } from '@/teams/data';
import { TeamMemberBox } from '@/teams/components';

interface TeamMemberProps {
  team: Team;
}

export function TeamMember({ team }: TeamMemberProps) {
  const { getMemberStats, getMemberInitials } = useTeamMember();

  return (
    <>
      <TitleWIcon title="Team Members" description="Current team roster and member statistics" />
      
      <div className="flex flex-col gap-4">
        {team.members.map((member) => (
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
