// 레더보드 관련 유틸리티 함수들

// Top 3 팀 카드 높이 계산
export const getCardHeight = (rank: number): string => {
  switch (rank) {
    case 1: return 'h-[540px]'; // 1등: 가장 높음
    case 2: return 'h-[480px]'; // 2등: 중간 높이
    case 3: return 'h-[440px]'; // 3등: 가장 낮음
    default: return 'h-[31rem]';
  }
};

// Top 3 팀 카드 간격 계산
export const getGapSize = (rank: number): string => {
  switch (rank) {
    case 1: return 'gap-10'; // 1등: 가장 큰 간격
    case 2: return 'gap-6'; // 2등: 중간 간격
    case 3: return 'gap-2'; // 3등: 가장 작은 간격
    default: return 'gap-4';
  }
};

// Top 3 팀 아이콘 크기 계산
export const getIconSize = (rank: number): string => {
  switch (rank) {
    case 1: return 'w-18 h-18'; // 1등: 가장 높음
    case 2: return 'w-16 h-16'; // 2등: 중간 높이
    case 3: return 'w-14 h-14'; // 3등: 가장 낮음
    default: return 'w-10 h-10';
  }
};
