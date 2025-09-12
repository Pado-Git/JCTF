import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/+shared/components/form/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/+shared/components/data-display/card';
import { Badge } from '@/+shared/components/feedback/badge';
import { Input } from '@/+shared/components/form/input';
import { Label } from '@/+shared/components/form/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/+shared/components/overlay/dialog';
import { Progress } from '@/+shared/components/feedback/progress';
import { 
  Shield, 
  Target,  
  Users, 
  Trophy,
  Download,
  Server,
  Lightbulb,
  Send,
  Check,
  ArrowLeft,
  Crown,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  Challenge, 
  Competition,
  categories, 
  mockCompetition, 
  mockChallenges, 
  getDifficultyColor 
} from '@/challenge/data';

// Props interface removed - using React Router now

function CategoryFilter({ selected, onSelect }: { selected: string; onSelect: (category: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={selected === category.name ? 'primary' : 'secondary'}
          size="small"
          onClick={() => onSelect(category.name)}
          className={
            selected === category.name
              ? 'bg-primary text-primary-foreground'
              : 'border-primary/30 text-foreground hover:bg-primary/20'
          }
          style={selected === category.name ? { color: category.color } : {}}
        >
          {category.name}
          {category.name !== 'All' && (
            <span className="ml-2 text-xs">
              ({mockChallenges.filter(c => c.category.name === category.name).length})
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}

function ChallengeModal({ challenge, isOpen, onClose }: { 
  challenge: Challenge; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
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
    const correctFlag = `JCTF{${challenge.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_solved}`;
    const isCorrect = flag.trim() === correctFlag;

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
                  variant="secondary" 
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

export function ChallengesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category.name === selectedCategory;
    const matchesSearch = challenge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const solvedCount = mockChallenges.filter(c => c.solved).length;
  const totalPoints = mockChallenges.filter(c => c.solved).reduce((sum, c) => sum + c.score, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="text"
                onClick={() => navigate('/dashboard') || (() => navigate?.('dashboard'))}
                className="text-muted-foreground hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-primary">JCTF</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {mockCompetition.timeLeft}
                </div>
                <div className="text-xs text-muted-foreground">Time Left</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-accent">
                  #{mockCompetition.myTeam.rank}
                </div>
                <div className="text-xs text-muted-foreground">Team Rank</div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-bold text-warning">
                  {mockCompetition.myTeam.score.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Points</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Competition Info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {mockCompetition.name} <span className="text-accent">Challenges</span>
          </h1>
          <p className="text-muted-foreground mb-4">
            Team: <span className="text-primary font-semibold">{mockCompetition.myTeam.name}</span>
          </p>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-accent" />
              <span className="text-foreground">
                Solved: <span className="text-accent font-semibold">{solvedCount}</span> / {mockChallenges.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-warning" />
              <span className="text-foreground">
                Points: <span className="text-warning font-semibold">{totalPoints.toLocaleString()}</span>
              </span>
            </div>
            <div className="flex-1">
              <Progress value={(solvedCount / mockChallenges.length) * 100} className="h-2" />
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search challenges by name or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button 
              variant="secondary"
              onClick={() => navigate?.('leaderboard')}
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Trophy className="h-4 w-4 mr-2" />
              Scoreboard
            </Button>
          </div>
          
          <CategoryFilter 
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <Card 
              key={challenge.id}
              className={`bg-card/50 backdrop-blur-sm transition-all duration-300 cursor-pointer hover:scale-105 ${
                challenge.solved 
                  ? 'border-accent/50 bg-accent/5' 
                  : 'border-primary/30 hover:border-accent'
              } ${challenge.isFirstBlood ? 'bg-first-blood/5 border-first-blood/50' : ''}`}
              onClick={() => setSelectedChallenge(challenge)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className={`text-lg ${challenge.solved ? 'text-accent' : 'text-foreground'}`}>
                    <div className="flex items-center space-x-2">
                      {challenge.name}
                      {challenge.solved && <Check className="h-5 w-5 text-accent" />}
                      {challenge.isFirstBlood && <Crown className="h-5 w-5 text-first-blood" />}
                    </div>
                  </CardTitle>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge 
                      style={{ backgroundColor: challenge.category.color }}
                      className="text-black font-semibold"
                    >
                      {challenge.category.name}
                    </Badge>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getDifficultyColor(challenge.difficulty)}`}>
                        {challenge.scoreType === 'DYNAMIC' ? challenge.currentScore : challenge.score}
                      </div>
                      <div className="text-xs text-muted-foreground">pts</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {challenge.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {challenge.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{challenge.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{challenge.solveCount}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getDifficultyColor(challenge.difficulty)} border-current text-xs`}
                    >
                      {challenge.difficulty}
                    </Badge>
                  </div>
                  
                  {challenge.firstBlood && (
                    <div className="text-xs text-first-blood">
                      🏆 {challenge.firstBlood.user}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No challenges found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Challenge Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          isOpen={!!selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </div>
  );
}
