// utils/getCompetitionStatus.ts
export type CompetitionStatus = 'upcoming' | 'live' | 'ended';

export interface CompetitionWithDates {
  startDate: string;
  endDate: string;
}

export interface CompetitionStatusInfo {
  status: CompetitionStatus;
  timeRemaining: string;
  isUpcoming: boolean;
  isActive: boolean;
  isEnded: boolean;
  daysUntilStart: number;
  daysUntilEnd: number;
  hoursUntilStart: number;
  hoursUntilEnd: number;
}

export const getCompetitionStatus = (competition: CompetitionWithDates): CompetitionStatusInfo => {
  const now = Date.now();
  const startTime = new Date(competition.startDate).getTime();
  const endTime = new Date(competition.endDate).getTime();

  const timeUntilStart = startTime - now;
  const timeUntilEnd = endTime - now;

  const daysUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60 * 24));
  const daysUntilEnd = Math.ceil(timeUntilEnd / (1000 * 60 * 60 * 24));
  const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
  const hoursUntilEnd = Math.ceil(timeUntilEnd / (1000 * 60 * 60));

  let status: CompetitionStatus;
  if (now < startTime) status = 'upcoming';
  else if (now < endTime) status = 'live';
  else status = 'ended';

  const formatTimeRemaining = (ms: number): string => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);
    return parts.join(' ');
  };

  const timeRemaining =
    status === 'upcoming' ? formatTimeRemaining(timeUntilStart) :
    status === 'live' ? formatTimeRemaining(timeUntilEnd) :
    'Ended';

  return {
    status,
    timeRemaining,
    isUpcoming: status === 'upcoming',
    isActive: status === 'live',
    isEnded: status === 'ended',
    daysUntilStart: Math.max(0, daysUntilStart),
    daysUntilEnd: Math.max(0, daysUntilEnd),
    hoursUntilStart: Math.max(0, hoursUntilStart),
    hoursUntilEnd: Math.max(0, hoursUntilEnd),
  };
};
