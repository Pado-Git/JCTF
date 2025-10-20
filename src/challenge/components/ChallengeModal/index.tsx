import { Button, Badge, BadgeVariant, Divider, Input, Label, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/+shared/components';
import { getCategoryIcon } from '@/challenge/utils';
import { IcoChatSmileFilled, IcoCheckboxCircleLined, IcoCrownLined, IcoDownloadLined, IcoEyeLined, IcoFileFilled, IcoLockLined, IcoServerFilled, IcoSubmitFilled, IcoUnlockLined } from '@/+shared/assets';
import { useChallengeModal } from './index.hooks';

interface ChallengeModalProps {
  challenge: any;
  isOpen: boolean;
  onClose: () => void;
  allCategories?: string[]; // 카테고리 목록
}

export function ChallengeModal({ challenge: initialChallenge, isOpen, onClose, allCategories = [] }: ChallengeModalProps) {
  const {
    flag,
    setFlag,
    isSubmitting,
    timeLeft,
    showHintModal,
    setShowHintModal,
    challenge,
    isLoadingDetail,
    detailError,
    handleHintReveal,
    confirmHintReveal,
    handleSubmit,
    nextHint,
  } = useChallengeModal(initialChallenge, onClose);

  const handleFileDownload = (fileUrl: string) => {
    try {
      const link = document.createElement('a');
      link.href = fileUrl;
      // 파일명을 URL에서 추출하거나 기본값 사용
      const fileName = fileUrl.split('/').pop() || 'download';
      link.download = fileName;
      link.target = '_blank';
      
      // CORS 문제를 방지하기 위해 rel="noopener" 추가
      link.rel = 'noopener noreferrer';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // 다운로드 실패 시 새 탭에서 열기
      window.open(fileUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="overflow-y-auto bg-neutral-800 border border-neutral-700 p-8 flex flex-col gap-8 w-[800px] sm:max-w-6xl max-h-[90vh]">
          {/* 로딩 상태 */}
          {isLoadingDetail && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading challenge details...</p>
            </div>
          )}

          {/* 에러 상태 */}
          {detailError && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-destructive mb-2">Failed to load challenge details</h3>
              <p className="text-muted-foreground">
                Please try again or contact support if the problem persists.
              </p>
            </div>
          )}

          {/* 챌린지 상세 정보가 로드된 경우에만 표시 */}
          {!isLoadingDetail && !detailError && challenge && (
            <>
              {/* Header */}
              <div className="flex gap-4">
            <div className='w-10 h-10 rounded-radius-sm flex items-center justify-center bg-primary'>
              {(() => {
                const IconComponent = getCategoryIcon(challenge.category.name, allCategories);
                return <IconComponent className="size-6 text-neutral-0" />;
              })()}
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <div className='flex items-center gap-2'>
                <DialogTitle className="typo-heading-medium text-neutral-0">
                  {challenge.name}
                </DialogTitle>
                {challenge.isSolved ? <IcoCheckboxCircleLined className="size-6 text-primary" /> : <IcoUnlockLined className="size-6 text-primary" />}
              </div>
              <div className='flex flex-1 justify-between'>
                <div className="flex items-center gap-2">
                  <span className="typo-body-small text-neutral-100">{challenge.category?.name}</span>
                  {/* difficulty 추가 후 수정 필요 */}
                  <Badge variant="easy" />
                  {/* {challenge.difficulty && (
                  <Badge variant={challenge.difficulty?.toLowerCase() as BadgeVariant}
                  >
                    {challenge.difficulty}
                  </Badge>
                  )} */}
                </div>
                <div className="text-primary typo-body-large-bold">
                  +{challenge.currentScore}
                  <span className='typo-body-small text-neutral-400'> pts</span>
                </div>
              </div>
              <div className="typo-body-xsmall text-primary-300 flex items-center gap-2">
                {challenge.firstBloodTeam ? (
                  <>
                    <IcoCrownLined className="size-4 text-primary-300" />
                    {`First Blood Winner: ${challenge.firstBloodTeam}`}
                    <span className='typo-body-xsmall text-neutral-100 ml-2'> teams solved</span>
                  </>
                ) : (
                  <span className='typo-body-xsmall text-neutral-100'>No first blood yet</span>
                )}
              </div>
            </div>
          </div>

          <Divider />

          {/* Description */}
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Description</h3>
            <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-radius-md flex flex-col gap-4">
              <p className="typo-body-small text-neutral-50 whitespace-pre-wrap">
                {challenge.description}
              </p>
              {challenge.flagFormat && (
                <p className="bg-neutral-800 border border-neutral-700 p-4 rounded-radius-sm typo-body-medium text-neutral-50 whitespace-pre-wrap">
                  Flag format: {challenge.flagFormat}
                </p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Tag</h3>
            <div className="flex flex-wrap gap-2">
              {(challenge.tags || []).map((tag: string) => (
                <Badge key={tag} variant='greyTag'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="flex gap-6">
            {/* Files */}
            {challenge.fileUrl && (
              <div className='flex flex-col gap-2 flex-1 min-w-0'>
                <div className="text-primary-300 flex items-center gap-2">
                  <IcoFileFilled className='size-4 text-primary' />
                  <span className='typo-body-xsmall-bold'>Files</span>
                </div>
                <div className="flex flex-col gap-2">
                  {challenge.fileUrl && (
                    <Button
                      variant="secondary"
                      key={challenge.fileUrl}
                      size='small'
                      className='w-full break-all text-left justify-start'
                      onClick={() => handleFileDownload(challenge.fileUrl)}
                    >
                      <IcoDownloadLined className='size-4' />
                      <span className='truncate'>DOWNLOAD</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
            {/* Server */}
            {challenge.serverUrl && (
              <div className='flex flex-col gap-2 flex-1'>
              <div className="text-primary-300 flex items-center gap-2">
                <IcoServerFilled className='size-4 text-primary' />
                <span className='typo-body-xsmall-bold'>Server</span>
              </div>
              <Button
                size='small'
                className="text-left justify-start bg-neutral-600 p-4 rounded-radius-sm typo-body-small text-primary-300 cursor-pointer hover:bg-neutral-500 transition-colors"
                onClick={() => window.open(challenge.serverUrl, '_blank', 'noopener,noreferrer')}
              >
                {challenge.serverUrl}
              </Button>
            </div>
            )}

            {/* Hints */}
            {challenge.hints && challenge.hints.length > 0 && (
              <div className='flex flex-col gap-2 flex-1'>
                <div className="text-primary-300 flex items-center gap-2">
                  <IcoChatSmileFilled className='size-4 text-primary' />
                  <span className='typo-body-xsmall-bold'>Hints</span>
                </div>
                <div className="flex flex-col gap-3">
                  {challenge.hints
                    .sort((a: any, b: any) => a.order - b.order)
                    .map((hint: any, index: number) => {
                      const isRevealed = hint.isRevealed;
                      const isNextAvailable = index === 0 || challenge.hints[index - 1]?.isRevealed;
                      
                      return (
                        <div key={hint.id} className="flex flex-col gap-2">
                          {isRevealed ? (
                            <div className="bg-neutral-600 rounded-radius-sm typo-body-small text-primary-300 p-4">
                              {hint.content}
                            </div>
                          ) : isNextAvailable ? (
                            <Button
                              onClick={handleHintReveal}
                              variant="secondary"
                              size='small'
                              className='w-fit gradient-3-deg border border-primary-900 hover:[background:var(--gradient-2)] hover:border-primary-900 hover:text-primary-300 typo-body-small'
                            >
                              <IcoLockLined className='size-4' />
                              Reveal Hint ({hint.cost} points)
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

          </div>

          {/* Submit Flag */}
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Submit Flag</h3>
            {challenge.isSolved ? (
              <div className="h-14 gradient-3-deg border border-gradient-2 p-4 rounded-radius-sm flex items-center gap-2">
                <IcoCheckboxCircleLined className='text-primary size-6' />
                <h4 className="typo-body-medium-bold text-primary">Challenge Solved!</h4>
                {/* <p className="typo-body-xsmall text-neutral-100">Solved in 15m</p> */}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                <div className='flex flex-col gap-2 w-full'>
                  <Input
                    id="flag"
                    type="text"
                    placeholder="ACDC{...}"
                    value={flag}
                    onChange={(e) => setFlag(e.target.value)}
                    disabled={timeLeft > 0 || isSubmitting}
                  />
                  {timeLeft > 0 && (
                    <p className="text-sm text-red-400 mt-1">
                      Rate limited: {timeLeft}s remaining
                    </p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  disabled={!flag.trim() || timeLeft > 0 || isSubmitting}
                  variant="primary"
                  size='medium'
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      Submit Flag
                      <IcoSubmitFilled className='size-6' />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Recent Solvers */}
          {challenge.recentSolvers && (
            <div className='flex flex-col gap-4'>
              <h3 className="typo-heading-xsmall text-primary-100">Recent 3 Solvers</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.recentSolvers.map((solver: string) => (
                  <Badge key={solver} variant='greyTag' className='border border-neutral-400 flex gap-1'>
                    <IcoCrownLined className='size-3' />
                    {solver}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
            </>
          )}
        </DialogContent>  
      </Dialog>

      {/* Hint Confirmation Modal */}
      <Dialog open={showHintModal} onOpenChange={setShowHintModal}>
        <DialogContent className="text-center w-fit p-10 flex flex-col items-center gap-2 bg-neutral-800 border-2 border-neutral-500 rounded-radius-md">
          <DialogTitle className="typo-heading-medium text-neutral-0">
            Reveal Hint?
          </DialogTitle>
          <DialogDescription className="text-neutral-50 typo-body-medium">
            Revealing this hint will deduct <span className="typo-body-medium-bold text-primary-500">{nextHint?.cost || 0} points</span> from your total score.
            <br />Are you sure you want to reveal the hint?
          </DialogDescription>
          <div className="flex justify-end mt-6 gap-2">
            <Button
              variant="secondary-gray"
              size='medium'
              onClick={() => setShowHintModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size='medium'
              onClick={confirmHintReveal}
            >
              <IcoEyeLined className='size-4' />
              Reveal Hint
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ChallengeModal;
