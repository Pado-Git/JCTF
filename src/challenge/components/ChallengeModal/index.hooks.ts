import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { validateFlag } from '@/challenge/utils';

export function useChallengeModal(challenge: any, onClose: () => void) {
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [hintRevealed, setHintRevealed] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [userPoints, setUserPoints] = useState(1000); // Mock user points

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleHintReveal = () => {
    setShowHintModal(true);
  };

  const confirmHintReveal = () => {
    const hintCost = 50;
    if (userPoints >= hintCost) {
      setUserPoints(userPoints - hintCost);
      setHintRevealed(true);
      setShowHintModal(false);
      toast.success(`Hint revealed! -${hintCost} points`);
    } else {
      toast.error('Not enough points to reveal hint');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      const remaining = Math.ceil((5000 - (now - lastSubmitTime)) / 1000);
      setTimeLeft(remaining);
      toast.error(`Too fast! Wait ${remaining} more seconds`);
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock flag validation
    const isCorrect = validateFlag(flag, challenge.name);

    if (isCorrect) {
      // Success with potential first blood
      const isFirstBlood = Math.random() < 0.1; // 10% chance of first blood
      
      toast.success(
        isFirstBlood 
          ? `🏆 FIRST BLOOD! Correct! +${challenge.score} pts`
          : `✅ Correct! +${challenge.score} pts`
      );
      
      if (isFirstBlood) {
        // Add confetti or special effects here
        console.log('FIRST BLOOD ACHIEVED!');
      }
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      toast.error('❌ Incorrect flag');
      setTimeLeft(5);
    }

    setIsSubmitting(false);
  };

  return {
    // State
    flag,
    setFlag,
    isSubmitting,
    timeLeft,
    hintRevealed,
    showHintModal,
    setShowHintModal,
    userPoints,
    
    // Handlers
    handleHintReveal,
    confirmHintReveal,
    handleSubmit,
  };
}
