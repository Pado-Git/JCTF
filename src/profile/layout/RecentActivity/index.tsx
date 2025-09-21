import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from '@/+shared/components';
import { Trophy, Target, Users, Crown, Zap } from 'lucide-react';

interface Activity {
  id: string;
  type: 'solve' | 'join' | 'rank_up' | 'first_blood';
  description: string;
  timestamp: string;
  points?: number;
}

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'solve': return <Target className="h-4 w-4" />;
      case 'join': return <Users className="h-4 w-4" />;
      case 'rank_up': return <Trophy className="h-4 w-4" />;
      case 'first_blood': return <Crown className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'solve': return 'text-accent';
      case 'join': return 'text-primary';
      case 'rank_up': return 'text-warning';
      case 'first_blood': return 'text-first-blood';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Activity</CardTitle>
        <CardDescription className="text-muted-foreground">
          Your latest actions and achievements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 border border-border">
              <div className={`p-2 rounded-full bg-card ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-foreground font-medium">{activity.description}</p>
                  {activity.points && (
                    <Badge className="bg-accent text-accent-foreground">
                      +{activity.points} pts
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RecentActivity;