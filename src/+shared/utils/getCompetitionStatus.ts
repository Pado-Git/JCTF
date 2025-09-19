// Competition status calculation function (for filtering)
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
  const now = new Date().getTime();
  const startTime = new Date(competition.startDate).getTime();
  const endTime = new Date(competition.endDate).getTime();

  // 시간 차이 계산 (밀리초)
  const timeUntilStart = startTime - now;
  const timeUntilEnd = endTime - now;

  // 일/시간 계산
  const daysUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60 * 24));
  const daysUntilEnd = Math.ceil(timeUntilEnd / (1000 * 60 * 60 * 24));
  const hoursUntilStart = Math.ceil(timeUntilStart / (1000 * 60 * 60));
  const hoursUntilEnd = Math.ceil(timeUntilEnd / (1000 * 60 * 60));

  // 상태 결정
  let status: CompetitionStatus;
  if (now < startTime) {
    status = 'upcoming';
  } else if (now >= startTime && now < endTime) {
    status = 'live';
  } else {
    status = 'ended';
  }

  // 남은 시간 문자열 생성
  const timeRemaining = (() => {
    if (status === 'upcoming') {
      if (daysUntilStart > 1) {
        return `${daysUntilStart}일 후 시작`;
      } else if (hoursUntilStart > 1) {
        return `${hoursUntilStart}시간 후 시작`;
      } else {
        return '곧 시작';
      }
    } else if (status === 'live') {
      if (daysUntilEnd > 1) {
        return `${daysUntilEnd}일 남음`;
      } else if (hoursUntilEnd > 1) {
        return `${hoursUntilEnd}시간 남음`;
      } else {
        return '곧 종료';
      }
    } else {
      return '종료됨';
    }
  })();

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