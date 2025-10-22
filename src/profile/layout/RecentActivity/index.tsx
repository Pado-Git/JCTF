import { IcoTimerLined1 } from '@/+shared/assets';
import { Card, TitleWIcon } from '@/+shared/components';
import { ActivityCard } from '@/profile/components';

interface Activity {
  id: string;
  challenge: {
    name: string;
    competitionId: string;
    isOpen: boolean;
    category: {
      name: string;
    };
    challengeId: string;
  };
  competition: {
    name: string;
    competitionId: string;
  };
  competitionId: string;
  isCorrect: boolean;
  score: number;
  submittedAt: string;
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
        {activities && activities.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 p-4">
            {activities.map((activity) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center">
              <IcoTimerLined1 className="w-8 h-8 text-neutral-500" />
            </div>
            <div className="text-center">
              <h3 className="typo-heading-small text-neutral-300 mb-2">No Recent Activity</h3>
              <p className="typo-body-medium text-neutral-500">
                You haven't completed any activities yet. Start solving challenges to see your activity here!
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default RecentActivity;