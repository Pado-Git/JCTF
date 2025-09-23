import { useEffect, useState } from 'react';

/**
 * useNow 훅
 * 일정 주기로 현재 시간을 업데이트해서 리렌더링을 트리거합니다.
 * 
 * @param intervalMs 갱신 주기 (기본값: 1분 = 60000ms)
 */
export function useNow(intervalMs: number = 60000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return now;
}
