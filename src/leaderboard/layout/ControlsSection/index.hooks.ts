import { useState, useEffect } from 'react';
import { formatLastUpdatedTime } from '@/leaderboard/utils';

export interface UseControlsSectionProps {
  autoRefresh: boolean;
}

export interface ControlsSectionRef {
  updateLastUpdated: (date: Date) => void;
}

export const useControlsSection = ({ 
  autoRefresh
}: UseControlsSectionProps) => {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // 마지막 업데이트 시간 설정 함수 (외부에서 호출)
  const updateLastUpdated = (date: Date) => {
    setLastUpdated(date);
  };

  // 마지막 업데이트 시간 실시간 업데이트
  // ⭐ 여기가 핵심! 무한루프 해결 방법
  useEffect(() => {
    if (!lastUpdated) return;

    const interval = setInterval(() => {
      // 컴포넌트 리렌더링을 위해 상태 업데이트
      setLastUpdated(prev => prev ? new Date(prev.getTime()) : null);
    }, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [lastUpdated ? lastUpdated.getTime() : null]); // lastUpdated의 시간값만 의존성으로 사용

  return {
    lastUpdated,
    updateLastUpdated,
    formattedLastUpdated: lastUpdated ? formatLastUpdatedTime(lastUpdated) : 'Never'
  };
};
