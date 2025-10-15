import { useState, useEffect } from 'react';
import { fetcher } from '@/+shared/libs';
import { useParams } from 'react-router-dom';
import showToast from '@/+shared/functions/showToast';

export function useChallengeModal(initialChallenge: any, onClose: () => void) {
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showHintModal, setShowHintModal] = useState(false);
  const [userPoints, setUserPoints] = useState(1000); // Mock user points
  
  // 챌린지 상세 정보 상태
  const [challenge, setChallenge] = useState<any>(initialChallenge);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  
  const { competitionId } = useParams<{ competitionId: string }>();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // 챌린지 상세 정보 가져오기
  useEffect(() => {
    const fetchChallengeDetail = async () => {
      if (!challenge?.id || !competitionId) return;
      
      try {
        setIsLoadingDetail(true);
        setDetailError(null);

        const response = await fetcher<any>({
          url: `/participant/competitions/${competitionId}/challenges/${challenge.id}`,
          method: 'get'
        });

        if (response.resultCode === 200 && response.result?.success) {
          setChallenge(response.result.data);
        } else {
          setDetailError('Failed to fetch challenge details');
        }
      } catch (err) {
        setDetailError('Failed to fetch challenge details');
        console.error('Challenge detail API Error:', err);
      } finally {
        setIsLoadingDetail(false);
      }
    };

    fetchChallengeDetail();
  }, [challenge?.id, competitionId]);

  // 다음에 구매할 수 있는 힌트 찾기
  const getNextAvailableHint = () => {
    if (!challenge?.hints || challenge.hints.length === 0) return null;
    
    // order 순서대로 정렬
    const sortedHints = [...challenge.hints].sort((a, b) => a.order - b.order);
    
    // 이미 구매하지 않은 첫 번째 힌트 반환
    return sortedHints.find(hint => !hint.isPurchased) || null;
  };

  const nextHint = getNextAvailableHint();

  const handleHintReveal = () => {
    if (!nextHint) {
      showToast('No more hints available', 'error');
      return;
    }
    setShowHintModal(true);
  };

  const confirmHintReveal = async () => {
    if (!nextHint || !competitionId) return;

    const hintCost = nextHint.cost;
    if (userPoints < hintCost) {
      showToast('Not enough points to reveal hint', 'error');
      setShowHintModal(false);
      return;
    }

    try {
      // 힌트 구매 API 호출
      const response = await fetcher<any>({
        url: '/participant/hints/purchase',
        method: 'post',
        body: {
          competitionId,
          challengeId: challenge.id,
          hintId: nextHint.id
        }
      });

      if (response.resultCode === 200 && response.result?.success) {
        // 성공 시 챌린지 데이터 다시 가져오기 (힌트 상태 업데이트)
        setUserPoints(response.result.data.remainingScore);
        setShowHintModal(false);
        showToast(`Hint revealed! -${hintCost} points`, 'active');
        
        // 힌트 구매 후 챌린지 상세 정보 다시 가져오기
        const refreshResponse = await fetcher<any>({
          url: `/participant/competitions/${competitionId}/challenges/${challenge.id}`,
          method: 'get'
        });
        
        if (refreshResponse.resultCode === 200 && refreshResponse.result?.success) {
          setChallenge(refreshResponse.result.data);
        }
      } else {
        // API 에러 메시지 처리
        let errorMessage = 'Failed to purchase hint';
        
        switch (response.resultCode) {
          case 400:
            errorMessage = response.result?.error?.message || 'Validation failed';
            break;
          case 403:
            errorMessage = response.result?.error?.message || 'Insufficient permissions';
            break;
          case 404:
            errorMessage = response.result?.error?.message || 'Hint not found';
            break;
          case 409:
            errorMessage = response.result?.error?.message || 'Hint already purchased';
            break;
          default:
            errorMessage = response.result?.error?.message || 'Failed to purchase hint';
        }
        
        showToast(errorMessage, 'error');
      }
    } catch (error) {
      console.error('Hint purchase error:', error);
      showToast('Failed to purchase hint', 'error');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      const remaining = Math.ceil((5000 - (now - lastSubmitTime)) / 1000);
      setTimeLeft(remaining);
      showToast(`Too fast! Wait ${remaining} more seconds`, 'error');
      return;
    }

    if (!flag.trim()) {
      showToast('Please enter a flag', 'error');
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(now);

    try {
      const response = await fetcher<any>({
        url: '/participant/submit',
        method: 'post',
        body: {
          competitionId,
          challengeId: challenge.id,
          flag: flag.trim()
        }
      });

      if (response.resultCode === 200 && response.result?.success) {
        const { score } = response.result.data;
        
        showToast(`Correct! +${score} pts`,'active');
        
        // Update challenge status to solved
        setChallenge(prev => ({ ...prev, isSolved: true }));
        
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        // Handle API error responses
        const errorMessage = response.result?.error?.message || 'Failed to submit flag';
        showToast(`${errorMessage}`, 'error');
        
        // Handle rate limiting
        if (response.resultCode === 429) {
          setTimeLeft(10); // 10초 대기
        }
      }
    } catch (err) {
      console.error('Flag submission error:', err);
      showToast('Failed to submit flag. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // State
    flag,
    setFlag,
    isSubmitting,
    timeLeft,
    showHintModal,
    setShowHintModal,
    userPoints,
    
    // Challenge Detail
    challenge,
    isLoadingDetail,
    detailError,
    
    // Handlers
    handleHintReveal,
    confirmHintReveal,
    handleSubmit,
    
    // Computed
    nextHint,
  };
}
