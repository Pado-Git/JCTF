import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Badge, Progress } from '@/+shared/components';
import { 
  Trophy, 
  Users, 
  Calendar,
  ArrowLeft,
  Target,
  Zap,
  Shield,
  Star,
  Timer,
  Award
} from 'lucide-react';

interface User {
  email: string;
  nickname?: string;
}

// Props interface removed - using React Router now

// Mock competition data
const competitions = [
  {
    id: 1,
    name: "SURF-LAB Autumn CTF 2025",
    description: "Annual autumn competition featuring advanced cyber security challenges",
    status: "active",
    startDate: "2025-09-01T09:00:00Z",
    endDate: "2025-09-15T18:00:00Z",
    participants: 2847,
    maxParticipants: 5000,
    difficulty: "Advanced",
    categories: ["Web", "Crypto", "Reverse", "Pwn", "Forensics"],
    prize: "$50,000",
    registered: true
  },
  {
    id: 2,
    name: "Beginner's Challenge",
    description: "Perfect entry point for newcomers to cybersecurity",
    status: "upcoming",
    startDate: "2025-09-20T10:00:00Z",
    endDate: "2025-09-25T20:00:00Z",
    participants: 1203,
    maxParticipants: 2000,
    difficulty: "Beginner",
    categories: ["Web", "OSINT", "Crypto"],
    prize: "$5,000",
    registered: false
  },
  {
    id: 3,
    name: "Corporate Security Challenge",
    description: "Real-world corporate security scenarios and incident response",
    status: "upcoming",
    startDate: "2025-10-01T08:00:00Z",
    endDate: "2025-10-07T22:00:00Z",
    participants: 456,
    maxParticipants: 1000,
    difficulty: "Expert",
    categories: ["Network", "Forensics", "Incident Response"],
    prize: "$25,000",
    registered: false
  },
  {
    id: 4,
    name: "Summer Hacking Marathon",
    description: "3-day intensive hacking competition with live challenges",
    status: "ended",
    startDate: "2025-08-15T00:00:00Z",
    endDate: "2025-08-18T23:59:59Z",
    participants: 3241,
    maxParticipants: 4000,
    difficulty: "Advanced",
    categories: ["All Categories"],
    prize: "$75,000",
    registered: true
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'bg-success/20 text-success border-success/30';
    case 'Advanced': return 'bg-warning/20 text-warning border-warning/30';
    case 'Expert': return 'bg-destructive/20 text-destructive border-destructive/30';
    default: return 'bg-muted/20 text-muted-foreground border-muted/30';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success/20 text-success border-success/30';
    case 'upcoming': return 'bg-primary/20 text-primary border-primary/30';
    case 'ended': return 'bg-muted/20 text-muted-foreground border-muted/30';
    default: return 'bg-muted/20 text-muted-foreground border-muted/30';
  }
};

export function CompetitionsPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'upcoming' | 'ended'>('all');
  const [selectedCompetition, setSelectedCompetition] = useState<number | null>(null);
  const [user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });

  const filteredCompetitions = competitions.filter(comp => {
    if (selectedTab === 'all') return true;
    return comp.status === selectedTab;
  });

  const handleRegister = (competitionId: number) => {
    // Mock registration logic
    console.log(`Registering for competition ${competitionId}`);
    // In real app, this would be an API call
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className="min-h-screen bg-background matrix-bg">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/dashboard')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-primary">Competitions</h1>
                <p className="text-muted-foreground">Join CTF competitions and test your skills</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Welcome back</p>
                <p className="font-medium text-foreground">{user.nickname || user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'all', label: 'All Competitions', icon: Trophy },
            { key: 'active', label: 'Active', icon: Zap },
            { key: 'upcoming', label: 'Upcoming', icon: Calendar },
            { key: 'ended', label: 'Ended', icon: Award }
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedTab === key ? "primary" : "text"}
              onClick={() => setSelectedTab(key as any)}
              className={selectedTab === key ? "bg-primary text-primary-foreground" : ""}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Button>
          ))}
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
                      <Badge key={category} variant="secondary" className="text-xs">
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
                        variant="secondary"
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
                          variant="secondary"
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