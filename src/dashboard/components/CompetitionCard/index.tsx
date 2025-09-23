// CompetitionCard.tsx
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardContent, CardDescription, CardHeader, Progress } from '@/+shared/components';
import { IcoChallengeFilled, IcoChart, IcoIndividualLined, IcoTeamLined, IcoStarLined, IcoTimerLined2, IcoTrophyLined } from '@/+shared/assets/icons';
import { LINKS } from '@/+shared/constants';
import { getCompetitionStatus } from '@/+shared/utils';

interface CompetitionEntry {
  id: string;
  name: string;
  backgroundImg: string;
  startDate: string;
  endDate: string;
  myRank: number;
  totalTeams: number;
  myScore: number;
  maxScore: number;
  solvedChallenges: number;
  totalChallenges: number;
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
  const [, setTick] = useState(0);

  // 1초마다 강제로 리렌더 → 남은 시간 갱신
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const competitionStatus = getCompetitionStatus(comp);
  const { status, timeRemaining } = competitionStatus;

  // 안전한 progress 계산
  const progress = comp.maxScore > 0 ? (comp.myScore / comp.maxScore) * 100 : 0;

  return (
    <Card className="bg-neutral-800 border-2 border-neutral-700 gradient-3-hover">
      <CardHeader className="flex justify-between align-start">
        <div className="flex flex-col gap-2">
          <span className="typo-heading-medium text-primary-100 mb-2">{comp.name}</span>

          <div className="flex gap-2">
            <Badge variant={status} />
            {comp.team ? (
              <Badge variant="participant">
                <IcoTeamLined /> Team
              </Badge>
            ) : (
              <Badge variant="participant">
                <IcoIndividualLined /> Individual
              </Badge>
            )}
          </div>
          {comp.team && (
            <CardDescription className="typo-body-small text-primary-300">
              Team <span className="typo-body-small-bold text-neutral-0">{comp.team?.name}</span>
            </CardDescription>
          )}
        </div>

        {status !== 'ended' && (
          <div className="flex flex-col gap-1 items-end">
            <div className="flex items-center gap-1 text-neutral-200 typo-body-xsmall">
              <IcoTimerLined2 className="w-4 h-4" />
              {status === 'live' ? 'Time Left' : 'Starts In'}
            </div>
            <span className="typo-body-medium text-neutral-50">{timeRemaining}</span>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Rank & Score */}
          <div className="flex gap-48 items-center">
            <div className="flex gap-4 items-center">
              <IcoTrophyLined className="size-6 text-primary-50" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="typo-heading-medium text-primary-50">{comp.myRank || '-'}</span>
                  <span className="typo-body-medium text-neutral-200">/{comp.totalTeams || '-'}</span>
                </div>
                <p className="typo-body-xsmall text-primary-100">Current Rank</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <IcoChallengeFilled className="size-6 text-primary-50" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="typo-heading-medium text-primary-50">{comp.solvedChallenges || '-'}</span>
                  <span className="typo-body-medium text-neutral-200">/{comp.totalChallenges || '-'}</span>
                </div>
                <p className="typo-body-xsmall text-primary-100">Challenges</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <IcoStarLined className="size-6 text-primary-50" />
              <div>
                <div className="flex items-center gap-1">
                  <span className="typo-heading-medium text-primary-50">{comp.myScore || '-'}</span>
                  <span className="typo-body-medium text-neutral-200">/{comp.maxScore || '-'}</span>
                </div>
                <p className="typo-body-xsmall text-primary-100">Score</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center gap-6">
            {/* Progress */}
            <div className="flex flex-col gap-2 flex-[3]">
              <div className="flex justify-between items-center typo-body-xsmall text-neutral-200">
                <span>Score Progress</span>
                <span className="typo-body-xsmall text-neutral-200">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex gap-2 flex-[2] justify-end">
              {status === 'live' && (
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => navigate(LINKS.challenges.replace(':competitionId', comp.id))}
                >
                  <IcoTrophyLined />
                  Continue
                </Button>
              )}

              {(status === 'live' || status === 'ended') && (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => navigate(LINKS.leaderboard.replace(':competitionId', comp.id))}
                >
                  <IcoChart />
                  {status === 'ended' ? 'View Results' : 'Leaderboard'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
