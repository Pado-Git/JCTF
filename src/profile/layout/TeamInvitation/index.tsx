import { IcoMailLined } from '@/+shared/assets';
import { TitleWIcon } from '@/+shared/components';
import { InvitationCard } from '@/profile/components';

interface TeamInvitation {
  id: string;
  teamName: string;
  description: string;
  inviterName: string;
  members: number;
  createdAt: string;
}

interface TeamInvitationProps {
  invitations?: TeamInvitation[];
  onAccept?: (invitationId: string) => void;
  onDecline?: (invitationId: string) => void;
}

const mockInvitations: TeamInvitation[] = [
  {
    id: 'inv-001',
    teamName: 'HackMasters',
    description: 'Professional team specializing in reverse engineering',
    inviterName: 'TeamLeader',
    members: 5,
    createdAt: '2024-01-10'
  },
  {
    id: 'inv-002',
    teamName: 'Digital Defenders',
    description: 'Focused on forensics and incident response',
    inviterName: 'ForensicsExpert',
    members: 3,
    createdAt: '2024-01-08'
  }
];

export function TeamInvitation({ 
  invitations = mockInvitations, 
  onAccept, 
  onDecline 
}: TeamInvitationProps) {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <TitleWIcon
        title="Team Invitations"
        icon={<IcoMailLined className="w-6 h-6" />}
        description="View and respond to your team invitations"
      />
      {/* Invitations List */}
      {invitations.length === 0 ? (
        <div className="flex flex-col gap-2 text-center py-12">
          <IcoMailLined className="w-16 h-16 text-primary-200 mx-auto" />
          <h3 className="typo-heading-medium text-neutral-300">No Invitations</h3>
          <p className="typo-body-small text-neutral-400">You don't have any pending team invitations.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {invitations.map((invitation) => (
            <InvitationCard
              key={invitation.id}
              invitation={invitation}
              onAccept={onAccept}
              onDecline={onDecline}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamInvitation;