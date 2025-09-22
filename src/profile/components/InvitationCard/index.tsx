import { Card, Button } from '@/+shared/components';
import { IcoCheckFilled, IcoExitFilled, IcoMailLined } from '@/+shared/assets';

interface TeamInvitation {
  id: string;
  teamName: string;
  description: string;
  inviterName: string;
  members: number;
  createdAt: string;
}

interface InvitationCardProps {
  invitation: TeamInvitation;
  onAccept?: (invitationId: string) => void;
  onDecline?: (invitationId: string) => void;
}

export function InvitationCard({ invitation, onAccept, onDecline }: InvitationCardProps) {
  return (
    <Card 
      className="bg-neutral-800 border border-neutral-500 !rounded-radius-md p-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <IcoMailLined className="w-8 h-8" />
          <div className="flex-1 space-y-1">
            <h3 className="typo-heading-xsmall">Invitation to join {invitation.teamName}</h3>
            <p className="typo-body-small text-primary-300">{invitation.description}</p>
            <div className="flex items-center gap-2 text-xs text-primary-300">
              <span>Invited by: {invitation.inviterName}</span>
              <span>•</span>
              <span>{invitation.members} members</span>
              <span>•</span>
              <span>{invitation.createdAt}</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="small"
            onClick={() => onDecline?.(invitation.id)}
            className="flex items-center gap-2"
          >
            <IcoExitFilled className="w-4 h-4" />
            Decline
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => onAccept?.(invitation.id)}
            className="flex items-center gap-2"
          >
            <IcoCheckFilled className="w-4 h-4" />
            Accept
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default InvitationCard;