import { Card, CardContent, CardHeader, CardTitle, Badge, Progress } from '@/+shared/components';
import { Trophy, Users } from 'lucide-react';

interface OverviewProps {
  profile: {
    stats: {
      totalCompetitions: number;
      totalSolved: number;
      totalPoints: number;
      averageRank: number;
      firstBloods: number;
      bestRank: number;
    };
    currentTeam?: {
      id: string;
      name: string;
      role: 'leader' | 'member';
      members: number;
    };
  };
  onNavigate?: (path: string) => void;
}

export function Overview({ profile, onNavigate }: OverviewProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Statistics */}
      <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Competition Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Competitions</span>
            <span className="text-foreground font-semibold">{profile.stats.totalCompetitions}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Average Rank</span>
            <span className="text-foreground font-semibold">#{profile.stats.averageRank}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Success Rate</span>
            <span className="text-accent font-semibold">
              {Math.round((profile.stats.totalSolved / (profile.stats.totalCompetitions * 20)) * 100)}%
            </span>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Skill Level</span>
              <span className="text-warning font-semibold">Advanced</span>
            </div>
            <Progress value={75} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Team Information */}
      {profile.currentTeam && (
        <Card className="bg-card/50 backdrop-blur-sm border-accent/30">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center">
              <Users className="h-5 w-5 mr-2 text-accent" />
              Current Team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Team Name</span>
              <span className="text-foreground font-semibold">{profile.currentTeam.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Your Role</span>
              <Badge variant="primary" className="border-accent text-accent">
                {profile.currentTeam.role}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Members</span>
              <span className="text-foreground font-semibold">{profile.currentTeam.members}</span>
            </div>
            <button 
              className="w-full px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              onClick={() => onNavigate?.('teams')}
            >
              Manage Team
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Overview;