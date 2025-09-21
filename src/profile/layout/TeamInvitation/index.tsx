import { Card, Button, Badge } from '@/+shared/components';
import { IcoTeamFilled } from '@/+shared/assets';
import { Check, X } from 'lucide-react';

interface TeamInvitation {
  id: string;
  teamName: string;
  inviterName: string;
  role: string;
  members: number;
  maxMembers: number;
  createdAt: string;
  expiresAt: string;
}

interface TeamInvitationProps {
  invitations?: TeamInvitation[];
  onAccept?: (invitationId: string) => void;
  onDecline?: (invitationId: string) => void;
}

const mockInvitations: TeamInvitation[] = [
  {
    id: 'inv-001',
    teamName: 'Cyber Warriors',
    inviterName: 'John Doe',
    role: 'Member',
    members: 3,
    maxMembers: 5,
    createdAt: '2024-01-15',
    expiresAt: '2024-01-22'
  },
  {
    id: 'inv-002',
    teamName: 'Security Experts',
    inviterName: 'Jane Smith',
    role: 'Co-Leader',
    members: 4,
    maxMembers: 6,
    createdAt: '2024-01-14',
    expiresAt: '2024-01-21'
  }
];

export function TeamInvitation({ 
  invitations = mockInvitations, 
  onAccept, 
  onDecline 
}: TeamInvitationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (expiresAt: string) => {
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <IcoTeamFilled className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary-200">Team Invitations</h2>
      </div>

      {invitations.length === 0 ? (
        <Card className="bg-neutral-900 border border-neutral-700 rounded-3xl p-8">
          <div className="text-center py-12">
            <IcoTeamFilled className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-neutral-300 mb-2">No Invitations</h3>
            <p className="text-neutral-400">You don't have any pending team invitations.</p>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4">
          {invitations.map((invitation) => (
            <Card 
              key={invitation.id} 
              className={`bg-neutral-900 border rounded-3xl p-6 ${
                isExpired(invitation.expiresAt) 
                  ? 'border-red-500/30' 
                  : 'border-neutral-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-bold text-primary-200">{invitation.teamName}</h3>
                    {isExpired(invitation.expiresAt) && (
                      <Badge variant="tag" className="text-xs bg-red-900 text-red-400 border-red-700">Expired</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2 text-sm text-neutral-400">
                    <p>Invited by <span className="text-primary-300 font-semibold">{invitation.inviterName}</span></p>
                    <p>Role: <span className="text-primary-300 font-semibold">{invitation.role}</span></p>
                    <p>Members: <span className="text-primary-300 font-semibold">{invitation.members}/{invitation.maxMembers}</span></p>
                    <p>Expires: <span className="text-primary-300 font-semibold">{formatDate(invitation.expiresAt)}</span></p>
                  </div>
                </div>
                
                {!isExpired(invitation.expiresAt) && (
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="small"
                      variant="secondary"
                      onClick={() => onDecline?.(invitation.id)}
                      className="px-3 py-1"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <Button
                      size="small"
                      onClick={() => onAccept?.(invitation.id)}
                      className="px-3 py-1"
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamInvitation;