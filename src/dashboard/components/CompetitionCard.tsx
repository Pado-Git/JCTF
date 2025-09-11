import { useNavigate } from 'react-router-dom';
import { Button } from '@/+shared/components/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/+shared/components/data-display/card';
import { Badge } from '@/+shared/components/feedback/badge';
import { Progress } from '@/+shared/components/feedback/progress';
import { Clock, ArrowRight } from 'lucide-react';

interface CompetitionEntry {
  id: string;
  name: string;
  status: 'running' | 'upcoming' | 'ended';
  myRank: number;
  totalTeams: number;
  myScore: number;
  maxScore: number;
  solvedChallenges: number;
  totalChallenges: number;
  timeLeft?: string;
  team?: {
    name: string;
    rank: number;
  };
}

interface CompetitionCardProps {
  competition: CompetitionEntry;
}

export function CompetitionCard({ competition: comp }: CompetitionCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="bg-neutral-800 border-2 border-neutral-700 card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-foreground">{comp.name}</CardTitle>
            <CardDescription className="text-muted-foreground">
              {comp.team ? `Team: ${comp.team.name}` : 'Individual Competition'}
            </CardDescription>
          </div>
          <Badge 
            variant={comp.status === 'running' ? 'default' : comp.status === 'ended' ? 'secondary' : 'outline'}
            className={
              comp.status === 'running' 
                ? 'bg-accent text-accent-foreground' 
                : comp.status === 'ended'
                ? 'bg-muted text-muted-foreground'
                : 'bg-warning text-warning-foreground'
            }
          >
            {comp.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Rank & Score */}
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Current Rank</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-primary">
                  {comp.myRank || '-'}
                </span>
                <span className="text-muted-foreground">
                  / {comp.totalTeams || '-'}
                </span>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Score</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-accent">
                  {comp.myScore.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  / {comp.maxScore.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Challenges</span>
                <span className="text-foreground">
                  {comp.solvedChallenges} / {comp.totalChallenges}
                </span>
              </div>
              <Progress 
                value={(comp.solvedChallenges / comp.totalChallenges) * 100} 
                className="h-2"
              />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Score Progress</span>
                <span className="text-foreground">
                  {Math.round((comp.myScore / comp.maxScore) * 100)}%
                </span>
              </div>
              <Progress 
                value={(comp.myScore / comp.maxScore) * 100} 
                className="h-2"
              />
            </div>
          </div>

          {/* Time & Actions */}
          <div className="space-y-4">
            {comp.timeLeft && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  {comp.status === 'running' ? 'Time Left' : 'Starts In'}
                </p>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-warning" />
                  <span className="text-warning font-semibold">
                    {comp.timeLeft}
                  </span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col space-y-2">
              <Button 
                className="bg-primary hover:bg-primary/80 text-primary-foreground"
                onClick={() => navigate('/challenges')}
                disabled={comp.status === 'ended'}
              >
                {comp.status === 'running' ? 'Continue' : comp.status === 'upcoming' ? 'View Details' : 'View Results'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              {comp.status === 'running' && (
                <Button 
                  variant="secondary"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={() => navigate('/leaderboard')}
                >
                  Leaderboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
