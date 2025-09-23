// 시간 포맷팅 관련 유틸리티 함수들

// 시간 포맷팅 함수 (문제 해결 시간용)
export const formatLastSolvedTime = (isoString: string): string => {
  const now = new Date();
  const lastSolved = new Date(isoString);
  const diffInMinutes = Math.floor((now.getTime() - lastSolved.getTime()) / (1000 * 60));
  
  // 음수 시간 차이 처리 (미래 시간인 경우)
  if (diffInMinutes < 0) {
    return 'N/A';
  }
  
  // 0분인 경우
  if (diffInMinutes === 0) {
    return 'just now';
  }
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInMinutes / 1440);
    return `${days} days ago`;
  }
};

// 마지막 업데이트 시간 포맷팅 함수
export const formatLastUpdatedTime = (date: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  }
};
