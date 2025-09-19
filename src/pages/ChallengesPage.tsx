import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, MaxWidthContainer, SearchInput, Progress } from '@/+shared/components';
import { 
  Target,
} from 'lucide-react';
import { 
  Challenge, 
  mockCompetition, 
  mockChallenges,
} from '@/challenge/data';
import { bannerBg } from '@/challenge/assets';
import { ChallengeModal, ChallengeCard } from '@/challenge/components';
import { CategoryFilter } from '@/+shared/components';
import { IcoCheckboxCircleLined, IcoStarLined, IcoTrophyFilled, IcoChart } from '@/+shared/assets';
import {
  calculateScore,
  getSolvedCount,
  getProgressPercentage
} from '@/challenge/utils';

export function ChallengesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [_user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesCategory = selectedCategory === 'All' || challenge.category.name === selectedCategory;
    const matchesSearch = challenge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const solvedCount = getSolvedCount(mockChallenges);
  const totalPoints = calculateScore(mockChallenges);

  const categories = mockChallenges.map(challenge => challenge.category.name).filter((category, index, self) => self.indexOf(category) === index);

  return (
    <>
      {/* Competition Info - Full Width Background */}
      <div 
        className="relative mb-8 pt-20 pb-14 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-neutral-900/70"></div>
        
        {/* Content */}
        <MaxWidthContainer 
          className="relative z-10" 
          innerProps={{ className: "flex flex-col gap-6" }}
        >
          <div className='flex flex-col gap-2'>
            <h1 className="text-primary-50 typo-heading-large">
              {mockCompetition.name} <span className="text-primary">Challenges</span>
          </h1>
            <p className="typo-body-small text-primary-300">
              Team
              <span className="typo-body-small-bold text-neutral-0 ml-2">{mockCompetition.myTeam.name}</span>
          </p>
          </div>
          
          <div className='border border-neutral-700 bg-neutral-900/50 rounded-radius-md p-6'>
            <div className='flex items-center gap-2'>
              <IcoTrophyFilled className='size-6'/>
              <span className="typo-heading-xsmall text-primary-300">Progress</span>
            </div>
          <div className="flex items-center space-x-6 text-sm">
              <div className="flex-1">
                <Progress value={getProgressPercentage(solvedCount, mockChallenges.length)} className="h-2 bg-neutral-900" />
              </div>
            <div className="flex items-center space-x-2">
                <IcoCheckboxCircleLined className='size-4 text-primary' />
                <span className="typo-body-small text-neutral-50">
                  Solved: <span className="text-primary">{solvedCount}</span> / {mockChallenges.length}
              </span>
            </div>
            <div className="flex items-center space-x-2">
                <IcoStarLined className='size-4 text-primary' />
                <span className="typo-body-small text-neutral-50">
                  Points: <span className="text-primary">{totalPoints.toLocaleString()}</span>
              </span>
            </div>
            </div>
          </div>
        </MaxWidthContainer>
        </div>

      <MaxWidthContainer className="py-14" innerProps={{ className: "gap-6" }}>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search challenges by name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="secondary"
            size="small"
            onClick={() => navigate?.('leaderboard')}
          >
            <IcoChart className='size-4' />
            Leaderboard
          </Button>
        </div>
        
        <CategoryFilter 
          categories={categories}
          data={mockChallenges}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          getItemCategory={(challenge) => challenge.category.name}
        />

        {/* Challenges Grid */}
        <div className="flex flex-wrap gap-6 mt-4">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={() => setSelectedChallenge(challenge)}
              isLocked={challenge.tags.includes('locked')}
              lockProgress={challenge.tags.includes('locked') ? '2/3' : undefined}
            />
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
      </MaxWidthContainer>

      {/* Challenge Modal */}
      {selectedChallenge && (
        <ChallengeModal
          challenge={selectedChallenge}
          isOpen={!!selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </>
  );
}
