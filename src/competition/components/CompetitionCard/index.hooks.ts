export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const handleRegister = (competitionId: string) => {
  // Mock registration logic
  console.log(`Registering for competition ${competitionId}`);
  // In real app, this would be an API call
};
