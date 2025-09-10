import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/+shared/components/form/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/+shared/components/data-display/card';
import { Input } from '@/+shared/components/form/input';
import { Label } from '@/+shared/components/form/label';
import { Textarea } from '@/+shared/components/form/textarea';
import { Badge } from '@/+shared/components/feedback/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/+shared/components/data-display/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/+shared/components/overlay/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/+shared/components/data-display/avatar';
import { 
  Shield, 
  Users, 
  Plus,
  Search,
  Crown,
  Mail,
  ArrowLeft,
  UserPlus,
  Edit3,
  Trash2,
  LogOut,
  Send,
  Check,
  X
} from 'lucide-react';
import { toast } from 'sonner';

// Props interface removed - using React Router now

interface Team {
  id: string;
  name: string;
  description: string;
  isPublic: boolean;
  inviteCode?: string;
  createdDate: string;
  leader: {
    id: string;
    nickname: string;
    avatar?: string;
  };
  members: Array<{
    id: string;
    nickname: string;
    email: string;
    role: 'leader' | 'member';
    joinDate: string;
    avatar?: string;
    stats: {
      totalPoints: number;
      totalSolved: number;
    };
  }>;
  stats: {
    totalCompetitions: number;
    totalPoints: number;
    bestRank: number;
    averageRank: number;
  };
  recentCompetitions: Array<{
    id: string;
    name: string;
    rank: number;
    totalTeams: number;
    points: number;
    date: string;
  }>;
}

interface TeamInvite {
  id: string;
  team: {
    id: string;
    name: string;
    description: string;
    members: number;
  };
  invitedBy: string;
  inviteDate: string;
}

const mockTeams: Team[] = [
  {
    id: 'team-001',
    name: 'CyberNinjas',
    description: 'Elite team focused on web exploitation and cryptography challenges. We participate in major international CTFs.',
    isPublic: true,
    inviteCode: 'NINJA2024',
    createdDate: '2023-09-15',
    leader: {
      id: 'user-001',
      nickname: 'CyberNinja',
      avatar: undefined
    },
    members: [
      {
        id: 'user-001',
        nickname: 'CyberNinja',
        email: 'user@example.com',
        role: 'leader',
        joinDate: '2023-09-15',
        stats: { totalPoints: 18650, totalSolved: 127 }
      },
      {
        id: 'user-002',
        nickname: 'WebMaster',
        email: 'web@example.com',
        role: 'member',
        joinDate: '2023-10-01',
        stats: { totalPoints: 14200, totalSolved: 98 }
      },
      {
        id: 'user-003',
        nickname: 'CryptoKing',
        email: 'crypto@example.com',
        role: 'member',
        joinDate: '2023-10-15',
        stats: { totalPoints: 16800, totalSolved: 112 }
      },
      {
        id: 'user-004',
        nickname: 'PwnMaster',
        email: 'pwn@example.com',
        role: 'member',
        joinDate: '2023-11-01',
        stats: { totalPoints: 15900, totalSolved: 89 }
      }
    ],
    stats: {
      totalCompetitions: 12,
      totalPoints: 65550,
      bestRank: 2,
      averageRank: 8.5
    },
    recentCompetitions: [
      {
        id: 'comp-001',
        name: 'Winter CTF 2024',
        rank: 12,
        totalTeams: 87,
        points: 4250,
        date: '2024-01-15'
      },
      {
        id: 'comp-002',
        name: 'Global Cyber Challenge',
        rank: 3,
        totalTeams: 156,
        points: 8900,
        date: '2023-12-20'
      },
      {
        id: 'comp-003',
        name: 'University CTF',
        rank: 1,
        totalTeams: 45,
        points: 9500,
        date: '2023-11-25'
      }
    ]
  }
];

const mockInvites: TeamInvite[] = [
  {
    id: 'inv-001',
    team: {
      id: 'team-002',
      name: 'HackMasters',
      description: 'Professional team specializing in reverse engineering',
      members: 5
    },
    invitedBy: 'TeamLeader',
    inviteDate: '2024-01-10'
  },
  {
    id: 'inv-002',
    team: {
      id: 'team-003',
      name: 'Digital Defenders',
      description: 'Focused on forensics and incident response',
      members: 3
    },
    invitedBy: 'ForensicsExpert',
    inviteDate: '2024-01-08'
  }
];

const mockPublicTeams: Array<{
  id: string;
  name: string;
  description: string;
  members: number;
  isRecruiting: boolean;
  tags: string[];
  stats: {
    totalPoints: number;
    averageRank: number;
  };
}> = [
  {
    id: 'team-004',
    name: 'Binary Breakers',
    description: 'Specializing in binary exploitation and reverse engineering',
    members: 3,
    isRecruiting: true,
    tags: ['pwn', 'reverse', 'binary'],
    stats: { totalPoints: 45600, averageRank: 15.2 }
  },
  {
    id: 'team-005',
    name: 'Web Warriors',
    description: 'Web application security experts',
    members: 4,
    isRecruiting: true,
    tags: ['web', 'xss', 'sqli'],
    stats: { totalPoints: 38900, averageRank: 22.1 }
  },
  {
    id: 'team-006',
    name: 'Crypto Crusaders',
    description: 'Mathematical cryptography challenges',
    members: 2,
    isRecruiting: true,
    tags: ['crypto', 'math', 'rsa'],
    stats: { totalPoints: 52100, averageRank: 8.7 }
  }
];

export function TeamsPage() {
  const navigate = useNavigate();
  const [myTeam, setMyTeam] = useState<Team | null>(mockTeams[0]);
  const [invites, setInvites] = useState<TeamInvite[]>(mockInvites);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showJoinDialog, setShowJoinDialog] = useState(false);
  const [user] = useState({ email: 'user@example.com', nickname: 'CyberHacker' });
  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    isPublic: true
  });
  const [joinCode, setJoinCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPublicTeams = mockPublicTeams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    team.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateTeam = async () => {
    if (!newTeam.name.trim()) {
      toast.error('Team name is required');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const createdTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeam.name,
      description: newTeam.description,
      isPublic: newTeam.isPublic,
      inviteCode: `${newTeam.name.toUpperCase().slice(0, 4)}${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      createdDate: new Date().toISOString(),
      leader: {
        id: 'user-001',
        nickname: user.nickname || user.email,
      },
      members: [{
        id: 'user-001',
        nickname: user.nickname || user.email,
        email: user.email,
        role: 'leader',
        joinDate: new Date().toISOString(),
        stats: { totalPoints: 0, totalSolved: 0 }
      }],
      stats: {
        totalCompetitions: 0,
        totalPoints: 0,
        bestRank: 0,
        averageRank: 0
      },
      recentCompetitions: []
    };

    setMyTeam(createdTeam);
    setIsLoading(false);
    setShowCreateDialog(false);
    setNewTeam({ name: '', description: '', isPublic: true });
    toast.success('Team created successfully!');
  };

  const handleJoinTeam = async () => {
    if (!joinCode.trim()) {
      toast.error('Invite code is required');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock join logic
    if (joinCode.toUpperCase() === 'NINJA2024') {
      toast.success('Successfully joined team!');
      setShowJoinDialog(false);
      setJoinCode('');
    } else {
      toast.error('Invalid invite code');
    }
    
    setIsLoading(false);
  };

  const handleAcceptInvite = async (inviteId: string) => {
    setInvites(invites.filter(inv => inv.id !== inviteId));
    toast.success('Invite accepted! You have joined the team.');
  };

  const handleDeclineInvite = async (inviteId: string) => {
    setInvites(invites.filter(inv => inv.id !== inviteId));
    toast.success('Invite declined.');
  };

  const isTeamLeader = myTeam?.members.find(m => m.email === user.email)?.role === 'leader';

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
            
            <div className="flex items-center space-x-4">
              {!myTeam && (
                <>
                  <Dialog open={showJoinDialog} onOpenChange={setShowJoinDialog}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Join Team
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card/90 backdrop-blur-md border-primary/50">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Join Team</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Enter the invite code provided by your team leader
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="joinCode" className="text-foreground">Invite Code</Label>
                          <Input
                            id="joinCode"
                            placeholder="TEAM2024"
                            value={joinCode}
                            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                            className="bg-input-background border-border focus:border-primary focus:ring-primary text-foreground font-mono"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => setShowJoinDialog(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleJoinTeam}
                            disabled={isLoading || !joinCode.trim()}
                            className="flex-1 bg-primary hover:bg-primary/80 text-primary-foreground"
                          >
                            {isLoading ? 'Joining...' : 'Join Team'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-accent hover:bg-accent/80 text-accent-foreground">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Team
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card/90 backdrop-blur-md border-accent/50">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Create New Team</DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                          Create your own team and invite other players
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="teamName" className="text-foreground">Team Name</Label>
                          <Input
                            id="teamName"
                            placeholder="Awesome Team"
                            value={newTeam.name}
                            onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                            className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                          />
                        </div>
                        <div>
                          <Label htmlFor="teamDescription" className="text-foreground">Description</Label>
                          <Textarea
                            id="teamDescription"
                            placeholder="Describe your team's focus and goals..."
                            value={newTeam.description}
                            onChange={(e) => setNewTeam({...newTeam, description: e.target.value})}
                            className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => setShowCreateDialog(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleCreateTeam}
                            disabled={isLoading || !newTeam.name.trim()}
                            className="flex-1 bg-accent hover:bg-accent/80 text-accent-foreground"
                          >
                            {isLoading ? 'Creating...' : 'Create Team'}
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Team <span className="text-accent">Management</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            {myTeam ? 'Manage your team and compete together' : 'Join or create a team to participate in competitions'}
          </p>
        </div>

        {/* Team Invites */}
        {invites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Team Invitations</h2>
            <div className="grid gap-4">
              {invites.map((invite) => (
                <Card key={invite.id} className="bg-card/50 backdrop-blur-sm border-warning/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Mail className="h-4 w-4 text-warning" />
                          <span className="font-semibold text-foreground">
                            Invitation to join {invite.team.name}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">
                          {invite.team.description}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Invited by: {invite.invitedBy}</span>
                          <span>•</span>
                          <span>{invite.team.members} members</span>
                          <span>•</span>
                          <span>{invite.inviteDate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="secondary"
                          size="small"
                          onClick={() => handleDeclineInvite(invite.id)}
                          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleAcceptInvite(invite.id)}
                          className="bg-accent hover:bg-accent/80 text-accent-foreground"
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Accept
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Team or Browse Teams */}
        {myTeam ? (
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Team Overview
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                Members
              </TabsTrigger>
              <TabsTrigger value="competitions" className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
                Competitions
              </TabsTrigger>
              {isTeamLeader && (
                <TabsTrigger value="settings" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                  Settings
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Team Header */}
              <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl text-foreground flex items-center">
                        <Users className="h-6 w-6 mr-2 text-primary" />
                        {myTeam.name}
                        {isTeamLeader && <Crown className="h-5 w-5 ml-2 text-warning" />}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground mt-2">
                        {myTeam.description}
                      </CardDescription>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">
                      {myTeam.members.length} Members
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {myTeam.stats.totalPoints.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-accent">
                        {myTeam.stats.totalCompetitions}
                      </div>
                      <div className="text-sm text-muted-foreground">Competitions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-warning">
                        #{myTeam.stats.bestRank}
                      </div>
                      <div className="text-sm text-muted-foreground">Best Rank</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-first-blood">
                        #{Math.round(myTeam.stats.averageRank)}
                      </div>
                      <div className="text-sm text-muted-foreground">Avg Rank</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Invite Code */}
              {isTeamLeader && myTeam.inviteCode && (
                <Card className="bg-card/50 backdrop-blur-sm border-accent/30">
                  <CardHeader>
                    <CardTitle className="text-foreground">Invite New Members</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Share this code with players you want to invite
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <Label className="text-foreground">Invite Code</Label>
                        <div className="flex space-x-2">
                          <Input
                            value={myTeam.inviteCode}
                            readOnly
                            className="bg-muted/30 border-border text-foreground font-mono"
                          />
                          <Button
                            variant="secondary"
                            onClick={() => {
                              navigator.clipboard.writeText(myTeam.inviteCode!);
                              toast.success('Invite code copied to clipboard!');
                            }}
                            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-accent/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Team Members</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Current team roster and member statistics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTeam.members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12 border-2 border-primary">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {member.nickname.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-semibold text-foreground">{member.nickname}</h4>
                              {member.role === 'leader' && (
                                <Crown className="h-4 w-4 text-warning" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{member.email}</p>
                            <p className="text-xs text-muted-foreground">Joined {new Date(member.joinDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="text-center">
                              <div className="font-semibold text-primary">{member.stats.totalPoints.toLocaleString()}</div>
                              <div className="text-muted-foreground">Points</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-accent">{member.stats.totalSolved}</div>
                              <div className="text-muted-foreground">Solved</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitions" className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
                <CardHeader>
                  <CardTitle className="text-foreground">Competition History</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Recent team performance in competitions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myTeam.recentCompetitions.map((comp) => (
                      <div key={comp.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                        <div>
                          <h4 className="font-semibold text-foreground">{comp.name}</h4>
                          <p className="text-sm text-muted-foreground">{new Date(comp.date).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-warning">#{comp.rank}</div>
                            <div className="text-muted-foreground">Rank</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-muted-foreground">/{comp.totalTeams}</div>
                            <div className="text-muted-foreground">Teams</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-primary">{comp.points.toLocaleString()}</div>
                            <div className="text-muted-foreground">Points</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {isTeamLeader && (
              <TabsContent value="settings" className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border-destructive/30">
                  <CardHeader>
                    <CardTitle className="text-foreground">Team Settings</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Manage team configuration and dangerous actions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                      <div>
                        <h4 className="font-semibold text-foreground">Edit Team Information</h4>
                        <p className="text-sm text-muted-foreground">Update team name and description</p>
                      </div>
                      <Button variant="secondary" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div>
                        <h4 className="font-semibold text-destructive">Leave Team</h4>
                        <p className="text-sm text-muted-foreground">Leave this team permanently</p>
                      </div>
                      <Button variant="secondary" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        <LogOut className="h-4 w-4 mr-2" />
                        Leave
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                      <div>
                        <h4 className="font-semibold text-destructive">Delete Team</h4>
                        <p className="text-sm text-muted-foreground">Permanently delete this team and all data</p>
                      </div>
                      <Button variant="secondary" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        ) : (
          <div className="space-y-8">
            {/* Browse Public Teams */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Browse Teams</h2>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search teams..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-input-background border-border focus:border-primary focus:ring-primary text-foreground"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPublicTeams.map((team) => (
                  <Card key={team.id} className="bg-card/50 backdrop-blur-sm border-primary/30 hover:border-accent transition-colors">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg text-foreground">{team.name}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {team.description}
                          </CardDescription>
                        </div>
                        {team.isRecruiting && (
                          <Badge className="bg-accent text-accent-foreground">
                            Recruiting
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {team.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Members: </span>
                            <span className="text-foreground font-semibold">{team.members}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Rank: </span>
                            <span className="text-foreground font-semibold">#{team.stats.averageRank}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Total Points: </span>
                            <span className="text-primary font-semibold">{team.stats.totalPoints.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
                          disabled={!team.isRecruiting}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Request to Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}