import { Challenge } from '@/challenge/data';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
  isLocked?: boolean;
  lockProgress?: string;
}

export function useChallengeCard({ challenge, onClick, isLocked = false, lockProgress }: ChallengeCardProps) {
  const getCardStatus = () => {
    if (challenge.isSolved) return 'solved';
    if (isLocked) return 'locked';
    return 'unlocked';
  };

  const status = getCardStatus();

  const getCardStyles = () => {
    switch (status) {
      case 'solved':
        return 'bg-neutral-800 border-neutral-700';
      case 'locked':
        return 'bg-neutral-800 border-neutral-700';
      case 'unlocked':
        return 'gradient-2 border-primary-900 hover:border-primary-800';
      default:
        return 'bg-neutral-800 border-neutral-700';
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'solved':
        return {
          variant: 'secondary' as const,
          size: 'small' as const,
          className: 'w-full',
          onClick,
          content: 'Solved!',
          icon: 'check'
        };
      case 'locked':
        return {
          variant: 'primary' as const,
          size: 'small' as const,
          className: 'w-full',
          disabled: true,
          content: `Lock ${lockProgress ? `(${lockProgress})` : ''}`,
          icon: 'unlock'
        };
      case 'unlocked':
        return {
          variant: 'primary' as const,
          size: 'small' as const,
          className: 'w-full',
          onClick,
          content: 'Solve Challenge',
          icon: 'unlock-arrow'
        };
      default:
        return null;
    }
  };

  return {
    status,
    getCardStyles,
    getButtonContent
  };
}
