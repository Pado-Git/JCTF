export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy': return 'text-accent';
    case 'Medium': return 'text-warning';
    case 'Hard': return 'text-destructive';
    case 'Insane': return 'text-first-blood';
    default: return 'text-muted-foreground';
  }
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getTimeRemaining = (endDate: string) => {
  const now = new Date();
  const end = new Date(endDate);
  const diff = end.getTime() - now.getTime();
  
  if (diff <= 0) return 'Ended';
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  if (hours > 0) return `${hours}h ${minutes}m remaining`;
  return `${minutes}m remaining`;
};

export const generateMockFlag = (challengeName: string) => {
  return `JCTF{${challengeName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_solved}`;
};

export const validateFlag = (inputFlag: string, challengeName: string) => {
  const correctFlag = generateMockFlag(challengeName);
  return inputFlag.trim() === correctFlag;
};

export const calculateScore = (challenges: any[]) => {
  return challenges
    .filter(c => c.solved)
    .reduce((sum, c) => sum + c.score, 0);
};

export const getSolvedCount = (challenges: any[]) => {
  return challenges.filter(c => c.solved).length;
};

export const getProgressPercentage = (solvedCount: number, totalCount: number) => {
  return totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;
};
