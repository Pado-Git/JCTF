import { useState, useEffect } from 'react';
import { Button } from '@/+shared/components/form/button';
import { Badge } from '@/+shared/components/feedback/badge';
import { Input } from '@/+shared/components/form/input';
import { Label } from '@/+shared/components/form/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/+shared/components/overlay/dialog';
import { 
  Check,
  Crown,
  Zap,
  Download,
  Server,
  Lightbulb,
  Send
} from 'lucide-react';
import { toast } from 'sonner';
import { Challenge } from '@/challenge/data';
import { getDifficultyColor, validateFlag } from '@/challenge/utils';

interface ChallengeModalProps {
  challenge: Challenge;
  isOpen: boolean;
  onClose: () => void;
}

export function ChallengeModal({ challenge, isOpen, onClose }: ChallengeModalProps) {
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card/90 backdrop-blur-md border-primary/50">
        <DialogHeader>
          <div className="flex items-start justify-between mb-4">
            <div>
              <DialogTitle className="text-2xl text-foreground flex items-center space-x-3">
                {challenge.name}
                {challenge.solved && <Check className="h-6 w-6 text-accent" />}
                {challenge.isFirstBlood && <Crown className="h-6 w-6 text-first-blood" />}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Challenge details and submission form for {challenge.name}
              </DialogDescription>
              <div className="flex items-center space-x-4 mt-2">
                <Badge 
                  style={{ backgroundColor: challenge.category.color }}
                  className="text-black font-semibold"
                >
                  {challenge.category.name}
                </Badge>
                <Badge 
                  variant="primary" 
                  className={`${getDifficultyColor(challenge.difficulty)} border-current`}
                >
                  {challenge.difficulty}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-warning" />
                  <span className="text-warning font-bold">
                    {challenge.scoreType === 'DYNAMIC' ? challenge.currentScore : challenge.score} pts
                  </span>
                  {challenge.scoreType === 'DYNAMIC' && (
                    <span className="text-muted-foreground text-sm">
                      (base: {challenge.baseScore})
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <div>{challenge.solveCount} teams solved</div>
              {challenge.firstBlood && (
                <div className="text-first-blood">
                  🏆 First Blood: {challenge.firstBlood.user}
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Challenge Description */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
            <div className="prose prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-muted-foreground bg-muted/20 p-4 rounded-lg border border-border">
                {challenge.description}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {challenge.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Resources */}
          {(challenge.files || challenge.server || challenge.hint) && (
            <div className="grid md:grid-cols-3 gap-4">
              {challenge.files && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Download className="h-4 w-4 mr-2" />
                    Files
                  </h3>
                  <div className="space-y-2">
                    {challenge.files.map((file) => (
                      <Button
                        key={file}
                        variant="secondary"
                        size="small"
                        className="w-full justify-start border-accent/30 text-accent hover:bg-accent/20"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        {file}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {challenge.server && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Server className="h-4 w-4 mr-2" />
                    Server
                  </h3>
                  <div className="bg-muted/20 p-3 rounded border border-border font-mono text-sm text-primary">
                    {challenge.server}
                  </div>
                </div>
              )}

              {challenge.hint && (
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Hint
                  </h3>
                  <div className="bg-warning/10 p-3 rounded border border-warning/30 text-sm text-warning">
                    {challenge.hint}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Flag Submission */}
          <div>
            {challenge.solved ? (
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                <div className="flex items-center space-x-3">
                  <Check className="h-6 w-6 text-accent" />
                  <div>
                    <h3 className="text-lg font-semibold text-accent">Challenge Solved!</h3>
                    <p className="text-muted-foreground">
                      You earned {challenge.score} points
                      {challenge.isFirstBlood && (
                        <span className="text-first-blood font-semibold"> - FIRST BLOOD! 🏆</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Submit Flag</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="flag" className="text-foreground">
                      Flag
                    </Label>
                    <Input
                      id="flag"
                      type="text"
                      placeholder="JCTF{...}"
                      value={flag}
                      onChange={(e) => setFlag(e.target.value)}
                      className="font-mono bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
                      disabled={timeLeft > 0 || isSubmitting}
                    />
                    {timeLeft > 0 && (
                      <p className="text-sm text-destructive mt-1">
                        Rate limited: {timeLeft}s remaining
                      </p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={!flag.trim() || timeLeft > 0 || isSubmitting}
                    className="bg-primary hover:bg-primary/80 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Flag
                      </>
                    )}
                  </Button>
                </form>
              </div>
            )}
          </div>

          {/* Recent Solvers */}
          {challenge.recentSolvers && challenge.recentSolvers.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">Recent Solvers</h3>
              <div className="flex flex-wrap gap-2">
                {challenge.recentSolvers.slice(0, 10).map((solver, index) => (
                  <Badge key={solver} variant="secondary" className="text-xs">
                    {index === 0 && challenge.firstBlood?.user === solver && (
                      <Crown className="h-3 w-3 mr-1 text-first-blood" />
                    )}
                    {solver}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ChallengeModal;
