import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Progress } from '@/+shared/components';
import { 
  Trophy,
  Users, 
  Calendar,
  Target,
  Shield,
  Star,
  Timer,
  Zap,
  Award
} from 'lucide-react';
import { 
  competitions, 
  mockUser
} from '@/competition/data';
import { CategoryFilter } from '@/+shared/components';
import { 
  getDifficultyColor, 
  getStatusColor, 
  formatDate, 
  getTimeRemaining, 
  handleRegister 
} from '@/competition/utils';

export function Competitions() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [_user] = useState(mockUser);
  
  // CategoryFilter 상태 (현재 미사용)
  const [selectedCategory] = useState('All');

  const filteredCompetitions = competitions.filter(comp => {
    // 탭 필터 (상태별) - selectedTab은 "Active", comp.status는 "active"
    const matchesTab = selectedTab === 'All' || comp.status === selectedTab.toLowerCase();
    
    // 카테고리 필터 (챌린지 타입별)
    const matchesCategory = selectedCategory === 'All' || 
      comp.categories.some(cat => cat === selectedCategory) ||
      comp.categories.includes('All Categories');
    
    return matchesTab && matchesCategory;
  });

  const statusCategories = competitions.map(comp => comp.status).filter((status, index, self) => self.indexOf(status) === index);

  return (
    <div className="bg-neutral-900">
      <div className="container mx-auto px-4 py-8">
        {/* Status Tabs */}
        <div className="mb-8">
          <CategoryFilter 
            categories={statusCategories}
            data={competitions}
            selected={selectedTab}
            onSelect={setSelectedTab}
            getItemCategory={(competition) => competition.status}
            isAll={true}
          />
        </div>

        {/* Competitions Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompetitions.map((competition) => (
            <Card 
              key={competition.id} 
              className="bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedCompetition(selectedCompetition === competition.id ? null : competition.id)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2 text-foreground">{competition.name}</CardTitle>
                    <div className="flex gap-2 mb-3">
                      <Badge className={getStatusColor(competition.status)}>
                        {competition.status.charAt(0).toUpperCase() + competition.status.slice(1)}
                      </Badge>
                      <Badge className={getDifficultyColor(competition.difficulty)}>
                        {competition.difficulty}
                      </Badge>
                    </div>
                  </div>
                  {competition.registered && (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <Star className="w-3 h-3 mr-1" />
                      Registered
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-muted-foreground">
                  {competition.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Time Info */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(competition.startDate)}</span>
                  </div>
                  {competition.status === 'active' && (
                    <div className="flex items-center gap-1 text-warning">
                      <Timer className="w-4 h-4" />
                      <span>{getTimeRemaining(competition.endDate)}</span>
                    </div>
                  )}
                </div>

                {/* Participants */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      <span>Participants</span>
                    </div>
                    <span className="text-foreground">
                      {competition.participants.toLocaleString()} / {competition.maxParticipants.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(competition.participants / competition.maxParticipants) * 100} 
                    className="h-2"
                  />
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Target className="w-4 h-4" />
                    <span>Categories</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {competition.categories.map((category) => (
                      <Badge key={category} variant="tag" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Prize */}
                <div className="flex items-center justify-between p-3 bg-primary/5 border border-primary/20 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Prize Pool</span>
                  </div>
                  <span className="font-bold text-primary">{competition.prize}</span>
                </div>

                {/* Action Button */}
                {competition.status !== 'ended' && (
                  <div className="pt-2">
                    {competition.registered ? (
                      <Button
                        className="w-full"
                        variant="text"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate?.('challenges');
                        }}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        Enter Competition
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRegister(competition.id);
                        }}
                        disabled={competition.participants >= competition.maxParticipants}
                      >
                        {competition.participants >= competition.maxParticipants ? 'Full' : 'Register Now'}
                      </Button>
                    )}
                  </div>
                )}

                {/* Expanded Details */}
                {selectedCompetition === competition.id && (
                  <div className="pt-4 border-t border-border space-y-3">
                    <div>
                      <h4 className="font-medium mb-2 text-foreground">Competition Details</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div>Start: {formatDate(competition.startDate)}</div>
                        <div>End: {formatDate(competition.endDate)}</div>
                        <div>Format: Jeopardy Style CTF</div>
                        <div>Team Size: 1-5 members</div>
                      </div>
                    </div>
                    
                    {competition.status === 'active' && competition.registered && (
                      <div className="flex gap-2">
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate?.('challenges');
                          }}
                        >
                          View Challenges
                        </Button>
                        <Button
                          size="small"
                          variant="text"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate?.('leaderboard');
                          }}
                        >
                          Leaderboard
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No competitions found</h3>
            <p className="text-muted-foreground">
              No competitions match your current filter. Try selecting a different tab.
            </p>
          </div>
        )}
      </div>
      </div>
  );
}

export default Competitions;