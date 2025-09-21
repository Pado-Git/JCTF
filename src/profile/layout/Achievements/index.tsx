import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/+shared/components';
import { Crown } from 'lucide-react';

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
    <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center">
          <Crown className="h-5 w-5 mr-2 text-warning" />
          Achievements
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Your accomplishments and milestones
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 rounded-lg bg-muted/20 border border-border hover:border-warning/50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="primary" className={`${achievement.color} border-current`}>
                      Earned
                    </Badge>
                    <span className="text-xs text-muted-foreground">{achievement.earnedDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default Achievements;