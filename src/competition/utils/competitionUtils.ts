export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-success/20 text-success border-success/30';
    case 'Advanced': return 'bg-warning/20 text-warning border-warning/30';
    case 'Expert': return 'bg-destructive/20 text-destructive border-destructive/30';
    default: return 'bg-muted/20 text-muted-foreground border-muted/30';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success/20 text-success border-success/30';
    case 'upcoming': return 'bg-primary/20 text-primary border-primary/30';
    case 'ended': return 'bg-muted/20 text-muted-foreground border-muted/30';
    default: return 'bg-muted/20 text-muted-foreground border-muted/30';
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
  
  if (days > 0) return `${days}d ${hours}h remaining`;
  return `${hours}h remaining`;
};

export const handleRegister = (competitionId: number) => {
  // Mock registration logic
  console.log(`Registering for competition ${competitionId}`);
  // In real app, this would be an API call
};
