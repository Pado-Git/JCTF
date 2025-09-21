
import { Card, Badge } from '@/+shared/components';
import { 
  IcoTrophyFilled, 
  IcoCalendarLined, 
  IcoDiamondFilled,
  IcoThumbsUpFilled,
  IcoShakeHandsFilled
} from '@/+shared/assets';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earnedDate: string;
}

interface AchievementsCardProps {
  achievement: Achievement;
}

// 아이콘 매핑
const getAchievementIcon = (icon: string) => {
  switch (icon) {
    case '🏆':
      return <IcoTrophyFilled className="w-10 h-10 text-primary" />;
    case '🕸️':
      return <IcoDiamondFilled className="w-10 h-10 text-primary" />;
    case '⭐':
      return <IcoThumbsUpFilled className="w-10 h-10 text-primary" />;
    case '👥':
      return <IcoShakeHandsFilled className="w-10 h-10 text-primary" />;
    default:
      return <IcoTrophyFilled className="w-10 h-10 text-primary" />;
  }
};

export function AchievementsCard({ achievement }: AchievementsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <Card 
      className="bg-neutral-800 border border-neutral-700 rounded-radius-md p-8 w-full"
    >
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-14 h-14 gradient-3 rounded-radius-sm flex items-center justify-center shadow-lg">
          {getAchievementIcon(achievement.icon)}
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-1">
          <h3 className="typo-heading-xsmall">{achievement.title}</h3>
          <p className="typo-body-xsmall text-primary-300">{achievement.description}</p>
        </div>
        
        {/* Badge and Date */}
        <div className="flex flex-col items-end gap-2">
          <Badge 
            variant="easy"
          >
            획득
          </Badge>
          <div className="flex items-center gap-1 text-neutral-200 typo-body-xsmall">
            <IcoCalendarLined className="w-4 h-4" />
            <span>{formatDate(achievement.earnedDate)}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AchievementsCard;