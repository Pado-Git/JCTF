import { Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, Textarea } from '@/+shared/components';

interface PersonalInfoProps {
  profile: {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    country: string;
    university?: string;
    bio: string;
  };
  isEditing: boolean;
  onProfileChange: (field: string, value: string) => void;
}

export function PersonalInfo({ profile, isEditing, onProfileChange }: PersonalInfoProps) {
  return (
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
              value={profile.firstName}
              onChange={(e) => onProfileChange('firstName', e.target.value)}
              disabled={!isEditing}
              className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
            <Input
              id="lastName"
              value={profile.lastName}
              onChange={(e) => onProfileChange('lastName', e.target.value)}
              disabled={!isEditing}
              className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="nickname" className="text-foreground">Nickname</Label>
          <Input
            id="nickname"
            value={profile.nickname}
            onChange={(e) => onProfileChange('nickname', e.target.value)}
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
              value={profile.country}
              onChange={(e) => onProfileChange('country', e.target.value)}
              disabled={!isEditing}
              className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
            />
          </div>
          <div>
            <Label htmlFor="university" className="text-foreground">University (Optional)</Label>
            <Input
              id="university"
              value={profile.university || ''}
              onChange={(e) => onProfileChange('university', e.target.value)}
              disabled={!isEditing}
              className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="bio" className="text-foreground">Bio</Label>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => onProfileChange('bio', e.target.value)}
            disabled={!isEditing}
            className="bg-input-background border-border focus:border-accent focus:ring-accent text-foreground min-h-[100px]"
            placeholder="Tell us about yourself..."
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default PersonalInfo;