import { useState } from "react";

export function useCompetitionCard() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // In real app, this would be an API call
  const handleRegister = (competitionId: string) => {
    // Mock registration logic
    console.log(`Registering for competition ${competitionId}`);
    // In real app, this would be an API call
  };

  return {
    registerModalOpen,
    setRegisterModalOpen,
    formatDate,
    handleRegister,
  }
};