/**
 * ngrok 환경에서 이미지 경로를 절대 경로로 변환
 */
export function getAbsoluteImagePath(relativePath: string): string {
  // 개발 환경에서 ngrok 사용 시
  if (import.meta.env.DEV && window.location.hostname.includes('ngrok')) {
    const baseUrl = window.location.origin;
    return `${baseUrl}${relativePath.startsWith('/') ? relativePath : `/${relativePath}`}`;
  }
  
  // 일반적인 경우
  return relativePath;
}

/**
 * 이미지 로드 실패 시 fallback 처리
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = event.target as HTMLImageElement;
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
}
