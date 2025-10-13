import { Button, Badge, BadgeVariant, Divider, Input, Label, Dialog, DialogContent, DialogDescription, DialogTitle } from '@/+shared/components';
import { getCategoryIcon } from '@/challenge/utils';
import { IcoChatSmileFilled, IcoCheckboxCircleLined, IcoCrownLined, IcoDownloadLined, IcoEyeLined, IcoFileFilled, IcoLockLined, IcoServerFilled, IcoSubmitFilled, IcoUnlockLined } from '@/+shared/assets';
import { useChallengeModal } from './index.hooks';

interface ChallengeModalProps {
  challenge: any;
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeModal({ challenge, isOpen, onClose }: ChallengeModalProps) {
  const {
    flag,
    setFlag,
    isSubmitting,
    timeLeft,
    hintRevealed,
    showHintModal,
    setShowHintModal,
    userPoints,
    handleHintReveal,
    confirmHintReveal,
    handleSubmit,
  } = useChallengeModal(challenge, onClose);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="overflow-y-auto bg-neutral-800 border border-neutral-700 p-8 flex flex-col gap-8 w-[800px] sm:max-w-6xl max-h-[90vh]">
          {/* Header */}
          <div className="flex gap-4">
            <div className='w-10 h-10 rounded-radius-sm flex items-center justify-center bg-primary'>
              {(() => {
                const IconComponent = getCategoryIcon(challenge.category.name);
                return <IconComponent className="size-6 text-neutral-0" />;
              })()}
            </div>

            <div className='flex flex-col gap-2 flex-1'>
              <div className='flex items-center gap-2'>
                <DialogTitle className="typo-heading-medium text-neutral-0">
                  {challenge.name}
                </DialogTitle>
                {challenge.solved ? <IcoCheckboxCircleLined className="size-6 text-primary" /> : <IcoUnlockLined className="size-6 text-primary" />}
              </div>
              <div className='flex flex-1 justify-between'>
                <div className="flex items-center gap-2">
                  <span className="typo-body-small text-neutral-100">{challenge.category.name}</span>
                  {challenge.difficulty && (
                  <Badge variant={challenge.difficulty?.toLowerCase() as BadgeVariant}
                  >
                    {challenge.difficulty}
                  </Badge>
                  )}
                </div>
                <div className="text-primary typo-body-large-bold">
                  +{challenge.score}
                  <span className='typo-body-small text-neutral-400'> pts</span>
                </div>
              </div>
              <div className="typo-body-xsmall text-primary-300 flex items-center gap-2">
                <IcoCrownLined className="size-4 text-primary-300" />
                First Blood Winner: Alice from CyberWarriors
                <span className='typo-body-xsmall text-neutral-100 ml-2'> teams solved</span>
              </div>
            </div>
          </div>

          <Divider />

          {/* Description */}
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Description</h3>
            <div className="bg-neutral-900 border border-neutral-700 p-6 rounded-radius-md">
              <p className="typo-body-small text-neutral-50 mb-4 whitespace-pre-wrap">{challenge.description}</p>
              <p className="bg-neutral-800 border border-neutral-700 p-4 rounded-radius-sm typo-body-medium text-neutral-50 whitespace-pre-wrap">The flag is hidden somewhere in the database structure.</p>
            </div>
          </div>

          {/* Tags */}
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Tag</h3>
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag: string) => (
                <Badge key={tag} variant='greyTag'>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="flex gap-6">
            {/* Files */}
            {challenge.files && (
              <div className='flex flex-col gap-2'>
                <div className="text-primary-300 flex items-center gap-2">
                  <IcoFileFilled className='size-4 text-primary' />
                  <span className='typo-body-xsmall-bold'>Files</span>
                </div>
                <div className="flex flex-col gap-2">
                  {challenge.files.map((file: string) => (
                    <Button
                      variant="secondary"
                      key={file}
                      size='small'
                      className='w-fit'
                    >
                      <IcoDownloadLined className='size-4' />
                      {file}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Server */}
            {challenge.server && (
              <div className='flex flex-col gap-2'>
              <div className="text-primary-300 flex items-center gap-2">
                <IcoServerFilled className='size-4 text-primary' />
                <span className='typo-body-xsmall-bold'>Server</span>
              </div>
              <div className="bg-neutral-600 p-4 rounded-radius-sm typo-body-small text-primary-300">
                {challenge.server}
              </div>
            </div>
            )}

            {/* Hint */}
            <div className='flex flex-col gap-2'>
              <div className="text-primary-300 flex items-center gap-2">
                <IcoChatSmileFilled className='size-4 text-primary' />
                <span className='typo-body-xsmall-bold'>Hint</span>
              </div>
              {hintRevealed ? (
                <div className="bg-neutral-600 rounded-radius-sm p-3 typo-body-small text-primary-300 p-4">
                  {challenge.hint}
                </div>
              ) : (
                <Button
                  onClick={handleHintReveal}
                  variant="secondary"
                  size='small'
                  className='w-fit gradient-3-deg border border-primary-900 hover:[background:var(--gradient-2)] hover:border-primary-900 hover:text-primary-300 typo-body-small'
                >
                  <IcoLockLined className='size-4' />
                  Reveal Hint (-50 points)
                </Button>
              )}
            </div>
          </div>

          {/* Submit Flag */}
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Submit Flag</h3>
            {challenge.solved ? (
              <div className="h-14 gradient-3-deg border border-gradient-2 p-4 rounded-radius-sm flex items-center gap-2">
                <IcoCheckboxCircleLined className='text-primary size-6' />
                <h4 className="typo-body-medium-bold text-primary">Challenge Solved!</h4>
                <p className="typo-body-xsmall text-neutral-100">Solved in 15m</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                <div className='flex flex-col gap-2 w-full'>
                  <Label htmlFor="flag" className="typo-body-xsmall text-neutral-50">
                    Flag
                  </Label>
                  <Input
                    id="flag"
                    type="text"
                    placeholder="JCTF {...}"
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
          <div className='flex flex-col gap-4'>
            <h3 className="typo-heading-xsmall text-primary-100">Recent 3 Solvers</h3>
            <div className="flex flex-wrap gap-2">
              {['CryptoMaster', 'MathWiz', 'NumberCruncher'].map((solver: string) => (
                <Badge key={solver} variant='greyTag' className='border border-neutral-400 flex gap-1'>
                  <IcoCrownLined className='size-3' />
                  {solver}
                </Badge>
              ))}
            </div>
          </div>
        </DialogContent>  
      </Dialog>

      {/* Hint Confirmation Modal */}
      <Dialog open={showHintModal} onOpenChange={setShowHintModal}>
        <DialogContent className="text-center w-fit p-10 flex flex-col items-center gap-2 bg-neutral-800 border-2 border-neutral-500 rounded-radius-md">
          <DialogTitle className="typo-heading-medium text-neutral-0">Reveal Hint?</DialogTitle>
          <DialogDescription className="text-neutral-50 typo-body-medium">
            Revealing this hint will deduct <span className="typo-body-medium-bold text-primary-500">50 points</span> from your total score.
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
