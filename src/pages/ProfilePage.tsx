import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Textarea, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Progress, MaxWidthContainer } from '@/+shared/components';
import { 
  Trophy,
  Target,
  Zap,
  Users,
  Crown,
  Bell,
  Eye,
  Key,
} from 'lucide-react';
import { toast } from 'sonner';
import { ProfileHeader } from '@/profile/layout';

// Props interface removed - using React Router now

interface UserProfile {
  email: string;
  nickname: string;
  firstName: string;
  lastName: string;
  bio: string;
  country: string;
  university?: string;
  joinDate: string;
  avatar?: string;
  stats: {
    totalCompetitions: number;
    totalSolved: number;
    totalPoints: number;
    averageRank: number;
    firstBloods: number;
    bestRank: number;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    earnedDate: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'solve' | 'join' | 'rank_up' | 'first_blood';
    description: string;
    timestamp: string;
    points?: number;
  }>;
  currentTeam?: {
    id: string;
    name: string;
    role: 'leader' | 'member';
    members: number;
  };
}

const mockProfile: UserProfile = {
  email: 'user@example.com',
  nickname: 'CyberNinja',
  firstName: 'Alex',
  lastName: 'Smith',
  bio: 'Passionate cybersecurity enthusiast with a focus on web exploitation and reverse engineering. Love solving complex puzzles and learning new attack vectors.',
  country: 'South Korea',
  university: 'KAIST',
  joinDate: '2023-03-15',
  stats: {
    totalCompetitions: 15,
    totalSolved: 127,
    totalPoints: 18650,
    averageRank: 8.3,
    firstBloods: 12,
    bestRank: 2
  },
  achievements: [
    {
      id: 'ach-001',
      title: 'First Blood Hunter',
      description: 'Achieved 10+ first bloods',
      icon: '🏆',
      color: 'text-first-blood',
      earnedDate: '2024-01-10'
    },
    {
      id: 'ach-002',
      title: 'Web Master',
      description: 'Solved 50+ web challenges',
      icon: '🕸️',
      color: 'text-accent',
      earnedDate: '2023-12-20'
    },
    {
      id: 'ach-003',
      title: 'Top Performer',
      description: 'Finished in top 5 in a major CTF',
      icon: '⭐',
      color: 'text-warning',
      earnedDate: '2023-11-15'
    },
    {
      id: 'ach-004',
      title: 'Team Player',
      description: 'Participated in 10+ team competitions',
      icon: '👥',
      color: 'text-primary',
      earnedDate: '2023-10-30'
    }
  ],
  recentActivity: [
    {
      id: 'act-001',
      type: 'first_blood',
      description: 'Achieved first blood in "SQL Injection Master"',
      timestamp: '2 hours ago',
      points: 450
    },
    {
      id: 'act-002',
      type: 'rank_up',
      description: 'Moved up to rank #12 in Winter CTF 2024',
      timestamp: '3 hours ago'
    },
    {
      id: 'act-003',
      type: 'solve',
      description: 'Solved "Buffer Overflow Basics"',
      timestamp: '1 day ago',
      points: 200
    },
    {
      id: 'act-004',
      type: 'join',
      description: 'Joined Advanced Pwning Tournament',
      timestamp: '2 days ago'
    }
  ],
  currentTeam: {
    id: 'team-001',
    name: 'CyberNinjas',
    role: 'leader',
    members: 4
  }
};

export function ProfilePage() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(mockProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProfile(editedProfile);
    setIsEditing(false);
    setIsLoading(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'solve': return <Target className="h-4 w-4" />;
      case 'join': return <Users className="h-4 w-4" />;
      case 'rank_up': return <Trophy className="h-4 w-4" />;
      case 'first_blood': return <Crown className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'solve': return 'text-accent';
      case 'join': return 'text-primary';
      case 'rank_up': return 'text-warning';
      case 'first_blood': return 'text-first-blood';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <>
      <ProfileHeader
        title={profile.nickname}
        coloredTitle={profile.nickname}
        description={profile.bio}
      />

      {/* Profile Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="edit" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            Edit Profile
          </TabsTrigger>
          <TabsTrigger value="achievements" className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
            Achievements
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Statistics */}
            <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary" />
                  Competition Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Competitions</span>
                  <span className="text-foreground font-semibold">{profile.stats.totalCompetitions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Average Rank</span>
                  <span className="text-foreground font-semibold">#{profile.stats.averageRank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="text-accent font-semibold">
                    {Math.round((profile.stats.totalSolved / (profile.stats.totalCompetitions * 20)) * 100)}%
                  </span>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Skill Level</span>
                    <span className="text-warning font-semibold">Advanced</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Team Information */}
            {profile.currentTeam && (
              <Card className="bg-card/50 backdrop-blur-sm border-accent/30">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center">
                    <Users className="h-5 w-5 mr-2 text-accent" />
                    Current Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Team Name</span>
                    <span className="text-foreground font-semibold">{profile.currentTeam.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Your Role</span>
                    <Badge variant="primary" className="border-accent text-accent">
                      {profile.currentTeam.role}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Members</span>
                    <span className="text-foreground font-semibold">{profile.currentTeam.members}</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => navigate?.('teams')}
                  >
                    Manage Team
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-accent/30">
              <CardHeader>
                <CardTitle className="text-foreground">Personal Information</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      value={isEditing ? editedProfile.firstName : profile.firstName}
                      onChange={(e) => setEditedProfile({...editedProfile, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      value={isEditing ? editedProfile.lastName : profile.lastName}
                      onChange={(e) => setEditedProfile({...editedProfile, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="nickname" className="text-foreground">Nickname</Label>
                  <Input
                    id="nickname"
                    value={isEditing ? editedProfile.nickname : profile.nickname}
                    onChange={(e) => setEditedProfile({...editedProfile, nickname: e.target.value})}
                    disabled={!isEditing}
                    className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-muted/30 border-border text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="country" className="text-foreground">Country</Label>
                    <Input
                      id="country"
                      value={isEditing ? editedProfile.country : profile.country}
                      onChange={(e) => setEditedProfile({...editedProfile, country: e.target.value})}
                      disabled={!isEditing}
                      className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="university" className="text-foreground">University (Optional)</Label>
                    <Input
                      id="university"
                      value={isEditing ? editedProfile.university || '' : profile.university || ''}
                      onChange={(e) => setEditedProfile({...editedProfile, university: e.target.value})}
                      disabled={!isEditing}
                      className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio" className="text-foreground">Bio</Label>
                  <Textarea
                    id="bio"
                    value={isEditing ? editedProfile.bio : profile.bio}
                    onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                    disabled={!isEditing}
                    className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground min-h-[100px]"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
              <CardHeader>
                <CardTitle className="text-foreground">Account Settings</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-center space-x-3">
                    <Key className="h-5 w-5 text-warning" />
                    <div>
                      <h4 className="font-semibold text-foreground">Change Password</h4>
                      <p className="text-sm text-muted-foreground">Update your login credentials</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                    Change
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-center space-x-3">
                    <Bell className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Competition updates and announcements</p>
                    </div>
                  </div>
                  <Button variant="secondary" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    Configure
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
                  <div className="flex items-center space-x-3">
                    <Eye className="h-5 w-5 text-accent" />
                    <div>
                      <h4 className="font-semibold text-foreground">Profile Visibility</h4>
                      <p className="text-sm text-muted-foreground">Control who can see your profile</p>
                    </div>
                  </div>
                  <Badge variant="primary" className="border-accent text-accent">
                    Public
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-warning/30">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Crown className="h-5 w-5 mr-2 text-warning" />
                Achievements
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your accomplishments and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {profile.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-4 rounded-lg bg-muted/20 border border-border hover:border-warning/50 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="primary" className={`${achievement.color} border-current`}>
                            Earned
                          </Badge>
                          <span className="text-xs text-muted-foreground">{achievement.earnedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/30">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
              <CardDescription className="text-muted-foreground">
                Your latest actions and achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/20 border border-border">
                    <div className={`p-2 rounded-full bg-card ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-foreground font-medium">{activity.description}</p>
                        {activity.points && (
                          <Badge className="bg-accent text-accent-foreground">
                            +{activity.points} pts
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}