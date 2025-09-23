import { type Team } from '@/teams/data';

type Competition = Team['recentCompetitions'][0];

interface HistoryBoxProps {
  competition: Competition;
  getCompetitionStats: (comp: Competition) => { rank: number; totalTeams: number; points: number };
  formatDate: (date: string) => string;
}

export function HistoryBox({ competition, getCompetitionStats, formatDate }: HistoryBoxProps) {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-radius-md p-6 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h4 className="typo-heading-xsmall">{competition.name}</h4>
        <p className="typo-body-xsmall text-primary-300">{formatDate(competition.date)}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1 bg-neutral-600 rounded-radius-sm p-4 w-25 text-center">
          <div className="typo-body-medium-bold text-neutral-50">#{getCompetitionStats(competition).rank}</div>
          <div className="typo-body-small text-neutral-100">Rank</div>
        </div>
        <div className="flex flex-col gap-1 bg-neutral-600 rounded-radius-sm p-4 w-25 text-center">
          <div className="typo-body-medium-bold text-neutral-50">/{getCompetitionStats(competition).totalTeams}</div>
          <div className="typo-body-small text-neutral-100">Teams</div>
        </div>
        <div className="flex flex-col gap-1 bg-neutral-600 rounded-radius-sm p-4 w-25 text-center">
          <div className="typo-body-medium-bold text-neutral-50">{getCompetitionStats(competition).points.toLocaleString()}</div>
          <div className="typo-body-small text-neutral-100">Points</div>
        </div>
      </div>
    </div>
  );
}

export default HistoryBox;