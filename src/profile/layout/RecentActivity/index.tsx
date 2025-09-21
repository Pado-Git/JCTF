import { IcoTimerLined1 } from '@/+shared/assets';
import { Card, TitleWIcon } from '@/+shared/components';
import { ActivityCard } from '@/dashboard/components';

interface Activity {
  id: string;
  type: 'solve' | 'join' | 'rank_up';
  description: string;
  timestamp: string;
  points?: number;
  isFirstBlood?: boolean;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  // Activity 타입을 ActivityCard가 기대하는 RecentActivity 타입으로 변환
  const convertToActivityCardFormat = (activity: Activity) => {
    return {
      id: activity.id,
      type: activity.type,
      challengeName: activity.type === 'solve' ? activity.description.split('"')[1] : undefined,
      competitionName: activity.type === 'join' ? activity.description.split(' ')[1] : 
                      activity.type === 'rank_up' ? activity.description.split(' ')[3] : 'Competition',
      points: activity.points,
      timestamp: activity.timestamp,
      isFirstBlood: activity.isFirstBlood
    };
  };

  return (
    <>
      <TitleWIcon 
        title="Recent Activity"
        icon={<IcoTimerLined1 />}
        description='Your latest actions and achievements'
      />
      <Card className="border-neutral-600 bg-neutral-900">
        <div className="grid grid-cols-1 gap-4 p-4">
          {activities.map((activity) => (
            <ActivityCard 
              key={activity.id} 
              activity={convertToActivityCardFormat(activity)} 
            />
          ))}
        </div>
      </Card>
    </>
  );
}

export default RecentActivity;