import { Card } from '@/+shared/components/data-display/card';
import { Badge, BadgeVariant } from '@/+shared/components/feedback/badge';
import { Button } from '@/+shared/components/form/button';
import { Challenge } from '@/challenge/data';
import { getCategoryIcon } from '@/challenge/utils';
import { IcoCheckboxCircleLined, IcoUnlockFilled } from '@/+shared/assets';
import { IcoArrowRightSLined, IcoCrownLined, IcoTeamLined } from '@/+shared/assets/icons';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
  isLocked?: boolean;
  lockProgress?: string; // e.g., "2/3"
}

export function ChallengeCard({ challenge, onClick, isLocked = false, lockProgress }: ChallengeCardProps) {
  const getCardStatus = () => {
    if (challenge.solved) return 'solved';
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
        return 'gradient-2 border-primary-900';
      default:
        return 'bg-neutral-800 border-neutral-700';
    }
  };

  const getButtonContent = () => {
    switch (status) {
      case 'solved':
        return (
          <Button
            variant="secondary"
            size="small"
            className='w-full'
          >
            <IcoCheckboxCircleLined />
            Solved!
          </Button>
        );
      case 'locked':
        return (
          <Button
            variant="primary"
            size="small"
            className="w-full"
            disabled
          >
            <IcoUnlockFilled />
            Lock {lockProgress && `(${lockProgress})`}
          </Button>
        );
      case 'unlocked':
        return (
          <Button
            variant="primary"
            size="small"
            className='w-full'
            onClick={onClick}
          >
            <IcoUnlockFilled />
            Solve Challenge
            <IcoArrowRightSLined />
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      className={`flex flex-col justify-between p-8 rounded-radius-lg transition-all duration-300 ${getCardStyles()} ${
        status === 'locked' ? 'locked-card' : ''
      }`}
      style={{ width: 'calc(33.333% - 16px)' }}
    >
      {/* Category Icon and Points */}
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-radius-sm flex items-center justify-center bg-primary locked:bg-neutral-700">
          {(() => {
            const IconComponent = getCategoryIcon(challenge.category.name);
            return <IconComponent className="size-6 text-neutral-0 locked:text-neutral-600" />;
          })()}
        </div>
        <div className="typo-body-large-bold text-primary locked:text-neutral-600">
          +{challenge.scoreType === 'DYNAMIC' ? challenge.currentScore : challenge.score}
          <span className="typo-body-small text-primary-400 locked:text-neutral-600"> pts</span>
        </div>
      </div>

      {/* Title and Category */}
      <div className="space-y-1">
        <h3 className="typo-heading-small text-neutral-0 locked:text-neutral-600">
          {challenge.name}
        </h3>
        <p className="typo-body-small text-primary-200 locked:text-neutral-600">
          {challenge.category.name}
        </p>
      </div>

      {/* Difficulty Badge */}
      <div className="flex justify-start">
        <Badge variant={status === 'locked' ? 'disabled' : (challenge.difficulty.toLowerCase() as BadgeVariant)}>
          {challenge.difficulty}
        </Badge>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {challenge.tags.slice(0, 3).map((tag) => (
          <Badge 
            key={tag} 
            variant={status === 'locked' ? 'disabled' : 'tag'}
            className="px-2 py-1 h-6 rounded text-xs bg-neutral-700 text-neutral-300"
          >
            {tag}
          </Badge>
        ))}
        {challenge.tags.length > 3 && (
          <Badge 
            variant={status === 'locked' ? 'disabled' : 'primary'} 
            className="px-2 py-1 h-6 rounded text-xs bg-neutral-700 text-neutral-300"
          >
            +{challenge.tags.length - 3}
          </Badge>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-body-xsmall text-neutral-100 locked:text-neutral-600">
        <div className="flex items-center gap-1">
          <IcoTeamLined className='size-4' />
          <span>{challenge.solveCount}</span>
        </div>
        
        {challenge.firstBlood && (
          <div className="flex items-center gap-1">
            <IcoCrownLined className='size-4' />
            <span>{challenge.firstBlood.user}</span>
          </div>
        )}
      </div>

      {/* Button */}
      {getButtonContent()}
    </Card>
  );
}

export default ChallengeCard;
