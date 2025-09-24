import { useCompetitions } from './index.hooks';
import { type Team } from '@/teams/data';
import { TitleWIcon } from '@/+shared/components';
import { HistoryBox } from '@/teams/components';

interface CompetitionsProps {
  team: Team;
}

export function Competitions({ team }: CompetitionsProps) {
  const { getCompetitionStats, formatDate } = useCompetitions();

  return (
    <>
      <TitleWIcon title="Recent Competitions" description="Your team's recent competitions and rankings" />
      <div className="flex flex-col gap-4">
        {team.recentCompetitions.map((competition) => (
          <HistoryBox
            key={competition.id}
            competition={competition}
            getCompetitionStats={getCompetitionStats}
            formatDate={formatDate}
          />
        ))}
      </div>
    </>
  );
}

export default Competitions;
