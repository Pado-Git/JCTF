import { IcoChartIncreaseLined, IcoTeamFilled, IcoArrowRightSLined } from '@/+shared/assets';
import { Badge, Button, Progress, TitleWIcon } from '@/+shared/components';
import { StatsCard } from '@/profile/components';
import { LINKS } from '@/+shared/constants';

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
  const successRate = Math.round((profile.stats.totalSolved / (profile.stats.totalCompetitions * 20)) * 100);
  const skillLevel = 78; // Figma에서 78%로 표시

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Competition Statistics */}
      <div className="flex-1 flex flex-col gap-10">
        <TitleWIcon 
          title="Competition Statistics"
          icon={<IcoChartIncreaseLined />}
        />
        <StatsCard
          stats={[
            {
              label: 'Total Competitions',
              value: profile.stats.totalCompetitions,
              labelColor: 'text-neutral-100'
            },
            {
              label: 'Average Rank',
              value: profile.stats.averageRank
            },
            {
              label: 'Success Rate',
              value: `${successRate}%`
            }
          ]}
        >
          {/* Skill Level Progress */}
          <div className="flex-1 flex flex-col justify-end gap-4">
            <div className="flex justify-between items-end">
              <div className="flex items-center gap-4">
                <span className="text-primary-300 typo-heading-xxsmall">Skill Level</span>
                <span className="text-neutral-50 typo-body-medium">{skillLevel}%</span>
              </div>
              <Badge variant="advanced" />
            </div>
            <Progress value={skillLevel} className="h-3" />
          </div>
        </StatsCard>
      </div>

      {/* Current Team */}
      {profile.currentTeam && (
        <div className="flex-1 flex flex-col gap-10">
          <TitleWIcon
            title="Current Team"
            icon={<IcoTeamFilled />}
          />
          <StatsCard
            stats={[
              {
                label: 'Team Name',
                value: profile.currentTeam.name
              },
              {
                label: 'Your Role',
                value: profile.currentTeam.role === 'leader' ? 'Team Leader' : 'Member'
              },
              {
                label: 'Members',
                value: profile.currentTeam.members
              }
            ]}
            className="flex flex-col justify-between"
          >
            <Button
              variant="primary"
              size="small"
              onClick={() => onNavigate?.(LINKS.teams)}
            >
              Manage Team
              <IcoArrowRightSLined className="w-4 h-4" />
            </Button>
          </StatsCard>
        </div>
      )}
    </div>
  );
}

export default Overview;