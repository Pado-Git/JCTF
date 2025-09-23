import { IcoTimerLined1 } from '@/+shared/assets';
import { Card, TitleWIcon } from '@/+shared/components';
import { ActivityCard } from '@/profile/components';

// ActivityCard와 동일한 인터페이스 사용
interface Activity {
  id: string;
  type: 'solve' | 'join' | 'rank_up';
  challengeName?: string;
  competitionName: string;
  timestamp: string;
  points?: number;
  isFirstBlood?: boolean;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {

  return (
    <div className='flex flex-col gap-10'>
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
              activity={activity} 
            />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default RecentActivity;