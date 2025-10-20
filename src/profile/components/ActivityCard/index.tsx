
import { IcoChallengeFilled, IcoChartIncreaseLined, IcoTeamLined } from '@/+shared/assets';
import { Badge } from '@/+shared/components';
import { formatLastSolvedTime } from '@/leaderboard/utils';

interface Challenge {
  name: string;
  competitionId: string;
  isOpen: boolean;
  category: {
    name: string;
  };
  challengeId: string;
}

interface Competition {
  name: string;
  competitionId: string;
}

interface RecentActivity {
  id: string;
  challenge: Challenge;
  competition: Competition;
  competitionId: string;
  isCorrect: boolean;
  score: number;
  submittedAt: string;
}

interface ActivityCardProps {
  activity: RecentActivity;
}

export function ActivityCard({ activity }: ActivityCardProps) {

  const getActivityIcon = () => {
    // API 응답에는 type이 없으므로 모든 활동을 solve로 처리
    return <IcoChallengeFilled />;
  };

  // const getActivityIcon = (type: string) => {
  //   switch (type) {
  //     case 'solve':
  //       return <IcoChallengeFilled />;
  //     case 'join':
  //       return <IcoTeamLined />;
  //     case 'rank_up':
  //       return <IcoChartIncreaseLined />;
  //     default:
  //       return <Activity className="h-4 w-4" />;
  //   }
  // };

  return (
    <div className="flex items-center bg-neutral-800 rounded-radius-md border-neutral-700 p-8 gap-4 border-2 gradient-3-hover">
      <div className='p-2 gradient-1 rounded-full'>
        {getActivityIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 gap-4">
          {/* {activity.type === 'solve' && (
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
          )} */}
          <span className="typo-heading-xsmall text-neutral-0">
            Solved "{activity.challenge?.name}"
          </span>
        </div>
        <div className="flex items-center space-x-4 mt-1 text-primary-300 typo-body-xsmall">
          <span>{activity.competition?.name}</span>
          <span>{formatLastSolvedTime(activity.submittedAt)}</span>
        </div>
      </div>
      {activity.isCorrect && (
        <Badge variant="easy">
          +{activity.score} pts
        </Badge>
      )}
    </div>
  );
}

export default ActivityCard;