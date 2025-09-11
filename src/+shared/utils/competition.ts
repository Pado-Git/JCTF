export interface Competition {
  id: string;
  name: string;
  description: string;
  status: 'upcoming' | 'running' | 'ended';
  startTime: string;
  endTime: string;
  participants: number;
  challenges: number;
  type: 'individual' | 'team';
}

/**
 * 대회 상태에 따른 메시지를 반환합니다.
 * @param comp - 대회 정보
 * @returns 상태 메시지 문자열
 */
export function getContestStatusMessage(comp: Competition): string {
  const now = new Date().getTime();
  const start = new Date(comp.startTime).getTime();
  const end = new Date(comp.endTime).getTime();
  
  if (now < start) {
    // 시작 전
    const hoursUntilStart = Math.ceil((start - now) / (1000 * 60 * 60));
    return `Starts in ${hoursUntilStart} hours`;
  } else if (now >= start && now < end) {
    // 진행 중
    const hoursUntilEnd = Math.ceil((end - now) / (1000 * 60 * 60));
    return `Ends in ${hoursUntilEnd} hours`;
  } else {
    // 종료됨
    return 'The contest has ended';
  }
}

/**
 * 대회 상태를 확인합니다.
 * @param comp - 대회 정보
 * @returns 현재 상태 ('upcoming' | 'running' | 'ended')
 */
export function getContestStatus(comp: Competition): 'upcoming' | 'running' | 'ended' {
  const now = new Date().getTime();
  const start = new Date(comp.startTime).getTime();
  const end = new Date(comp.endTime).getTime();
  
  if (now < start) return 'upcoming';
  if (now >= start && now < end) return 'running';
  return 'ended';
}

/**
 * 남은 시간을 계산합니다.
 * @param comp - 대회 정보
 * @returns 남은 시간 문자열 (예: "2d 5h 30m")
 */
export function getTimeRemaining(comp: Competition): string {
  const now = new Date().getTime();
  const start = new Date(comp.startTime).getTime();
  const end = new Date(comp.endTime).getTime();
  
  const targetTime = comp.status === 'running' ? end : start;
  const difference = targetTime - now;
  
  if (difference <= 0) return 'Ended';
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${days}d ${hours}h ${minutes}m`;
}
