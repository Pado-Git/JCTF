import { Card, CardContent, Input, Label, Textarea, Button, TitleWIcon } from '@/+shared/components';
import { IcoSettingLined } from '@/+shared/assets';

interface EditProfileProps {
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
  onSave?: () => void;
}

export function EditProfile({ profile, isEditing, onProfileChange, onSave }: EditProfileProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <TitleWIcon 
        title="Edit Profile"
        icon={<IcoSettingLined />}
        description="Update your personal details and contact information"
      />

      {/* Form Card */}
      <Card className="bg-neutral-900 border border-neutral-700 rounded-3xl p-6">
        <CardContent className="space-y-6">
          {/* First Name & Last Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-neutral-200 text-sm font-medium">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => onProfileChange('firstName', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter first name"
                className="bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-neutral-200 text-sm font-medium">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => onProfileChange('lastName', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter last name"
                className="bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
          </div>

          {/* Nickname & Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-neutral-200 text-sm font-medium">Nickname</Label>
              <Input
                id="nickname"
                value={profile.nickname}
                onChange={(e) => onProfileChange('nickname', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter nickname"
                className="bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200 text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                disabled
                className="bg-neutral-700 border-neutral-600 text-neutral-400 h-12 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          {/* Country & University Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <Label htmlFor="country" className="text-neutral-200 text-sm font-medium">Country</Label>
              <Input
                id="country"
                value={profile.country}
                onChange={(e) => onProfileChange('country', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter country"
                className="bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="university" className="text-neutral-200 text-sm font-medium">University (Optional)</Label>
              <Input
                id="university"
                value={profile.university || ''}
                onChange={(e) => onProfileChange('university', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter university"
                className="bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:border-primary focus:ring-primary h-12 rounded-lg"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-neutral-200 text-sm font-medium">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => onProfileChange('bio', e.target.value)}
              disabled={!isEditing}
              placeholder="Tell us about yourself..."
              className="bg-neutral-800 border-neutral-600 text-neutral-100 placeholder:text-neutral-400 focus:border-primary focus:ring-primary min-h-[100px] rounded-lg resize-none"
            />
          </div>

          {/* Update Button */}
          {isEditing && (
            <div className="flex justify-end">
              <Button
                onClick={onSave}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 rounded-lg font-semibold"
              >
                Update
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default EditProfile;