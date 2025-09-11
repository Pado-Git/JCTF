
import { IcoChallengeFilled, IcoChartIncreaseLined, IcoTeamLined } from '@/+shared/assets';
import { Badge } from '@/+shared/components';
import { Activity } from 'lucide-react';

interface RecentActivity {
  id: string;
  type: 'solve' | 'join' | 'rank_up';
  challengeName?: string;
  competitionName: string;
  points?: number;
  timestamp: string;
  isFirstBlood?: boolean;
}

interface ActivityCardProps {
  activity: RecentActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'solve':
        return <IcoChallengeFilled />;
      case 'join':
        return <IcoTeamLined />;
      case 'rank_up':
        return <IcoChartIncreaseLined />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center bg-neutral-800 rounded-radius-md border-neutral-700 p-8 gap-4 border-2 card-hover">
      <div className='p-2 gradient-1 rounded-full'>
        {getActivityIcon(activity.type)}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 gap-4">
          {activity.type === 'solve' && (
            <>
              <span className="typo-heading-xsmall text-neutral-0">
                Solved "{activity.challengeName}"
              </span>
              {activity.isFirstBlood && (
                <Badge variant="primary">
                  FIRST BLOOD
                </Badge>
              )}
            </>
          )}
          {activity.type === 'join' && (
            <span className="typo-heading-xsmall text-neutral-0">
              Joined {activity.competitionName}
            </span>
          )}
          {activity.type === 'rank_up' && (
            <span className="typo-heading-xsmall text-neutral-0">
              Rank improved in {activity.competitionName}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-1 text-primary-300 typo-body-xsmall">
          <span>{activity.competitionName}</span>
          <span>{activity.timestamp}</span>
        </div>
      </div>
      {activity.points && (
        <Badge variant="easy">
          +{activity.points} pts
        </Badge>
      )}
    </div>
  );
}

export default ActivityCard;