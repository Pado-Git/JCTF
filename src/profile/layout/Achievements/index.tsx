import { TitleWIcon } from '@/+shared/components';
import { IcoCrownFilled } from '@/+shared/assets';
import { AchievementsCard } from '@/profile/components/AchievementsCard';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  earnedDate: string;
}

interface AchievementsProps {
  achievements: Achievement[];
}

export function Achievements({ achievements }: AchievementsProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <TitleWIcon 
        title="Achievements"
        icon={<IcoCrownFilled />}
        description="Your accomplishments and milestones"
      />

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <AchievementsCard 
            key={achievement.id}
            achievement={achievement}
          />
        ))}
      </div>
    </div>
  );
}

export default Achievements;