import { Badge, BadgeVariant, Button, Card } from '@/+shared/components';
import { Challenge } from '@/challenge/data';
import { getCategoryIcon } from '@/challenge/utils';
import { IcoCheckboxCircleLined, IcoUnlockFilled, IcoArrowRightSLined, IcoCrownLined, IcoTeamLined } from '@/+shared/assets';
import { useChallengeCard } from './index.hooks';

interface ChallengeCardProps {
  challenge: Challenge;
  onClick: () => void;
  isLocked?: boolean;
  lockProgress?: string; // e.g., "2/3"
}

export function ChallengeCard({ challenge, onClick, isLocked = false, lockProgress }: ChallengeCardProps) {
  const { status, getCardStyles, getButtonContent } = useChallengeCard({
    challenge,
    onClick,
    isLocked,
    lockProgress
  });

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
          +{challenge.currentScore}
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
        {challenge.difficulty && (
          <Badge variant={status === 'locked' ? 'disabled' : (challenge.difficulty.toLowerCase() as BadgeVariant)}>
            {challenge.difficulty}
          </Badge>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {challenge.tags.map((tag) => (
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
      {(() => {
        const buttonConfig = getButtonContent();
        if (!buttonConfig) return null;

        const getIcon = () => {
          switch (buttonConfig.icon) {
            case 'check':
              return <IcoCheckboxCircleLined />;
            case 'unlock':
              return <IcoUnlockFilled />;
            case 'unlock-arrow':
              return (
                <>
                  <IcoUnlockFilled />
                  <IcoArrowRightSLined />
                </>
              );
            default:
              return null;
          }
        };

        return (
          <Button
            variant={buttonConfig.variant}
            size={buttonConfig.size}
            className={buttonConfig.className}
            onClick={buttonConfig.onClick}
            disabled={buttonConfig.disabled}
          >
            {getIcon()}
            {buttonConfig.content}
          </Button>
        );
      })()}
    </Card>
  );
}

export default ChallengeCard;
